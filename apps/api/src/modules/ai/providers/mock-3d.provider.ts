import { Injectable, Logger } from '@nestjs/common';
import { IAiProvider, AiGenerationResult } from './ai-provider.interface';

@Injectable()
export class Mock3DProvider implements IAiProvider {
  private readonly logger = new Logger(Mock3DProvider.name);
  // Simularemos o tempo e progresso guardando em memória
  private jobs = new Map<string, { progress: number; status: 'PROCESSING'|'COMPLETED'|'FAILED' }>();

  async generateTextTo3D(prompt: string, negativePrompt?: string): Promise<string> {
    this.logger.log(`[MOCK] Generating 3D for prompt: ${prompt}`, 'Mock3DProvider');
    const jobId = `mock-job-${Date.now()}`;
    this.jobs.set(jobId, { progress: 0, status: 'PROCESSING' });
    
    // Simula processamento assíncrono avançando a cada 1 segundo
    const interval = setInterval(() => {
      const job = this.jobs.get(jobId);
      if (job) {
        job.progress += 20; // avança 20%
        if (job.progress >= 100) {
          job.progress = 100;
          job.status = 'COMPLETED';
          clearInterval(interval);
        }
      }
    }, 1000);

    return jobId; // Retorna rápido como uma fila
  }

  async checkStatus(providerJobId: string): Promise<AiGenerationResult> {
    const job = this.jobs.get(providerJobId);
    if (!job) return { status: 'FAILED', progress: 0, error: 'Job não encontrado no provedor' };

    return {
      status: job.status,
      progress: job.progress,
      // Em produção, a URL vem do Bucket deles ou baixada pro nosso S3. Usamos dummy glb.
      modelUrl: job.status === 'COMPLETED' ? '/assets/dummy-model.glb' : undefined
    };
  }

  async generateImageTo3D(imageUrl: string, prompt?: string): Promise<string> {
    this.logger.log(`[MOCK] Generating 3D for image: ${imageUrl}`, 'Mock3DProvider');
    const jobId = `mock-job-img-${Date.now()}`;
    this.jobs.set(jobId, { progress: 0, status: 'PROCESSING' });
    
    const interval = setInterval(() => {
      const job = this.jobs.get(jobId);
      if (job) {
        job.progress += 20;
        if (job.progress >= 100) {
          job.progress = 100;
          job.status = 'COMPLETED';
          clearInterval(interval);
        }
      }
    }, 1000);

    return jobId;
  }
}
