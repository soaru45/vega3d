import { Controller, Get, Patch, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LibraryService } from './library.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Library')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('assets')
  @ApiOperation({ summary: 'Listar assets com filtros (trash, favorites, all)' })
  getAssets(@CurrentUser() user: any, @Query('filter') filter: string) {
    return this.libraryService.getAssets(user.sub, filter || 'all');
  }

  @Patch('assets/:id/favorite')
  @ApiOperation({ summary: 'Alternar favorito' })
  toggleFavorite(@CurrentUser() user: any, @Param('id') assetId: string) {
    return this.libraryService.toggleFavorite(user.sub, assetId);
  }

  @Patch('assets/:id/trash')
  @ApiOperation({ summary: 'Mover para lixeira / Restaurar' })
  toggleTrash(@CurrentUser() user: any, @Param('id') assetId: string) {
    return this.libraryService.toggleTrash(user.sub, assetId);
  }

  @Delete('assets/:id')
  @ApiOperation({ summary: 'Excluir permanentemente da Lixeira' })
  deletePermanent(@CurrentUser() user: any, @Param('id') assetId: string) {
    return this.libraryService.deletePermanent(user.sub, assetId);
  }
}
