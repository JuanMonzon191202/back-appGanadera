import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateDireccionDto {
  @IsNotEmpty({ message: 'La calle es obligatoria.' })
  @IsString({ message: 'La calle debe ser una cadena de texto.' })
  @Length(5, 100, { message: 'La calle debe tener entre 5 y 100 caracteres.' })
  calle: string;

  @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'La ciudad debe tener entre 5 y 50 caracteres.' })
  ciudad: string;

  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  @IsString({ message: 'El estado debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El estado debe tener entre 5 y 50 caracteres.' })
  estado: string;

  @IsNotEmpty({ message: 'El código postal es obligatorio.' })
  @IsString({ message: 'El código postal debe ser una cadena de texto.' })
  @Length(5, 10, {
    message: 'El código postal debe tener entre 5 y 10 caracteres.',
  })
  codigoPostal: string;

  @IsNotEmpty({ message: 'El país es obligatorio.' })
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El país debe tener entre 5 y 50 caracteres.' })
  pais: string;

  @IsNotEmpty({ message: 'El ID del usuario es obligatorio.' })
  idUsuario: number;
}
