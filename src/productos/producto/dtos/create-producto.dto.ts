import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({
    description: 'El nombre del producto.',
    example: 'Laptop Lenovo X1 Carbon',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string;

  @ApiProperty({
    description: 'El ID de la categoría a la que pertenece el producto.',
    example: 1,
  })
  @IsInt({ message: 'El ID de la categoría debe ser un número entero.' })
  idCategoria: number;

  @ApiProperty({
    description: 'URL de la imagen del producto.',
    example: 'https://ejemplo.com/imagen-pito.jpg',
  })
  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La imagen es obligatoria.' })
  imagen: string;
}
