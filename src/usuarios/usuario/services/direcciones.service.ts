import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateDireccionDto } from '../dto/direcciones-dto/Create-direccion.dto';
import { UpdateDireccionDto } from '../dto/direcciones-dto/Update-direccion.dto';

@Injectable()
export class DireccionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(idUsuario: number, createDireccionDto: CreateDireccionDto) {
    return this.prisma.direccion.create({
      data: {
        idUsuario: idUsuario,
        calle: createDireccionDto.calle,
        ciudad: createDireccionDto.ciudad,
        codigoPostal: createDireccionDto.codigoPostal,
        estado: createDireccionDto.estado,
        pais: createDireccionDto.pais,
      },
    });
  }

  async findAllByUserId(idUsuario: number) {
    return this.prisma.direccion.findMany({
      where: {
        idUsuario: idUsuario,
      },
    });
  }

  async updateDireccion(
    idDireccion: number,
    userIdFromToken: number,
    updateDireccionDto: UpdateDireccionDto,
    tkrole: string,
  ) {
    // si el usuario tiene el rol de admin puede actualiar
    if (tkrole === 'ADMIN') {
      const direccionAdminActualizado = await this.prisma.direccion.update({
        where: { idDireccion },
        data: updateDireccionDto,
      });
      return {
        message: 'Teléfono actualizado por admin',
        direccionAdminActualizado,
      };
    }
    // si no es admin se valida que la direccion pertenezca al usuario
    const direccionActualizado = await this.prisma.direccion.updateMany({
      where: {
        idDireccion: idDireccion,
        idUsuario: userIdFromToken,
      },
      data: updateDireccionDto,
    });

    if (direccionActualizado.count === 0) {
      throw new UnauthorizedException(
        'No tienes permiso para modificar este teléfono o no se encontró.',
      );
    }
    return {
      message: 'Tu Dirección se actualizó correctamente',
      direccionActualizado,
    };
  }

  async remove(idDireccion: number) {
    return this.prisma.direccion.delete({ where: { idDireccion } });
  }
}
