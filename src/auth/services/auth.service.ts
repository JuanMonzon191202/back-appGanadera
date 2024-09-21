import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuarios/usuario/services/usuario.service';
import { AdminService } from 'src/usuarios/usuario/services/admin.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuarioService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Validar usuario regular
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuariosService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Validar administrador
  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findByEmailAdmin(email);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    return null;
  }

  // Método para iniciar sesión de usuarios regulares
  async login(body: { email: string; password: string }) {
    const user = await this.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException(
        'Credenciales inválidas' + body.email + body.password,
      );
    }
    const payload = {
      email: user.email,
      sub: user.idUsuario,
      idUsuario: user.idUsuario,
      rol: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método para iniciar sesión de administradores
  async logAdmin(admin: any) {
    const payload = {
      email: admin.email,
      sub: admin.id,
      rol: admin.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
