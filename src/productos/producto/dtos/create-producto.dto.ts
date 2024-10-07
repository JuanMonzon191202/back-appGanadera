// src/productos/dtos/create-producto.dto.ts
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  idCategoria: number;

  @IsString()
  imagen: string;
}
