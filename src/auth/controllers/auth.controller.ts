/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint para iniciar sesión de usuarios regulares
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  // Endpoint para iniciar sesión de administradores
  @Post('login/admin/')
  async logadmin(@Body() body: { email: string; password: string }) {
    return this.authService.logAdmin(body);
  }

  // Endpoint para solicitar un nuevo access token con el refresh token
  @Post('refresh-token')
  async refreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshAccessToken(body.refresh_token);
  }
}
