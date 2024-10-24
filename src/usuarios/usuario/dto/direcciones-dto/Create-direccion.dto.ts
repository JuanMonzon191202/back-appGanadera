import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDireccionDto {
  @ApiProperty({
    description: 'Calle donde se ubica la dirección.',
    example: 'Avenida Siempre Viva',
    minLength: 5,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'La calle es obligatoria.' })
  @IsString({ message: 'La calle debe ser una cadena de texto.' })
  @Length(5, 100, { message: 'La calle debe tener entre 5 y 100 caracteres.' })
  calle: string;

  @ApiProperty({
    description: 'Ciudad donde se encuentra la dirección.',
    example: 'Springfield',
    minLength: 5,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'La ciudad debe tener entre 5 y 50 caracteres.' })
  ciudad: string;

  @ApiProperty({
    description: 'Estado o provincia donde se encuentra la dirección.',
    example: 'Illinois',
    minLength: 5,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  @IsString({ message: 'El estado debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El estado debe tener entre 5 y 50 caracteres.' })
  estado: string;

  @ApiProperty({
    description: 'Código postal de la dirección.',
    example: '62704',
    minLength: 5,
    maxLength: 10,
  })
  @IsNotEmpty({ message: 'El código postal es obligatorio.' })
  @IsString({ message: 'El código postal debe ser una cadena de texto.' })
  @Length(5, 10, {
    message: 'El código postal debe tener entre 5 y 10 caracteres.',
  })
  codigoPostal: string;

  @ApiProperty({
    description: 'País donde se encuentra la dirección.',
    example: 'Estados Unidos',
    minLength: 5,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El país es obligatorio.' })
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @Length(5, 50, { message: 'El país debe tener entre 5 y 50 caracteres.' })
  pais: string;
}
