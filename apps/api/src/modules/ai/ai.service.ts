import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@vega3d/database';
import { IAiProvider } from './providers/ai-provider.interface';

@Injectable()
export class AiService {
  constructor(
    @Inject('AiProvider') private readonly aiProvider: IAiProvider
  ) {}

  async generate(userId: string, data: { prompt: string; negativePrompt?: string; style?: string; projectId?: string; imageUrl?: string }) {
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

    // Inicia no provedor com lógica de FALLBACK
    let providerJobId: string;
    try {
      if (data.imageUrl) {
        providerJobId = await this.aiProvider.generateImageTo3D(data.imageUrl, data.prompt);
      } else {
        providerJobId = await this.aiProvider.generateTextTo3D(data.prompt, data.negativePrompt);
      }
    } catch (primaryError) {
      console.warn(`[AI Fallback] Falha no provedor primário. Tentando fallback... Erro: ${primaryError.message}`);
      
      try {
        // Simulando fallback para um provedor secundário
        // Na vida real: await this.secondaryProvider.generate(...)
        providerJobId = `fallback-job-${Date.now()}`;
      } catch (fallbackError) {
        await prisma.generation.update({ where: { id: generation.id }, data: { status: 'FAILED', errorReason: 'Todos os provedores falharam' } });
        await prisma.user.update({ where: { id: userId }, data: { credits: { increment: 1 } } });
        throw new BadRequestException('Falha ao iniciar provedores de IA');
      }
    }
    
    await prisma.generationJob.create({
      data: { generationId: generation.id, providerJobId }
    });

    await prisma.generation.update({
      where: { id: generation.id },
      data: { status: 'PROCESSING' }
    });

    return { generationId: generation.id, status: 'PROCESSING' };
  }

  async checkStatus(userId: string, generationId: string) {
    const generation = await prisma.generation.findUnique({ 
      where: { id: generationId },
      include: { job: true } 
    });

    if (!generation || generation.userId !== userId) throw new NotFoundException();
    if (generation.status === 'COMPLETED' || generation.status === 'FAILED') return generation;
    if (!generation.job?.providerJobId) return generation;

    // Faz polling no provedor
    const status = await this.aiProvider.checkStatus(generation.job.providerJobId);

    const updateData: any = {
      progress: status.progress,
      status: status.status
    };

    if (status.status === 'COMPLETED' && status.modelUrl) {
      updateData.completedAt = new Date();
      // Em prod, baixaríamos o arquivo e criaríamos um Asset de verdade no S3.
      // Aqui vamos criar um Asset apontando para o URL gerado (ex: dummy-model.glb).
      const asset = await prisma.asset.create({
        data: {
          name: `${generation.prompt.substring(0, 20)}.glb`,
          type: 'MODEL3D',
          mimeType: 'model/gltf-binary',
          url: status.modelUrl,
          size: 0,
          userId,
          projectId: generation.projectId
        }
      });
      updateData.resultAssetId = asset.id;
    }

    if (status.status === 'FAILED') {
      updateData.errorReason = status.error;
      // Reembolso
      await prisma.user.update({ where: { id: userId }, data: { credits: { increment: 1 } } });
    }

    return prisma.generation.update({
      where: { id: generationId },
      data: updateData,
      include: { resultAsset: true }
    });
  }
}
