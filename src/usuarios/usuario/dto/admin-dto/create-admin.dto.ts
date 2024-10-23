import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserAdminDto {
  @ApiProperty({
    description: 'Nombre del administrador',
    example: 'Juan Pérez',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico válido',
    example: 'admin@example.com',
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    description:
      'Contraseña para el administrador, con un mínimo de 6 caracteres',
    example: 'password123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiPropertyOptional({
    description: 'Rol del usuario, puede ser ADMIN o USER',
    example: UserRole.ADMIN,
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Rol inválido' })
  role?: UserRole; // Opcional, por defecto será USER

  @ApiPropertyOptional({
    description: 'Estado del usuario, por defecto es activo (true)',
    example: true,
  })
  @IsOptional()
  isActive?: boolean; // Opcional, por defecto será true
}
