import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsuarioService } from '../../usuarios/usuario/services/usuario.service';
import { AdminService } from 'src/usuarios/usuario/services/admin.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    private configService: ConfigService,
    private usuarioService: UsuarioService,
    private adminService: AdminService,
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
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.rol) {
      throw new UnauthorizedException('Rol no proporcionado en el token');
    }

    if (payload.rol === 'USER') {
      const user = await this.usuarioService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      return { idUsuario: user.idUsuario, email: user.email, rol: user.role };
    } else if (payload.rol === 'ADMIN') {
      const admin = await this.adminService.findOne(payload.sub);
      if (!admin) {
        throw new UnauthorizedException('Administrador no encontrado');
      }
      return { id: admin.id, email: admin.email, rol: admin.role };
    } else {
      throw new UnauthorizedException('Rol inválido');
    }
  }
}
