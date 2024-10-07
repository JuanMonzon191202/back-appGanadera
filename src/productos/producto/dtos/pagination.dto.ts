import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1; // Valor por defecto es la primera página

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10; // Valor por defecto es 10 registros por página
}
