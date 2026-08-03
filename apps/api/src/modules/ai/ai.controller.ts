import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('AI Generation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('text-to-3d')
  @ApiOperation({ summary: 'Iniciar geração Text-to-3D (Custa 1 crédito)' })
  generate(@CurrentUser() user: any, @Body() body: { prompt: string; negativePrompt?: string; style?: string; projectId?: string }) {
    return this.aiService.generate(user.sub, body);
  }

  @Get('generations/:id')
  @ApiOperation({ summary: 'Polling de status da geração' })
  checkStatus(@CurrentUser() user: any, @Param('id') generationId: string) {
    return this.aiService.checkStatus(user.sub, generationId);
  }
}
