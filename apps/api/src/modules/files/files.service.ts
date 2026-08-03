import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, File } from '@vega3d/database';
import { HistoryService } from '../history/history.service';
// import { IStorageService } from '../storage/storage.interface'; // A ser injetado quando configurarmos R2

@Injectable()
export class FilesService {
  constructor(private historyService: HistoryService) {}

  async uploadFile(projectId: string, file: Express.Multer.File, folderId?: string): Promise<File> {
    // 1. Simula envio para o Storage (R2/S3)
    const mockUrl = `https://storage.vega3d.com/mock/${file.originalname}`;
    
    // 2. Grava no banco de dados
    const newFile = await prisma.file.create({
      data: {
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: mockUrl,
        projectId,
        folderId,
      },
    });

    await this.historyService.log(projectId, 'FILE_UPLOADED', `Arquivo ${file.originalname} adicionado.`);
    return newFile;
  }

  async getFilesByProject(projectId: string): Promise<File[]> {
    return prisma.file.findMany({ where: { projectId } });
  }

  async rename(id: string, newName: string, projectId: string): Promise<File> {
    const file = await prisma.file.update({
      where: { id, projectId },
      data: { name: newName },
    });
    await this.historyService.log(projectId, 'FILE_RENAMED', `Arquivo renomeado para ${newName}`);
    return file;
  }

  async remove(id: string, projectId: string): Promise<void> {
    // 1. Remover do DB
    const file = await prisma.file.delete({ where: { id, projectId } });
    // 2. Aqui você chamaria o storageService.delete(file.url)
    await this.historyService.log(projectId, 'FILE_DELETED', `Arquivo removido`);
  }
}
