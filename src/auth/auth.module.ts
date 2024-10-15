import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsuarioModule } from '../usuarios/usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
// import { AdminJwtStrategy } from './strategys/admin-jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RolesGuard } from './guards/roles.guard';
import { RefreshJwtStrategy } from './strategys/refreshToken.strategy';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,

    // JwtModule para manejar el access token
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Secreto para access token
        signOptions: { expiresIn: '2d' }, // Expiración del access token
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    // AdminJwtStrategy,
    JwtStrategy,

    RolesGuard,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
