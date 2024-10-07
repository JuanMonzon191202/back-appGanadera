import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  @MaxLength(100, {
    message: 'El nombre completo no puede tener más de 100 caracteres.',
  })
  @MinLength(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres.',
  })
  nombreCompleto?: string;

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

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsPhoneNumber('MX', {
    message: 'Debe ser un número de teléfono válido en México.',
  })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(150, {
    message: 'La dirección no puede tener más de 150 caracteres.',
  })
  direccion?: string;

  @IsOptional()
  @IsString({
    message: 'La información de la empresa debe ser una cadena de texto.',
  })
  @MaxLength(500, {
    message:
      'La información de la empresa no puede tener más de 500 caracteres.',
  })
  infoEmpresa?: string;

  @IsOptional()
  @IsString({
    message: 'La URL de la foto de perfil debe ser una cadena de texto.',
  })
  @IsUrl({}, { message: 'Debe ser una URL válida para la foto de perfil.' })
  fotoPerfil?: string;
}
