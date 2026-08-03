import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, Project } from '@vega3d/database';
import { HistoryService } from '../history/history.service';

@Injectable()
export class ProjectsService {
  constructor(private historyService: HistoryService) {}

  async create(userId: string, data: { name: string; description?: string }): Promise<Project> {
    const project = await prisma.project.create({
      data: { ...data, userId },
    });
    await this.historyService.log(project.id, 'PROJECT_CREATED', 'Projeto inicializado');
    return project;
  }

  async findAll(userId: string): Promise<Project[]> {
    return prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: { tags: true }
    });
  }

  async findOne(userId: string, id: string): Promise<Project> {
    const project = await prisma.project.findFirst({
      where: { id, userId },
      include: { folders: true, files: true, tags: true }
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(userId: string, id: string, data: Partial<Project>): Promise<Project> {
    const project = await prisma.project.update({
      where: { id, userId },
      data,
    });
    await this.historyService.log(id, 'PROJECT_UPDATED', `Projeto atualizado`);
    return project;
  }

  async remove(userId: string, id: string): Promise<void> {
    await prisma.project.delete({ where: { id, userId } });
  }

  async duplicate(userId: string, id: string): Promise<Project> {
    const original = await this.findOne(userId, id);
    return this.create(userId, { name: `${original.name} (Cópia)`, description: original.description });
  }
}
