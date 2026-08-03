import { Injectable } from '@nestjs/common';
import { prisma } from '@vega3d/database';

@Injectable()
export class DashboardService {
  async getSummary(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true, storageLimit: true },
    });

    const totalProjects = await prisma.project.count({
      where: { userId }
    });

    // Calcula espaço total somando tamanho dos arquivos deste user
    const files = await prisma.file.aggregate({
      where: { project: { userId } },
      _sum: { size: true }
    });
    
    const storageUsed = files._sum.size || 0;
    
    const modelsCreated = await prisma.projectHistory.count({
      where: { project: { userId }, action: 'MODEL_GENERATED' }
    });

    return {
      credits: user?.credits || 0,
      storageUsed,
      storageLimit: Number(user?.storageLimit || 5368709120),
      totalProjects,
      modelsCreated,
    };
  }

  async getRecentActivities(userId: string) {
    // Busca logs da plataforma e do projeto para compor Timeline
    const [auditLogs, projectHistory] = await Promise.all([
      prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.projectHistory.findMany({
        where: { project: { userId } },
        orderBy: { createdAt: 'desc' },
        include: { project: { select: { name: true } } },
        take: 5
      })
    ]);

    // Mesclar e ordenar em memória (simplificação para este endpoint unificado)
    const combined = [
      ...auditLogs.map(log => ({ type: 'audit', action: log.action, date: log.createdAt, details: null })),
      ...projectHistory.map(hist => ({ type: 'project', action: hist.action, date: hist.createdAt, details: hist.project.name }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

    return combined;
  }
}
