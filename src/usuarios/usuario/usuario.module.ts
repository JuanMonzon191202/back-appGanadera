import { Module, forwardRef } from '@nestjs/common';
import { UsuarioService } from '../usuario/services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { AuthModule } from '../../auth/auth.module';
import { TelefonosController } from './controllers/telefono.controller';
import { TelefonosService } from './services/telefono.service';
import { DireccionesController } from './controllers/direccion.controller';
import { DireccionesService } from './services/direcciones.service';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)], // Importa Prisma para la interacción con la base de datos
  controllers: [
    UsuarioController,
    AdminController,
    TelefonosController,
    DireccionesController,
  ],
  providers: [
    UsuarioService,
    AdminService,
    TelefonosService,
    DireccionesService,
  ],
  exports: [UsuarioService, AdminService, TelefonosService, DireccionesService],
})
export class UsuarioModule {}
