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
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { User } from '../../../types/usuario.interface';
import { PaginationDto } from '../dto/paginacion-dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { File } from 'multer'; // Importar el tipo File desde multer
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../dto/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../auth/guards/roles.guard';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt-user'), RolesGuard) // Usa el mismo guard para ambos
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAll(@Query() paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

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
    console.log(userId);

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
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
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
    @UploadedFile() file: File,
    @Req() req: Request & { user?: User },
  ) {
    const usuarioAutenticadoId = req.user?.sub;

    if (usuarioAutenticadoId !== +id) {
      throw new UnauthorizedException(
        'No tienes permiso para actualizar este usuario',
      );
    }

    // Obtén el usuario actual para eliminar la foto antigua si existe
    const existingUser = await this.usuarioService.findOne(id);

    if (existingUser.fotoPerfil && file) {
      // Elimina la foto antigua
      try {
        unlinkSync(existingUser.fotoPerfil); // Asegúrate de que `fotoPerfil` contenga la ruta correcta
      } catch (error) {
        // Maneja errores de eliminación si es necesario
        console.error('Error al eliminar la foto antigua:', error);
      }
    }

    // Actualiza el usuario con la nueva foto (si se proporciona) y otros datos
    const updatedData: UpdateUsuarioDto = {
      ...updateUsuarioDto,
      fotoPerfil: file ? file.path : existingUser.fotoPerfil,
    };

    return this.usuarioService.update(id, updatedData);
  }

  //debe llevar @UseGuards(AuthGuard('jwt-user'), RolesGuard)??
  @Post('upload')
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
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException('Solo se permiten archivos de imagen'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: File) {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }
    return {
      message: 'Archivo subido con éxito',
      filePath: file.path,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(+id);
  }

  /*
   controllers para los admins uwu
*/
}
