/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

//import { PaginationDto } from '../dtos/pagination.dto';
import { CreateSubcategoriaDto } from './dtos/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dtos/update-subcategoria.dto';
import { SubcategoriaService } from './subcategoria.service';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../usuarios/usuario/dto/enums/user-role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Subcategoria')
@ApiBearerAuth()
@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriaService: SubcategoriaService) {}

  // Solo el admin puede crear una nueva subcategoria
  @Post()
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createSubcategoriaDto: CreateSubcategoriaDto) {
    return this.subcategoriaService.create(createSubcategoriaDto);
  }

  // Usuarios autenticados pueden ver las Subcategorias
  @Get()
  @UseGuards(AuthGuard('jwt-user'))
  async findAll() {
    return this.subcategoriaService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubcategoriaDto: UpdateSubcategoriaDto,
  ) {
    return this.subcategoriaService.update(id, updateSubcategoriaDto);
  }
}
