import { Controller, Get, Patch, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obter perfil do usuário logado' })
  async getProfile(@CurrentUser() user: any) {
    const fullUser = await this.usersService.findById(user.sub);
    if (fullUser) {
       const { passwordHash, ...rest } = fullUser;
       return rest;
    }
    return null;
  }

  @Patch('me/profile')
  @ApiOperation({ summary: 'Atualizar dados de perfil' })
  async updateProfile(@CurrentUser() user: any, @Body() body: any) {
    const updated = await this.usersService.updateProfile(user.sub, body);
    const { passwordHash, ...rest } = updated;
    return rest;
  }

  @Patch('me/settings')
  @ApiOperation({ summary: 'Atualizar configurações (Tema, Notificações)' })
  async updateSettings(@CurrentUser() user: any, @Body() body: any) {
    return this.usersService.updateSettings(user.sub, body);
  }

  @Get('me/sessions')
  @ApiOperation({ summary: 'Listar sessões ativas (Dispositivos conectados)' })
  async getSessions(@CurrentUser() user: any) {
    return this.usersService.getSessions(user.sub);
  }

  @Delete('me/sessions/:sessionId')
  @ApiOperation({ summary: 'Revogar uma sessão específica' })
  async revokeSession(@CurrentUser() user: any, @Param('sessionId') sessionId: string) {
    await this.usersService.revokeSession(user.sub, sessionId);
    return { success: true };
  }
}
