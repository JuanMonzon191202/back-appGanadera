/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateUsuarioDto } from '../dto/usuarios-dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/usuarios-dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '../dto/paginacion-dto/pagination.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    idTipoUsuario: number;
    email: string;
    password: string;
    nombreCompleto: string;
    nombreEmpresa?: string;
    telefono: string;
    direccion: string;
    infoEmpresa?: string;
    verificado: boolean;
    fotoPerfil?: string;
    isActive: boolean;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.usuario.create({
      data: {
        idTipoUsuario: data.idTipoUsuario,
        email: data.email,
        password: hashedPassword,
        nombreCompleto: data.nombreCompleto,
        nombreEmpresa: data.nombreEmpresa,
        telefono: data.telefono,
        direccion: data.direccion,
        infoEmpresa: data.infoEmpresa,
        verificado: data.verificado,
        fotoPerfil: data.fotoPerfil,
        isActive: data.isActive,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const [usuarios, total] = await Promise.all([
      this.prisma.usuario.findMany({
        skip,
        take,
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
    });
  }

  async findMepls(idtoken: number) {
    return this.prisma.usuario.findUnique({
      where: {
        idUsuario: idtoken,
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
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findByEmailAdmin(email: string) {
    return this.prisma.userAdmin.findUnique({
      where: { email },
    });
  }
}
