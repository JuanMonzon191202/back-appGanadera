import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        const data = req.headers.authorization;
        if (data) {
          return data.split(' ')[1];
        }
        return null;
      },
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    // Aquí puedes agregar la lógica para validar el refresh token si es necesario
    return { userId: payload.sub, rol: payload.rol }; // Devuelves el payload del token
  }
}
