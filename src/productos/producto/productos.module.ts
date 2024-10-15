// src/productos/producto/productos.module.ts
import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductosController],
  providers: [ProductosService, PrismaService],
})
export class ProductosModule {}
