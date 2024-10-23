// src/categorias/dto/update-categoria.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoriaDto {
  @ApiPropertyOptional({
    description: 'El nombre de la categoría (opcional).',
    example: 'Electrodomésticos',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Descripción opcional de la categoría.',
    example: 'Artículos relacionados.',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;
}
