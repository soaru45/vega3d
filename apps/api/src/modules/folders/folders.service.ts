import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, Folder } from '@vega3d/database';
import { HistoryService } from '../history/history.service';

@Injectable()
export class FoldersService {
  constructor(private historyService: HistoryService) {}

  async create(projectId: string, data: { name: string; parentId?: string }): Promise<Folder> {
    const folder = await prisma.folder.create({
      data: { ...data, projectId },
    });
    await this.historyService.log(projectId, 'FOLDER_CREATED', `Pasta ${data.name} criada`);
    return folder;
  }

  async getTree(projectId: string): Promise<Folder[]> {
    // Pega todas as pastas. A montagem em árvore seria melhor feita no Frontend.
    return prisma.folder.findMany({ where: { projectId } });
  }

  async rename(id: string, name: string, projectId: string): Promise<Folder> {
    return prisma.folder.update({ where: { id, projectId }, data: { name } });
  }

  async remove(id: string, projectId: string): Promise<void> {
    await prisma.folder.delete({ where: { id, projectId } });
  }
}
