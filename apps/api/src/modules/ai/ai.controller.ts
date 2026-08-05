import { Controller, Post, Get, Body, Param, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  generateText(@CurrentUser() user: any, @Body() body: { prompt: string; negativePrompt?: string; style?: string; projectId?: string }) {
    return this.aiService.generate(user.sub, body);
  }

  @Post('image-to-3d')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Iniciar geração Image-to-3D (Custa 1 crédito)' })
  async generateImage(
    @CurrentUser() user: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { prompt?: string; projectId?: string }
  ) {
    if (!file) throw new BadRequestException('Imagem é obrigatória');
    
    // Na arquitetura Enterprise 100% Real, salvamos este buffer no S3 aqui,
    // obtemos a URL pública, e passamos para o AiService enfileirar no Redis.
    // Como mock provisório para a integração API -> Worker local:
    // Nós podemos salvar num diretório temporário ou apenas mockar a S3 URL local.
    const tempUrl = `http://localhost:9000/vega3d-bucket/temp/${Date.now()}.png`;

    return this.aiService.generate(user.sub, {
      prompt: body.prompt || 'Modelo gerado por imagem',
      projectId: body.projectId,
      imageUrl: tempUrl
    });
  }

  @Get('generations/:id')
  @ApiOperation({ summary: 'Polling de status da geração' })
  checkStatus(@CurrentUser() user: any, @Param('id') generationId: string) {
    return this.aiService.checkStatus(user.sub, generationId);
  }
}
