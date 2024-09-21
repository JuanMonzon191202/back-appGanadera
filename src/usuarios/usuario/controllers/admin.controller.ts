import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { CreateUserAdminDto } from '../dto/admin-dto/create-admin.dto';
import { UpdateUserAdminDto } from '../dto/admin-dto/update-user-admin.dto';
import { LoginAdminDto } from '../dto/admin-dto/login-admin.dto';
import { AuthGuard } from '@nestjs/passport';

import { UserRole } from '../../usuario/dto/enums/user-role.enum';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { AuthService } from '../../../auth/services/auth.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  // Endpoint para crear un nuevo administrador (solo ADMIN)
  @Post('create')
  @UseGuards(AuthGuard('jwt-admin'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserAdminDto: CreateUserAdminDto) {
    return this.adminService.create(createUserAdminDto);
  }

  // Endpoint para actualizar un administrador existente (solo ADMIN)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt-admin'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ) {
    return this.adminService.update(id, updateUserAdminDto);
  }

  // Endpoint para que un administrador inicie sesión (PÚBLICO)
  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    const admin = await this.adminService.findByEmail(loginAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await this.authService.validateAdmin(
      loginAdminDto.email,
      loginAdminDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.logAdmin(admin);
  }
  // Endpoint para obtener todos los administradores (solo ADMIN)
  @Get()
  @UseGuards(AuthGuard('jwt-admin'), RolesGuard) // Usa 'jwt-admin'
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.adminService.findAll();
  }
}
