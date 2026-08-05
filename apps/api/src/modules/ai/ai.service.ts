import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { prisma } from '@vega3d/database';
import { TripoApiService } from './providers/tripo.service';

@Injectable()
export class AiService {
  constructor(
    @InjectQueue('ai-3d-generation') private readonly aiQueue: Queue,
    private readonly tripoApi: TripoApiService
  ) {}

  async generate(userId: string, data: { prompt: string; negativePrompt?: string; style?: string; projectId?: string; imageUrl?: string; nodeType?: string; texture8k?: boolean; partsGeneration?: boolean; autoRigging?: boolean }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user.credits < 1) throw new BadRequestException('Créditos insuficientes');

    // Debitar crédito e criar Generation
    await prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 1 } } });
    
    const generation = await prisma.generation.create({
      data: {
        userId,
        projectId: data.projectId,
        prompt: data.prompt,
        negativePrompt: data.negativePrompt,
        style: data.style,
        status: 'QUEUED'
      }
    });

    if (data.nodeType === 'cloud') {
      // 1. Despachar para a Nuvem Oficial (API do Tripo3D)
      const cloudJob = await this.tripoApi.generateFromImage(data.imageUrl || '', {
        texture8k: data.texture8k,
        autoRigging: data.autoRigging
      });

      await prisma.generationJob.create({
        data: { generationId: generation.id, providerJobId: cloudJob.data.task_id }
      });

      return { generationId: generation.id, jobId: cloudJob.data.task_id, status: 'QUEUED', node: 'cloud' };

    } else {
      // 2. Despachar para o Nó Local (Worker Python com SF3D)
      const job = await this.aiQueue.add('generate-3d', {
        generationId: generation.id,
        userId,
        prompt: data.prompt,
        imageUrl: data.imageUrl,
        autoRigging: data.autoRigging,
        texture8k: data.texture8k,
        partsGeneration: data.partsGeneration
      }, {
        removeOnComplete: true,
        removeOnFail: false, // Guardar falhas para debug
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 }
      });

      await prisma.generationJob.create({
        data: { generationId: generation.id, providerJobId: job.id }
      });

      return { generationId: generation.id, jobId: job.id, status: 'QUEUED', node: 'local' };
    }
  }
}
