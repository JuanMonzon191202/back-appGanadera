import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDireccionDto } from './create-direccion.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDireccionArrayDto {
  @ApiProperty({ type: [CreateDireccionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDireccionDto)
  direcciones: CreateDireccionDto[];
}
