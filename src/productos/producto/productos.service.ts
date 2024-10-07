// src/productos/productos.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductoDto: CreateProductoDto) {
    return this.prisma.producto.create({
      data: createProductoDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const offset = (page - 1) * limit; // Calcular el offset

    // Verifica que limit y offset sean números válidos
    const productos = await this.prisma.producto.findMany({
      take: limit, // Limitar los productos por página
      skip: offset, // Saltar los productos anteriores
    });

    const total = await this.prisma.producto.count(); // Contar el total de productos

    return {
      productos,
      total,
      totalPages: Math.ceil(total / limit), // Calcular el número total de páginas
      currentPage: page, // Página actual
    };
  }

  async findOne(id: number) {
    return this.prisma.producto.findUnique({
      where: { idProducto: id },
      include: { categoria: true },
    });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.prisma.producto.update({
      where: { idProducto: id },
      data: updateProductoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.producto.delete({
      where: { idProducto: id },
    });
  }
  // Método para filtrar productos
  async filter(
    nombre: string,
    categoriaId: number,
    paginationDto: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = paginationDto;

    // Aseguramos que los valores de page y limit sean positivos
    const currentPage = Math.max(page, 1);
    const currentLimit = Math.max(limit, 1);

    const offset = (currentPage - 1) * currentLimit;

    // Crear un objeto de filtro dinámico
    const where: any = {};
    if (nombre) {
      where.nombre = {
        contains: nombre,
        mode: 'insensitive', // Ignorar mayúsculas y minúsculas
      };
    }

    if (categoriaId) {
      where.categoriaId = categoriaId;
    }

    try {
      const productos = await this.prisma.producto.findMany({
        where, // Filtros dinámicos
        skip: offset, // Paginación
        take: currentLimit,
      });

      const total = await this.prisma.producto.count({ where });
      const totalPages = Math.ceil(total / currentLimit);

      return {
        productos,
        total,
        totalPages,
        currentPage,
      };
    } catch (error) {
      throw new Error('Error al filtrar productos: ' + error.message);
    }
  }
}
