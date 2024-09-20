import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Campo para el nombre de usuario (en este caso, el email)
      passwordField: 'password', // Campo para la contraseña
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // Valida al usuario con el AuthService
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Lanzar una excepción si las credenciales son incorrectas
    }
    return user; // Retorna el usuario si es válido
  }
}
