import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateUsuarioDto } from '../dto/usuarios-dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/usuarios-dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '../dto/paginacion-dto/pagination.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UsuarioTipo } from '../dto/enums/usuario.enum';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    tipoUsuario: string;
    email: string;
    password: string;
    nombreCompleto: string;
    nombreEmpresa?: string;
    telefono: string;
    direccion: string;
    infoEmpresa?: string;
    verificado?: boolean;
    fotoPerfil?: string;
    isActive?: boolean;
  }) {
    try {
      // Encripta la contraseña
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Crea el usuario en la base de datos
      return await this.prisma.usuario.create({
        data: {
          tipoUsuario: data.tipoUsuario as UsuarioTipo,
          email: data.email,
          password: hashedPassword,
          nombreCompleto: data.nombreCompleto,
          nombreEmpresa: data.nombreEmpresa,
          telefono: data.telefono,
          direccion: data.direccion,
          infoEmpresa: data.infoEmpresa,
          verificado: data.verificado ?? false,
          fotoPerfil: data.fotoPerfil,
          isActive: data.isActive ?? true,
        },
      });
    } catch (error) {
      // Manejo de errores para el caso de email duplicado
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Este correo ya está registrado.');
      }

      // Si es otro error, lo re-lanzamos
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const [usuarios, total] = await Promise.all([
      this.prisma.usuario.findMany({
        skip,
        take,
        select: {
          password: false,
          idUsuario: true,
          email: true,
          nombreCompleto: true,
          telefono: true,
          verificado: true,
          infoEmpresa: true,
          fotoPerfil: true,
          isActive: true,
          role: true,
        },
      }),
      this.prisma.usuario.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      usuarios,
      total,
      totalPages,
      currentPage: Number(page),
    };
  }

  async findOne(idUsuario: number) {
    return this.prisma.usuario.findUnique({
      where: {
        idUsuario: idUsuario,
      },
      select: {
        password: false,
        idUsuario: true,
        email: true,
        nombreCompleto: true,
        telefono: true,
        verificado: true,
        infoEmpresa: true,
        fotoPerfil: true,
        isActive: true,
        role: true,
      },
    });
  }

  async findMepls(idtoken: number) {
    return this.prisma.usuario.findUnique({
      where: {
        idUsuario: idtoken,
      },
      select: {
        password: false,
        idUsuario: true,
        email: true,
        nombreCompleto: true,
        telefono: true,
        verificado: true,
        infoEmpresa: true,
        fotoPerfil: true,
        isActive: true,
        role: true,
        telefonos: {
          // Teléfonos adicionales
          select: {
            idTelefono: true,
            numero: true,
            tipo: true,
          },
        },
      },
    });
  }

  async update(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }

    return this.prisma.usuario.update({
      where: { idUsuario },
      data: updateUsuarioDto,
    });
  }

  remove(idUsuario: number) {
    return this.prisma.usuario.delete({ where: { idUsuario } });
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new Error('El email no puede estar vacío');
    }

    return this.prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findByEmailAdmin(email: string) {
    if (!email) {
      throw new Error('El email no puede estar vacío');
    }

    return this.prisma.userAdmin.findUnique({
      where: { email },
    });
  }
}
