import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { prisma } from '@vega3d/database';

@Injectable()
export class AiService {
  constructor(
    @InjectQueue('ai-3d-generation') private readonly aiQueue: Queue
  ) {}

  async generate(userId: string, data: { prompt: string; negativePrompt?: string; style?: string; projectId?: string; imageUrl?: string; texture8k?: boolean; partsGeneration?: boolean; autoRigging?: boolean }) {
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

    // Despachar para o Nó Local (Worker Python com SF3D proprietário)
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
