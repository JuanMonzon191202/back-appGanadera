import { Module, forwardRef } from '@nestjs/common';
import { UsuarioService } from '../usuario/services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { AuthModule } from '../../auth/auth.module';
import { TelefonosController } from './controllers/telefono.controller';
import { TelefonosService } from './services/telefono.service';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)], // Importa Prisma para la interacción con la base de datos
  controllers: [UsuarioController, AdminController, TelefonosController],
  providers: [UsuarioService, AdminService, TelefonosService],
  exports: [UsuarioService, AdminService, TelefonosService],
})
export class UsuarioModule {}
