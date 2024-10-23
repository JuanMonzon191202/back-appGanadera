import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuarios/usuario/services/usuario.service';
import { AdminService } from '../../usuarios/usuario/services/admin.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dtos/login.dto';

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

  // Método para generar tokens
  private generateTokens(payload: any) {
    const access_token = this.jwtService.sign(payload); // Para el access token
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d', // Tiempo de vida del refresh token
    });

    return { access_token, refresh_token };
  }

  // Método para iniciar sesión de usuarios regulares
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      email: user.email,
      sub: user.idUsuario,
      idUsuario: user.idUsuario,
      rol: user.role,
    };

    // Generamos y devolvemos los tokens
    return this.generateTokens(payload);
  }

  // Método para iniciar sesión de administradores
  async logAdmin(loginDto: LoginDto) {
    // Cambia el parámetro para usar el DTO
    const admin = await this.validateAdmin(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      email: admin.email,
      sub: admin.id,
      rol: admin.role,
    };

    // Generamos y devolvemos los tokens para el administrador
    return this.generateTokens(payload);
  }

  // Método para refrescar el access token usando el refresh token
  async refreshAccessToken(refreshToken: string) {
    try {
      // Verificamos el refresh token usando el secreto correcto
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // Verificamos si el refresh token aún está vigente (comparando el tiempo actual con 'exp')
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      if (payload.exp < currentTime) {
        throw new ForbiddenException('El refresh token ha expirado');
      }

      // Si el token es válido y no ha expirado, generamos un nuevo access token
      const newAccessToken = this.jwtService.sign({
        email: payload.email,
        sub: payload.sub,
        idUsuario: payload.idUsuario,
        rol: payload.rol,
      });

      return {
        access_token: newAccessToken,
      };
    } catch (e) {
      console.error('Error al verificar el refresh token:', e);
      throw new ForbiddenException('Refresh token inválido');
    }
  }
}
