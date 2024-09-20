import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  idTipoUsuario: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nombreCompleto: string;

  @IsOptional()
  @IsString()
  nombreEmpresa?: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  infoEmpresa?: string;

  @IsBoolean()
  verificado: boolean;

  @IsOptional()
  @IsString()
  fotoPerfil?: string;

  @IsBoolean()
  isActive: boolean;
}
