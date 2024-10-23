/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  UnauthorizedException,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/usuarios-dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/usuarios-dto/update-usuario.dto';

import { User } from '../../../types/usuario.interface';
import { PaginationDto } from '../dto/paginacion-dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer'; // Elimina la importación de `File`
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../dto/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Express } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Usuario } from '@prisma/client';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('fotoPerfil', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!RegExp(/\/(jpg|jpeg|png|gif)$/).exec(file.mimetype)) {
          return cb(
            new BadRequestException('Solo se permiten archivos de imagen'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @UploadedFile() file: Express.Multer.File, // Cambia a `Express.Multer.File`
  ): Promise<Usuario> {
    // Define el tipo de retorno si es posible
    const fotoPerfil = file ? file.path : null;

    const usuarioData = {
      ...createUsuarioDto,
      fotoPerfil,
    };

    return this.usuarioService.create(usuarioData);
  }

  @Get()
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAll(@Query() paginationDto: PaginationDto) {
    const { usuarios, total, totalPages, currentPage } =
      await this.usuarioService.findAll(paginationDto);
    if (currentPage > totalPages) {
      return {
        usuarios: [],
        total: 0,
        totalPages,
        currentPage,
        message: 'Página fuera de rango',
      };
    }

    return {
      usuarios,
      total,
      totalPages,
      currentPage,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findOne(+id);
  }

  @Get('micuenta/me')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.USER)
  async findMe(@Req() req: Request & { user?: User }) {
    const userId = req.user?.idUsuario;
    if (!userId) {
      throw new UnauthorizedException(
        'No se puede encontrar el ID del usuario',
      );
    }
    const usuario = await this.usuarioService.findMepls(Number(userId));
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return usuario;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!RegExp(/\/(jpg|jpeg|png|gif)$/).exec(file.mimetype)) {
          return cb(
            new BadRequestException('Solo se permiten archivos de imagen'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @UploadedFile() file: Express.Multer.File, // Cambia a `Express.Multer.File`
    @Req() req: Request & { user?: User },
  ) {
    const usuarioAutenticadoId = req.user?.sub;
    if (usuarioAutenticadoId !== +id) {
      throw new UnauthorizedException(
        'No tienes permiso para actualizar este usuario',
      );
    }

    const existingUser = await this.usuarioService.findOne(id);
    if (existingUser.fotoPerfil && file) {
      try {
        unlinkSync(existingUser.fotoPerfil);
      } catch (error) {
        console.error('Error al eliminar la foto antigua:', error);
      }
    }

    const updatedData: UpdateUsuarioDto = {
      ...updateUsuarioDto,
      fotoPerfil: file ? file.path : existingUser.fotoPerfil,
    };

    return this.usuarioService.update(id, updatedData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(+id);
  }
}
