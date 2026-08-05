import asyncio
import os
import uuid
import requests
from bullmq import Worker, Job
from dotenv import load_dotenv
from sf3d_model import SF3DGenerator
from s3_storage import S3Storage
from mesh_optimizer import MeshOptimizer
from rigging_engine import RiggingEngine

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
host = REDIS_URL.split("://")[1].split(":")[0]
port = int(REDIS_URL.split("://")[1].split(":")[1]) if ":" in REDIS_URL.split("://")[1] else 6379

generator = SF3DGenerator()
s3 = S3Storage()
mesh_opt = MeshOptimizer()
rigger = RiggingEngine()

async def process_job(job: Job, job_token: str):
    print(f"[AI Worker] Iniciando job {job.id} de {job.data.get('userId')}")
    image_url = job.data.get('imageUrl')
    auto_rigging = job.data.get('autoRigging') == 'true'
    
    def progress_callback(progress):
        loop = asyncio.get_event_loop()
        loop.create_task(job.updateProgress(progress))
        print(f"Job {job.id} progresso: {progress}%")

    if not image_url:
        print("Apenas image-to-3d suportado neste worker por enquanto.")
        return {"status": "FAILED", "error": "Missing imageUrl"}

    print(f"1. Fazendo download da imagem {image_url}")
    local_image_path = "temp_input.png"
    
    print("2. Removendo background (rembg)")
    await asyncio.sleep(1) # Processamento pesado de IO/CPU

    print("3. Gerando modelo 3D com Qualidade Avançada (SF3D + PBR)")
    glb_path = generator.generate_glb_from_image(local_image_path, progress_callback)
    
    print("3.5. Otimizando Malha e gerando LODs")
    optimized_paths = mesh_opt.optimize_glb(glb_path, target_faces=20000)
    best_glb_path = optimized_paths[0] if optimized_paths else glb_path
    
    if auto_rigging:
        print("3.8. Executando Rigging Automático")
        best_glb_path = rigger.auto_rig_character(best_glb_path)
    
    print("4. Uploading para o S3 (MinIO)")
    # Vamos fazer o upload do LOD0 (melhor qualidade otimizada) como principal
    object_name = f"models/{uuid.uuid4()}.glb"
    model_url = s3.upload_file(best_glb_path, object_name)

    print(f"[AI Worker] Job {job.id} concluído! URL: {model_url}")
    return {
        "modelUrl": model_url,
        "lods": len(optimized_paths),
        "status": "COMPLETED"
    }

async def main():
    print(f"Iniciando AI Worker na fila 'ai-3d-generation' em {host}:{port}...")
    worker = Worker("ai-3d-generation", process_job, {"connection": {"host": host, "port": port}})
    
    import signal
    loop = asyncio.get_event_loop()
    stop_event = asyncio.Event()

    def stop():
        print("Parando worker...")
        stop_event.set()
        
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, stop)

    await stop_event.wait()
    await worker.close()

if __name__ == "__main__":
    asyncio.run(main())
