import { IsString, IsOptional, Length, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTelefonoDto {
  @ApiProperty({
    description: 'Número de teléfono del usuario en formato válido.',
  })
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsPhoneNumber('MX', {
    message: 'Debe ser un número de teléfono válido en México.',
  })
  numero: string;

  @ApiProperty({
    required: false,
    description: 'Tipo de número de teléfono (ej. móvil, casa, etc.).',
    maxLength: 50,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  tipo?: string;
}
