import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriasController } from './subcategoria.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SubcategoriasController],
  providers: [SubcategoriaService, PrismaService],
})
export class SubcategoriasModule {}
