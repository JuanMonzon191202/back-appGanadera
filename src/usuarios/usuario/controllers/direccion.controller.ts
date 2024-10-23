import {
  Body,
  UseGuards,
  Get,
  Post,
  Patch,
  Req,
  Controller,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { DireccionesService } from '../services/direcciones.service';
import { CreateDireccionDto } from '../dto/direcciones-dto/Create-direccion.dto';
import { UpdateDireccionDto } from '../dto/direcciones-dto/Update-direccion.dto';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../dto/enums/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../types/usuario.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Direcciones')
@ApiBearerAuth()
@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly direccionService: DireccionesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt-user'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async create(
    @Req() req: Request & { user?: User },
    @Body() createDireccionDto: CreateDireccionDto,
  ) {
    const userId = req.user?.idUsuario;

    if (!userId) {
      throw new UnauthorizedException('No se puede encontrar el ID de usuario');
    }
    return this.direccionService.create(userId, createDireccionDto);
  }

  @Get('mis-direcciones')
  @UseGuards(AuthGuard('jwt-user'))
  async allDirecciones(@Req() req: Request & { user?: User }) {
    const userId = req.user?.idUsuario;

    if (!userId) {
      throw new UnauthorizedException(
        'No se puede encontrar el ID del usuario',
      );
    }

    const direcciones = await this.direccionService.findAllByUserId(
      Number(userId),
    );
    return direcciones;
  }

  @Patch()
  @UseGuards(AuthGuard('jwt-user'))
  async updateDireccion(
    @Param('id') idDireccion: number,
    @Body() updateDireccionDto: UpdateDireccionDto,
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
    return this.direccionService.updateDireccion(
      idDireccion,
      userIdFromToken,
      updateDireccionDto,
      tkrole,
    );
  }
}
