import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@vega3d/database';

@Injectable()
export class UploadsService {
  async initializeUpload(userId: string, data: { filename: string; mimeType: string; totalSize: number; projectId?: string }) {
    // Retorna ID e cria job
    return prisma.uploadJob.create({
      data: {
        userId,
        projectId: data.projectId,
        filename: data.filename,
        mimeType: data.mimeType,
        totalSize: data.totalSize,
      }
    });
  }

  async processChunk(uploadId: string, userId: string, chunk: Express.Multer.File, index: number, totalChunks: number) {
    const job = await prisma.uploadJob.findUnique({ where: { id: uploadId } });
    if (!job || job.userId !== userId) throw new NotFoundException('Job não encontrado');

    // Em produção real, anexar o `chunk.buffer` a um arquivo físico (ex: fs.appendFile)
    // Aqui atualizamos o progresso sumariamente:
    
    // Atualiza progresso no banco (mock logico)
    const newUploaded = BigInt(job.uploadedSize) + BigInt(chunk.size);
    const isCompleted = index === totalChunks - 1;

    const updatedJob = await prisma.uploadJob.update({
      where: { id: uploadId },
      data: {
        uploadedSize: newUploaded,
        status: isCompleted ? 'COMPLETED' : 'UPLOADING',
      }
    });

    if (isCompleted) {
      await this.finalizeUpload(updatedJob);
    }

    return { received: true, status: updatedJob.status, uploadedSize: updatedJob.uploadedSize.toString() };
  }

  private async finalizeUpload(job: any) {
    // Processamento pós upload: Hash, Metadados
    await prisma.uploadMetadata.create({
      data: {
        uploadId: job.id,
        thumbnailUrl: job.mimeType.startsWith('image') ? `thumb_${job.filename}` : null, // Mocks de geração
      }
    });
    
    // Insere no File System oficial
    if (job.projectId) {
      await prisma.file.create({
        data: {
          name: job.filename,
          mimeType: job.mimeType,
          size: Number(job.totalSize),
          url: `/cdn/uploads/${job.id}/${job.filename}`, // Mock URL
          projectId: job.projectId,
        }
      });
      
      await prisma.projectHistory.create({
         data: {
           action: 'FILE_UPLOADED',
           projectId: job.projectId,
           diff: job.filename
         }
      });
    }
  }

  async getQueueStatus(userId: string) {
    return prisma.uploadJob.findMany({
      where: { userId, status: { in: ['PENDING', 'UPLOADING', 'PAUSED'] } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateStatus(uploadId: string, userId: string, status: 'PAUSED' | 'PENDING' | 'FAILED') {
    const job = await prisma.uploadJob.findUnique({ where: { id: uploadId } });
    if (!job || job.userId !== userId) throw new NotFoundException();
    
    return prisma.uploadJob.update({
       where: { id: uploadId },
       data: { status }
    });
  }
}
