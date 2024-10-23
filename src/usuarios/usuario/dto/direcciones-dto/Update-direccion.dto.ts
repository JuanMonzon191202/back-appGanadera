import { IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDireccionDto {
  @ApiProperty({
    required: false,
    description: 'Nombre de la calle.',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'La calle debe ser una cadena de texto.' })
  @Length(5, 100, { message: 'La calle debe tener entre 5 y 100 caracteres.' })
  calle?: string;

  @ApiProperty({
    required: false,
    description: 'Nombre de la ciudad.',
    minLength: 5,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'La ciudad debe tener entre 5 y 50 caracteres.' })
  ciudad?: string;

  @ApiProperty({
    required: false,
    description: 'Nombre del estado.',
    minLength: 5,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El estado debe tener entre 5 y 50 caracteres.' })
  estado?: string;

  @ApiProperty({
    required: false,
    description: 'Código postal de la dirección.',
    minLength: 5,
    maxLength: 10,
  })
  @IsOptional()
  @IsString({ message: 'El código postal debe ser una cadena de texto.' })
  @Length(5, 10, {
    message: 'El código postal debe tener entre 5 y 10 caracteres.',
  })
  codigoPostal?: string;

  @ApiProperty({
    required: false,
    description: 'Nombre del país.',
    minLength: 5,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El país debe tener entre 5 y 50 caracteres.' })
  pais?: string;
}
