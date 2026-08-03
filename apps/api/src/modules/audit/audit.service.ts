import { Injectable } from '@nestjs/common';
import { prisma } from '@vega3d/database';
import { AppLoggerService } from '../../common/logger/logger.service';

@Injectable()
export class AuditService {
  constructor(private logger: AppLoggerService) {}

  async logEvent(userId: string, action: string, ipAddress?: string, userAgent?: string) {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          action,
          ipAddress,
          userAgent,
        }
      });
      this.logger.log(`[Audit] ${action} - User: ${userId}`);
    } catch (error) {
      this.logger.error('Falha ao registrar AuditLog', String(error), 'AuditService');
    }
  }
}
