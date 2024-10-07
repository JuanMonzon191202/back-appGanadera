// src/categorias/categorias.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCategoriaDto } from './dtos/create-categoria.dto';
import { UpdateCategoriaDto } from './dtos/update-categoria.dto';
import { PaginationDto } from './dtos/pagination.dto';
@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: createCategoriaDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [categorias, total] = await Promise.all([
      this.prisma.categoria.findMany({
        take: limit,
        skip: offset,
      }),
      this.prisma.categoria.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const currentPage = page;

    return {
      categorias,
      total,
      totalPages,
      currentPage,
    };
  }

  async findOne(id: number) {
    return this.prisma.categoria.findUnique({
      where: { idCategoria: id },
    });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { idCategoria: id },
      data: updateCategoriaDto,
    });
  }

  async remove(id: number) {
    return this.prisma.categoria.delete({
      where: { idCategoria: id },
    });
  }
}
