/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateTelefonoDto } from '../dto/telefonos-dto/Create-telefono.dto';
import { UpdateTelefonoDto } from '../dto/telefonos-dto/Update-telefono.dto';

@Injectable()
export class TelefonosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(idUsuario: number, createTelefonoDto: CreateTelefonoDto) {
    return this.prisma.telefono.create({
      data: {
        numero: createTelefonoDto.numero,
        tipo: createTelefonoDto.tipo,
        idUsuario: idUsuario,
      },
    });
  }

  async findAllByUserId(idUsuario: number) {
    return this.prisma.telefono.findMany({
      where: {
        idUsuario: idUsuario,
      },
    });
  }

  async updateTelefono(
    idTelefono: number,
    userIdFromToken: number,
    updateTelefonoDto: UpdateTelefonoDto,
    tkrole: string, // El rol del usuario desde el token
  ) {
    // Si el usuario tiene el rol de "admin", puede actualizar cualquier teléfono
    if (tkrole === 'ADMIN') {
      const telefonoAdminActualizado = await this.prisma.telefono.update({
        where: { idTelefono },
        data: updateTelefonoDto,
      });

      return {
        message: 'Teléfono actualizado por admin',
        telefonoAdminActualizado,
      };
    }

    // Si no es admin, se valida que el teléfono pertenezca al usuario
    const telefonoActualizado = await this.prisma.telefono.updateMany({
      where: {
        idTelefono: idTelefono,
        idUsuario: userIdFromToken,
      },
      data: updateTelefonoDto,
    });

    if (telefonoActualizado.count === 0) {
      throw new UnauthorizedException(
        'No tienes permiso para modificar este teléfono o no se encontró.',
      );
    }

    return {
      message: 'Tu teléfono se actualizó correctamente',
      telefonoActualizado,
    };
  }

  async remove(idTelefono: number) {
    return this.prisma.telefono.delete({ where: { idTelefono } });
  }
}
