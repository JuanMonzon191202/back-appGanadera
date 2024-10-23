import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UsuarioTipo } from '../enums/usuario.enum'; // Ajusta la ruta al enum

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'El tipo de usuario, puede ser COMPRADOR, VENDEDOR o AMBOS.',
    example: 'COMPRADOR',
    enum: UsuarioTipo,
  })
  @IsEnum(UsuarioTipo, {
    message: 'El tipo de usuario debe ser COMPRADOR, VENDEDOR o AMBOS.',
  })
  @IsNotEmpty({ message: 'El tipo de usuario es obligatorio.' })
  tipoUsuario: UsuarioTipo;

  @ApiProperty({
    description: 'Correo electrónico válido.',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string;

  @ApiProperty({
    description: 'Contraseña con al menos 6 caracteres y un máximo de 20.',
    example: 'contraseña123',
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres.',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  password: string;

  @ApiProperty({
    description: 'Nombre completo del usuario.',
    example: 'Juan Pérez',
  })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  @MinLength(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres.',
  })
  @MaxLength(100, {
    message: 'El nombre completo no puede tener más de 100 caracteres.',
  })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  nombreCompleto: string;

  @ApiPropertyOptional({
    description: 'Nombre de la empresa (opcional).',
    example: 'Empresa S.A.',
  })
  @IsOptional()
  @IsString({
    message: 'El nombre de la empresa debe ser una cadena de texto.',
  })
  @MaxLength(100, {
    message: 'El nombre de la empresa no puede tener más de 100 caracteres.',
  })
  nombreEmpresa?: string;

  @ApiProperty({
    description: 'Número de teléfono válido en México.',
    example: '+5215512345678',
  })
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsPhoneNumber('MX', {
    message: 'Debe ser un número de teléfono válido en México.',
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  telefono: string;

  @ApiProperty({
    description: 'Dirección del usuario.',
    example: 'Calle Falsa 123, Ciudad, Estado',
  })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(150, {
    message: 'La dirección no puede tener más de 150 caracteres.',
  })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  direccion: string;

  @ApiPropertyOptional({
    description: 'Información adicional sobre la empresa (opcional).',
    example: 'Empresa dedicada a la venta de productos electrónicos.',
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
    description: 'Indica si el usuario está verificado.',
    example: false,
    default: false,
  })
  @IsBoolean({ message: 'El campo "verificado" debe ser un valor booleano.' })
  verificado?: boolean = false;

  @ApiPropertyOptional({
    description: 'Foto de perfil del usuario (opcional).',
    type: 'string',
    format: 'binary', // Indica que es un archivo binario
  })
  @IsOptional()
  fotoPerfil?: any; // Cambia el tipo según lo necesites

  @ApiProperty({
    description: 'Indica si el usuario está activo.',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'El campo "isActive" debe ser un valor booleano.' })
  isActive?: boolean = true;
}
