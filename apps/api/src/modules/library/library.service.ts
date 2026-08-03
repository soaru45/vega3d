import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@vega3d/database';

@Injectable()
export class LibraryService {
  async getAssets(userId: string, filter: string) {
    const where: any = { userId };
    
    if (filter === 'favorites') where.isFavorite = true;
    else if (filter === 'trash') where.isDeleted = true;
    else where.isDeleted = false; // Default: não deletados
    
    return prisma.asset.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { category: true, folder: true }
    });
  }

  async toggleFavorite(userId: string, assetId: string) {
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset || asset.userId !== userId) throw new NotFoundException();
    
    return prisma.asset.update({
      where: { id: assetId },
      data: { isFavorite: !asset.isFavorite }
    });
  }

  async toggleTrash(userId: string, assetId: string) {
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset || asset.userId !== userId) throw new NotFoundException();
    
    const isDeleted = !asset.isDeleted;
    
    await prisma.assetHistory.create({
      data: {
        assetId,
        action: isDeleted ? 'MOVED_TO_TRASH' : 'RESTORED_FROM_TRASH'
      }
    });

    return prisma.asset.update({
      where: { id: assetId },
      data: { 
        isDeleted,
        deletedAt: isDeleted ? new Date() : null
      }
    });
  }

  async deletePermanent(userId: string, assetId: string) {
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset || asset.userId !== userId) throw new NotFoundException();
    
    // Aqui removeria o arquivo físico do S3/R2 antes
    return prisma.asset.delete({ where: { id: assetId } });
  }
}
