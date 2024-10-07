import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsuarioService } from '../../usuarios/usuario/services/usuario.service';
import { AdminService } from 'src/usuarios/usuario/services/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usuarioService: UsuarioService,
    private readonly adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'), // El secreto del access token
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.rol) {
      throw new UnauthorizedException('Rol no proporcionado en el token');
    }

    // Aquí verificamos si el usuario existe
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
