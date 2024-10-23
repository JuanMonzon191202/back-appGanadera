/* eslint-disable @typescript-eslint/no-unused-vars */
// src/productos/productos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';

// auth
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../usuarios/usuario/dto/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { PaginationDto } from './dtos/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@ApiBearerAuth()
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // Solo los usuarios con rol ADMIN pueden crear un producto
  @Post()
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  // Usuarios autenticados pueden ver los productos
  @Get()
  @UseGuards(AuthGuard('jwt-user'))
  async findAll(@Query() paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const { productos, total, totalPages, currentPage } =
      await this.productosService.findAll(paginationDto);
    if (currentPage > totalPages) {
      return {
        productos: [],
        total: 0,
        totalPages,
        currentPage,
        message: 'Página fuera de rango',
      };
    }
    return {
      productos,
      total,
      totalPages,
      currentPage,
    };
  }

  // Usuarios autenticados pueden ver un producto específico
  @Get(':id')
  @UseGuards(AuthGuard('jwt-user'))
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  // Solo los administradores pueden actualizar productos
  @Patch(':id')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  // Solo los administradores pueden eliminar productos
  @Delete(':id')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
  // Endpoint para obtener productos con filtros
  @Get('filtrar')
  @UseGuards(AuthGuard('jwt-user'))
  async filter(
    @Query('nombre') nombre: string,
    @Query('categoriaId') categoriaId: number,
    @Query() paginationDto: PaginationDto, // PaginationDto ya maneja los valores predeterminados
  ) {
    // Convertir categoriaId si existe y validar que sea un número
    const categoriaIdNumber = categoriaId ? Number(categoriaId) : undefined;

    if (categoriaId && isNaN(categoriaIdNumber)) {
      throw new BadRequestException('El ID de la categoría debe ser un número');
    }

    return this.productosService.filter(
      nombre,
      categoriaIdNumber,
      paginationDto,
    );
  }

  /*
  Filtrar por nombre: GET api/productos/filtrar?nombre=leche
  Filtrar por categoría: GET api/productos/filtrar?categoriaId=1
  Ambos filtros: GET api/productos/filtrar?nombre=leche&categoriaId=1
  Agregar paginación: GET api/productos/filtrar?nombre=leche&categoriaId=1&page=2&limit=5
  */
}
