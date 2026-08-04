import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnv } from './config/env.config';

import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { FilesModule } from './modules/files/files.module';
import { FoldersModule } from './modules/folders/folders.module';
import { HistoryModule } from './modules/history/history.module';
import { AuditModule } from './modules/audit/audit.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { LibraryModule } from './modules/library/library.module';
import { AiModule } from './modules/ai/ai.module';

import { AppLoggerService } from './common/logger/logger.service';
import { CacheService } from './modules/cache/cache.service';
import { QueueService } from './modules/queue/queue.service';

import { GlobalModule } from './common/global.module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: '../../.env.local',
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    FilesModule,
    FoldersModule,
    HistoryModule,
    AuditModule,
    DashboardModule,
    WorkspaceModule,
    UploadsModule,
    LibraryModule,
    AiModule,
  ],
})
export class AppModule {}
