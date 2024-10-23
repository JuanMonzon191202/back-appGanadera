import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateDireccionDto {
  @IsOptional()
  @IsString({ message: 'La calle debe ser una cadena de texto.' })
  @Length(5, 100, { message: 'La calle debe tener entre 5 y 100 caracteres.' })
  calle?: string;

  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'La ciudad debe tener entre 5 y 50 caracteres.' })
  ciudad?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El estado debe tener entre 5 y 50 caracteres.' })
  estado?: string;

  @IsOptional()
  @IsString({ message: 'El código postal debe ser una cadena de texto.' })
  @Length(5, 10, {
    message: 'El código postal debe tener entre 5 y 10 caracteres.',
  })
  codigoPostal?: string;

  @IsOptional()
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El país debe tener entre 5 y 50 caracteres.' })
  pais?: string;
}
