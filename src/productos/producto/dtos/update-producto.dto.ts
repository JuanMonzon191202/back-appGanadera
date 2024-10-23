// src/productos/dtos/update-producto.dto.ts
import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiPropertyOptional({
    description: 'El nombre del producto (opcional).',
    example: 'Laptop Lenovo X1 Carbon',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre?: string;

  @ApiPropertyOptional({
    description:
      'El ID de la categoría a la que pertenece el producto (opcional).',
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'El ID de la categoría debe ser un número entero.' })
  idCategoria?: number;

  @ApiPropertyOptional({
    description: 'URL de la imagen del producto (opcional).',
    example: 'https://ejemplo.com/imagen-producto.jpg',
  })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La imagen es obligatoria.' })
  imagen?: string;
}
