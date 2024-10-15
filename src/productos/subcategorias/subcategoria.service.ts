/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

import { CreateSubcategoriaDto } from './dtos/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dtos/update-subcategoria.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Injectable()
export class SubcategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(CreateSubcategoriaDto: CreateSubcategoriaDto) {
    return this.prisma.subcategoria.create({
      data: CreateSubcategoriaDto,
    });
  }

  async findAll() {
    const subcategorias = await this.prisma.subcategoria.findMany();
    return subcategorias;
  }

  async findOne(id: number) {
    return this.prisma.subcategoria.findUnique({
      where: { idSubcategoria: id },
      include: { categoria: true },
    });
  }

  async update(id: number, updateSubcategoriaDto: UpdateSubcategoriaDto) {
    try {
      return await this.prisma.subcategoria.update({
        where: { idSubcategoria: id },
        data: updateSubcategoriaDto,
      });
    } catch (error) {
      throw new Error(`Error updating subcategory with id ${id}`);
    }
  }

  async remove(id: number) {
    return this.prisma.subcategoria.delete({
      where: { idSubcategoria: id },
    });
  }
}
