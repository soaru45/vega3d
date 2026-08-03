import { Controller, Get, Patch, Body, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Workspace')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('preferences')
  @ApiOperation({ summary: 'Obter preferências salvas do Workspace' })
  getPreferences(@CurrentUser() user: any) {
    return this.workspaceService.getPreferences(user.sub);
  }

  @Patch('preferences')
  @ApiOperation({ summary: 'Atualizar persistência do Layout/Tabs' })
  updatePreferences(@CurrentUser() user: any, @Body() body: any) {
    return this.workspaceService.updatePreferences(user.sub, body);
  }

  @Get('search')
  @ApiOperation({ summary: 'Pesquisa Global indexada' })
  globalSearch(@CurrentUser() user: any, @Query('q') query: string) {
    return this.workspaceService.globalSearch(user.sub, query);
  }
}
