import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nombreCompleto?: string;

  @IsOptional()
  @IsString()
  nombreEmpresa?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  infoEmpresa?: string;

  @IsOptional()
  @IsBoolean()
  verificado?: boolean;

  @IsOptional()
  @IsString()
  fotoPerfil?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
