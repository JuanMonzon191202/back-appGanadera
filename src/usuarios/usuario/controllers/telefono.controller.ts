/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Controller,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { TelefonosService } from '../services/telefono.service';
import { CreateTelefonoDto } from '../dto/telefonos-dto/Create-telefono.dto';
import { UpdateTelefonoDto } from '../dto/telefonos-dto/Update-telefono.dto';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../usuario/dto/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../types/usuario.interface';

@Controller('telefonos')
export class TelefonosController {
  constructor(private readonly telefonoService: TelefonosService) {}

  // @Post()
  // @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.USER)
  // async create(@Body() createTelefonoDto: CreateTelefonoDto) {
  //   return this.telefonoService.create(createTelefonoDto);
  // }
  @Post()
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async createa(
    @Req() req: Request & { user?: User },
    @Body() createTelefonoDto: CreateTelefonoDto,
  ) {
    const userId = req.user?.idUsuario;

    if (!userId) {
      throw new UnauthorizedException(
        'No se puede encontrar el ID del usuario',
      );
    }

    return this.telefonoService.create(userId, createTelefonoDto);
  }

  @Get('mis-telefonos')
  @UseGuards(AuthGuard('jwt-user'))
  async allTelefonos(@Req() req: Request & { user?: User }) {
    const userId = req.user?.idUsuario;

    if (!userId) {
      throw new UnauthorizedException(
        'No se puede encontrar el ID del usuario',
      );
    }

    const telefonos = await this.telefonoService.findAllByUserId(
      Number(userId),
    );

    return telefonos;
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt-user'))
  async updateTelefono(
    @Param('id') idTelefono: number,
    @Body() updateTelefonoDto: UpdateTelefonoDto,
    @Req()
    req: Request & { user?: { idUsuario: number }; role?: { role: string } },
  ) {
    const userIdFromToken = req.user?.idUsuario;
    const tkrole = req.role?.role;

    if (!userIdFromToken) {
      throw new UnauthorizedException(
        'No se puede obtener el ID del usuario autenticado.',
      );
    }

    return this.telefonoService.updateTelefono(
      idTelefono,
      userIdFromToken,
      updateTelefonoDto,
      tkrole,
    );
  }
}
