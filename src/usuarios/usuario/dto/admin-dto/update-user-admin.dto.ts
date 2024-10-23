import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAdminDto {
  @ApiProperty({
    required: false,
    description: 'Nombre del usuario.',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre?: string;

  @ApiProperty({
    required: false,
    description: 'Correo electrónico del usuario.',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @ApiProperty({
    required: false,
    description:
      'Nueva contraseña del usuario. Debe tener al menos 6 caracteres.',
    minLength: 6,
  })
  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @ApiProperty({
    required: false,
    description: 'Rol del usuario. Debe ser uno de los roles definidos.',
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Rol inválido' })
  role?: UserRole;

  @ApiProperty({
    required: false,
    description: 'Estado de activación del usuario.',
    default: true,
  })
  @IsOptional()
  isActive?: boolean;
}
