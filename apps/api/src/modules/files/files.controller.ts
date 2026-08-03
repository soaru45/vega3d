import { Controller, Post, Get, Param, UseInterceptors, UploadedFile, UseGuards, Body, Patch, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':projectId/upload')
  @UseInterceptors(FileInterceptor('file')) // Suporta Multer out-of-the-box
  @ApiConsumes('multipart/form-data')
  upload(
    @Param('projectId') projectId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('folderId') folderId?: string,
  ) {
    return this.filesService.uploadFile(projectId, file, folderId);
  }

  @Get(':projectId')
  listByProject(@Param('projectId') projectId: string) {
    return this.filesService.getFilesByProject(projectId);
  }

  @Patch(':id/rename')
  rename(@Param('id') id: string, @Body('name') name: string, @Body('projectId') projectId: string) {
    return this.filesService.rename(id, name, projectId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body('projectId') projectId: string) {
    return this.filesService.remove(id, projectId);
  }
}
