import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret_key_123_!@#',
    });
  }

  async validate(payload: any) {
    // Retorna os dados para o request.user
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}
