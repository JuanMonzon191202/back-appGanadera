/* eslint-disable @typescript-eslint/no-unused-vars */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcategoriaDto } from './create-subcategoria.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubcategoriaDto extends PartialType(CreateSubcategoriaDto) {
  @ApiPropertyOptional({
    description: 'El nombre de la subcategoría.',
    example: 'Computadoras Portátiles',
  })
  nombre?: string;

  @ApiPropertyOptional({
    description:
      'El ID de la categoría principal a la que pertenece la subcategoría.',
    example: 1,
  })
  idCategoria?: number;

  @ApiPropertyOptional({
    description: 'Descripción opcional de la subcategoría.',
    example: 'Subcategoría de productos relacionados con portátiles.',
  })
  descripcion?: string;
}
