import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
// import { TelefonoModule } from './telefono/telefono.module';
// import { DireccionModule } from './direccion/direccion.module';
// import { LikeModule } from './like/like.module';

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    // TelefonoModule,
    // DireccionModule,
    // LikeModule,
  ],
})
export class AppModule {}
