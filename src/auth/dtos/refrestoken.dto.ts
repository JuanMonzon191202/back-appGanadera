import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token de refresco para obtener un nuevo token de acceso.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'El token de refresco debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El token de refresco es obligatorio.' })
  refresh_token: string;
}
