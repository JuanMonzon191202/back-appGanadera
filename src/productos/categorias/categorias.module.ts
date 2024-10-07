// src/categorias/categorias.module.ts
import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthModule } from '../../auth/auth.module'; // Importamos el módulo de Auth

@Module({
  imports: [AuthModule],
  controllers: [CategoriasController],
  providers: [CategoriasService, PrismaService],
})
export class CategoriasModule {}
