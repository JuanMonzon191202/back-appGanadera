// src/auth/dto/login-admin.dto.ts

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginAdminDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
