import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { Mock3DProvider } from './providers/mock-3d.provider';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    // Em produção, isso viraria uma Factory dependendo da env var
    { provide: 'AiProvider', useClass: Mock3DProvider }
  ],
})
export class AiModule {}
