import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiGateway } from './ai.gateway';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ai-3d-generation',
    }),
  ],
  controllers: [AiController],
  providers: [
    AiService,
    AiGateway
  ],
})
export class AiModule {}
