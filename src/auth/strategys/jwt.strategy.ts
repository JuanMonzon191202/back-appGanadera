import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsuarioService } from '../../usuarios/usuario/services/usuario.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usuarioService: UsuarioService,
  ) {
    super({
      jwtFromRequest: (req) => {
        const data = req.headers.authorization;
        if (data) {
          return data.split(' ')[1];
        }
        return null;
      },
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usuarioService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    // Devuelve los datos del usuario, asegurándote de que los campos sean los correctos
    return { idUsuario: user.idUsuario, email: user.email };
  }
}
