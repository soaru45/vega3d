import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Obter resumo de métricas do usuário' })
  getSummary(@CurrentUser() user: any) {
    return this.dashboardService.getSummary(user.sub);
  }

  @Get('activities')
  @ApiOperation({ summary: 'Obter feed de atividades recentes' })
  getActivities(@CurrentUser() user: any) {
    return this.dashboardService.getRecentActivities(user.sub);
  }
}
