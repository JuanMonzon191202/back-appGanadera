import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber({}, { message: 'El ID del tipo de usuario debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del tipo de usuario es obligatorio.' })
  idTipoUsuario: number;

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres.',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  password: string;

  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  @MinLength(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres.',
  })
  @MaxLength(100, {
    message: 'El nombre completo no puede tener más de 100 caracteres.',
  })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  nombreCompleto: string;

  @IsOptional()
  @IsString({
    message: 'El nombre de la empresa debe ser una cadena de texto.',
  })
  @MaxLength(100, {
    message: 'El nombre de la empresa no puede tener más de 100 caracteres.',
  })
  nombreEmpresa?: string;

  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsPhoneNumber('MX', {
    message: 'Debe ser un número de teléfono válido en México.',
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  telefono: string;

  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(150, {
    message: 'La dirección no puede tener más de 150 caracteres.',
  })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  direccion: string;

  @IsOptional()
  @IsString({
    message: 'La información de la empresa debe ser una cadena de texto.',
  })
  @MaxLength(500, {
    message:
      'La información de la empresa no puede tener más de 500 caracteres.',
  })
  infoEmpresa?: string;

  @IsBoolean({ message: 'El campo "verificado" debe ser un valor booleano.' })
  @IsNotEmpty({ message: 'El campo "verificado" es obligatorio.' })
  verificado: boolean = false;

  @IsOptional()
  @IsString({
    message: 'La URL de la foto de perfil debe ser una cadena de texto.',
  })
  @IsUrl({}, { message: 'Debe ser una URL válida para la foto de perfil.' })
  fotoPerfil?: string;

  @IsBoolean({ message: 'El campo "isActive" debe ser un valor booleano.' })
  @IsNotEmpty({ message: 'El campo "isActive" es obligatorio.' })
  isActive: boolean = true;
}
