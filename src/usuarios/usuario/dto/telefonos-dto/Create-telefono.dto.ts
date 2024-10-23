import { IsString, IsOptional, Length, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTelefonoDto {
  @ApiProperty({
    description: 'Número de teléfono válido en México',
    example: '+5215512345678',
  })
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsPhoneNumber('MX', {
    message: 'Debe ser un número de teléfono válido en México.',
  })
  numero: string;

  @ApiPropertyOptional({
    description:
      'Tipo de teléfono, como "móvil" o "casa", con longitud de 3 a 50 caracteres',
    example: 'móvil',
  })
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: 'El tipo debe tener entre 3 y 50 caracteres.' })
  tipo?: string;
}
