import { Injectable, UnauthorizedException, ConflictException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { prisma } from '@vega3d/database';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {
  private readonly sysLogger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private auditService: AuditService,
  ) {}

  async register(data: any, ipAddress?: string, userAgent?: string) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Senhas não coincidem');
    }
    // Simplificação da validação forte via código. Em prod usar class-validator no DTO
    if (data.password.length < 8) {
       throw new BadRequestException('Senha deve ter no mínimo 8 caracteres');
    }

    try {
      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email: data.email }, { username: data.username }] }
      });
      if (existingUser) throw new ConflictException('Email ou Username já em uso');

      const passwordHash = await bcrypt.hash(data.password, 12);
      const user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          name: data.name,
          passwordHash,
        }
      });

      await this.auditService.logEvent(user.id, 'USER_REGISTERED', ipAddress, userAgent);
      return await this.createSessionAndTokens(user.id, user.email, user.role, ipAddress, userAgent);
    } catch (error) {
      this.sysLogger.error(`Error during registration: ${error.message}`, error.stack);
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException(`Erro interno: ${error.message}`);
    }
  }

  async login(data: any, ipAddress?: string, userAgent?: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { OR: [{ email: data.identifier }, { username: data.identifier }] }
      });
      if (!user || !user.passwordHash) throw new UnauthorizedException('Credenciais inválidas');

      const isMatch = await bcrypt.compare(data.password, user.passwordHash);
      if (!isMatch) {
         await this.auditService.logEvent(user.id, 'FAILED_LOGIN_ATTEMPT', ipAddress, userAgent);
         throw new UnauthorizedException('Credenciais inválidas');
      }

      await this.auditService.logEvent(user.id, 'USER_LOGGED_IN', ipAddress, userAgent);
      return await this.createSessionAndTokens(user.id, user.email, user.role, ipAddress, userAgent);
    } catch (error) {
      this.sysLogger.error(`Error during login: ${error.message}`, error.stack);
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(`Erro interno: ${error.message}`);
    }
  }

  private async createSessionAndTokens(userId: string, email: string, role: string, ipAddress?: string, userAgent?: string) {
    const payload = { sub: userId, email, role };
    const accessToken = this.jwtService.sign(payload);
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'default_refresh_secret_123_!@#';
    const refreshToken = this.jwtService.sign(payload, { secret: refreshSecret, expiresIn: '7d' });

    const session = await prisma.session.create({
      data: {
        userId,
        token: refreshToken,
        ipAddress,
        deviceInfo: userAgent,
      }
    });

    return { user: { id: userId, email }, accessToken, refreshToken, sessionId: session.id };
  }

  async logout(userId: string, refreshToken: string) {
    await prisma.session.deleteMany({
      where: { userId, token: refreshToken },
    });
    await this.auditService.logEvent(userId, 'USER_LOGGED_OUT');
  }
}
