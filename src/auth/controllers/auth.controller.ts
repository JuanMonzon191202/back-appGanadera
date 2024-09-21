/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Post('login/admin/')
  async logadmin(@Body() body: { email: string; password: string }) {
    return this.authService.logAdmin(body);
  }
}
