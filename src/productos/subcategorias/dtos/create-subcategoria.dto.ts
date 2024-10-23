import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubcategoriaDto {
  @ApiProperty({
    description: 'El nombre de la subcategoría.',
    example: 'Computadoras Portátiles',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string;

  @ApiProperty({
    description:
      'El ID de la categoría principal a la que pertenece la subcategoría.',
    example: 1,
  })
  @IsInt({ message: 'El ID de la categoría debe ser un número entero.' })
  idCategoria: number;

  @ApiPropertyOptional({
    description: 'Descripción opcional de la subcategoría.',
    example: 'Subcategoría de productos relacionados con portátiles.',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  descripcion?: string;
}
