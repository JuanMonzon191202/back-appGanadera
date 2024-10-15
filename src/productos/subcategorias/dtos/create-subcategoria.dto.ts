import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateSubcategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  idCategoria: number;

  @IsString()
  descripcion?: string;
}
