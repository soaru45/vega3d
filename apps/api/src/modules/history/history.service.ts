import { Injectable } from '@nestjs/common';
import { prisma } from '@vega3d/database';

@Injectable()
export class HistoryService {
  async log(projectId: string, action: string, diff?: string) {
    return prisma.projectHistory.create({
      data: {
        projectId,
        action,
        diff,
      },
    });
  }

  async getHistoryByProject(projectId: string) {
    return prisma.projectHistory.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
