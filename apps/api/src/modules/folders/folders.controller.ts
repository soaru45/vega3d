import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Folders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post(':projectId')
  create(@Param('projectId') projectId: string, @Body() body: any) {
    return this.foldersService.create(projectId, body);
  }

  @Get(':projectId')
  findAll(@Param('projectId') projectId: string) {
    return this.foldersService.getTree(projectId);
  }

  @Patch(':id')
  rename(@Param('id') id: string, @Body() body: any) {
    return this.foldersService.rename(id, body.name, body.projectId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: any) {
    return this.foldersService.remove(id, body.projectId);
  }
}
