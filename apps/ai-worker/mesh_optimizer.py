import trimesh
import os
import gc

class MeshOptimizer:
    def __init__(self):
        print("[Mesh Optimizer] Engine iniciada. Suporte a decimação e LOD.")

    def optimize_glb(self, input_path: str, target_faces: int = 20000):
        """
        Carrega o modelo 3D, aplica retopologia/decimação via trimesh, e salva LODs.
        Retorna uma lista de caminhos gerados.
        """
        output_paths = []
        try:
            # 1. Carregar cena ou malha
            scene = trimesh.load(input_path, force='scene')
            
            # Se for cena, agregamos as malhas (simplificação para o LOD)
            if isinstance(scene, trimesh.Scene):
                mesh = trimesh.util.concatenate(
                    tuple(trimesh.Trimesh(vertices=g.vertices, faces=g.faces)
                        for g in scene.geometry.values())
                )
            else:
                mesh = scene

            print(f"[Mesh Optimizer] Malha carregada: {len(mesh.faces)} faces originais.")

            # Gera LOD0 (Original otimizado / reparado)
            mesh.fix_normals()
            mesh.fill_holes()
            
            base_name, ext = os.path.splitext(input_path)
            lod0_path = f"{base_name}_LOD0{ext}"
            mesh.export(lod0_path)
            output_paths.append(lod0_path)
            
            # Decimação para LOD1 (50% ou target_faces)
            print("[Mesh Optimizer] Gerando LOD1 (Decimação)...")
            try:
                # Trimesh quadric decimation (pode requerer dependências extra, mockamos falha graciosa)
                lod1_mesh = mesh.simplify_quadratic_decimation(max(target_faces, len(mesh.faces) // 2))
                lod1_path = f"{base_name}_LOD1{ext}"
                lod1_mesh.export(lod1_path)
                output_paths.append(lod1_path)
            except Exception as e:
                print(f"[Mesh Optimizer] Aviso: Decimação de quadric falhou. Salvando versão base como LOD1. {e}")
                output_paths.append(lod0_path)

        except Exception as e:
            print(f"[Mesh Optimizer] Erro fatal otimizando {input_path}: {str(e)}")
            output_paths.append(input_path) # Fallback para o original

        finally:
            gc.collect()

        return output_paths
