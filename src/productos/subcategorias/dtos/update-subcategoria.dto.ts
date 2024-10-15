/* eslint-disable @typescript-eslint/no-unused-vars */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcategoriaDto } from './create-subcategoria.dto';

export class UpdateSubcategoriaDto extends PartialType(CreateSubcategoriaDto) {}
