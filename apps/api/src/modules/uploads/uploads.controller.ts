import { Controller, Post, Get, Patch, Body, Param, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Uploads (Chunked)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('initialize')
  @ApiOperation({ summary: 'Iniciar intenção de upload para receber um JobID' })
  initialize(@CurrentUser() user: any, @Body() body: { filename: string; mimeType: string; totalSize: number; projectId?: string }) {
    return this.uploadsService.initializeUpload(user.sub, body);
  }

  @Post('chunk/:uploadId')
  @ApiOperation({ summary: 'Receber um pedaço do arquivo (chunk)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('chunk'))
  uploadChunk(
    @CurrentUser() user: any,
    @Param('uploadId') uploadId: string,
    @UploadedFile() chunk: Express.Multer.File,
    @Query('index') index: number,
    @Query('total') total: number
  ) {
    return this.uploadsService.processChunk(uploadId, user.sub, chunk, Number(index), Number(total));
  }

  @Get('queue')
  @ApiOperation({ summary: 'Obter status da fila global de uploads' })
  getQueueStatus(@CurrentUser() user: any) {
    return this.uploadsService.getQueueStatus(user.sub);
  }

  @Patch('status/:uploadId')
  @ApiOperation({ summary: 'Pausar, Retomar ou Cancelar Upload' })
  updateStatus(
    @CurrentUser() user: any,
    @Param('uploadId') uploadId: string,
    @Body('status') status: 'PAUSED' | 'PENDING' | 'FAILED'
  ) {
    return this.uploadsService.updateStatus(uploadId, user.sub, status);
  }
}
