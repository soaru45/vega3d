import { Injectable } from '@nestjs/common';
import { prisma } from '@vega3d/database';

@Injectable()
export class WorkspaceService {
  async getPreferences(userId: string) {
    return prisma.workspacePreference.findUnique({
      where: { userId }
    });
  }

  async updatePreferences(userId: string, data: { layoutConfig?: string; activeTabs?: string; theme?: string }) {
    return prisma.workspacePreference.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      }
    });
  }

  async globalSearch(userId: string, query: string) {
    if (!query || query.length < 2) return { projects: [], files: [] };

    const [projects, files] = await Promise.all([
      prisma.project.findMany({
        where: { userId, name: { contains: query, mode: 'insensitive' } },
        take: 5,
        select: { id: true, name: true, updatedAt: true }
      }),
      prisma.file.findMany({
        where: { project: { userId }, name: { contains: query, mode: 'insensitive' } },
        take: 5,
        select: { id: true, name: true, projectId: true, mimeType: true }
      })
    ]);

    return { projects, files };
  }
}
