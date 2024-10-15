import { IsString, IsOptional, Length, IsPhoneNumber } from 'class-validator';

export class CreateTelefonoDto {
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @IsPhoneNumber('MX', {
    message: 'Debe ser un número de teléfono válido en México.',
  })
  numero: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  tipo?: string;
}
