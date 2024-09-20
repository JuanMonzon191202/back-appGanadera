import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuarios/usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Ruta a la carpeta que contiene los archivos
      serveRoot: '/uploads', // URL a usar para acceder a los archivos
    }),
    AuthModule,
    UsuarioModule,
  ],
})
export class AppModule {}
