import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({
    required: false,
    description: 'El nombre completo del usuario.',
    maxLength: 100,
    minLength: 3,
  })
  @IsOptional()
  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  @MaxLength(100, {
    message: 'El nombre completo no puede tener más de 100 caracteres.',
  })
  @MinLength(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres.',
  })
  nombreCompleto?: string;

  @ApiProperty({
    required: false,
    description: 'El nombre de la empresa del usuario.',
    maxLength: 100,
    minLength: 3,
  })
  @IsOptional()
  @IsString({
    message: 'El nombre de la empresa debe ser una cadena de texto.',
  })
  @MaxLength(100, {
    message: 'El nombre de la empresa no puede tener más de 100 caracteres.',
  })
  @MinLength(3, {
    message: 'El nombre de la empresa debe tener al menos 3 caracteres.',
  })
  nombreEmpresa?: string;

  @ApiProperty({
    required: false,
    description: 'El número de teléfono del usuario.',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsPhoneNumber('MX', {
    message: 'Debe ser un número de teléfono válido en México.',
  })
  telefono?: string;

  @ApiProperty({
    required: false,
    description: 'La dirección del usuario.',
    maxLength: 150,
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(150, {
    message: 'La dirección no puede tener más de 150 caracteres.',
  })
  direccion?: string;

  @ApiProperty({
    required: false,
    description: 'Información adicional sobre la empresa del usuario.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'La información de la empresa debe ser una cadena de texto.',
  })
  @MaxLength(500, {
    message:
      'La información de la empresa no puede tener más de 500 caracteres.',
  })
  infoEmpresa?: string;

  @ApiProperty({
    required: false,
    description: 'URL de la foto de perfil del usuario.',
  })
  @IsOptional()
  @IsString({
    message: 'La URL de la foto de perfil debe ser una cadena de texto.',
  })
  @IsUrl({}, { message: 'Debe ser una URL válida para la foto de perfil.' })
  fotoPerfil?: string;
}
