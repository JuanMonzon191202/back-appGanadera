import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateUserAdminDto } from '../dto/admin-dto/create-admin.dto';
import { UpdateUserAdminDto } from '../dto/admin-dto/update-user-admin.dto';
import * as bcrypt from 'bcrypt';
import { UserAdmin, UserRole } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo usuario (ADMIN o USER)
  async create(createUserAdminDto: CreateUserAdminDto): Promise<UserAdmin> {
    const { nombre, email, password, role, isActive } = createUserAdminDto;

    // Verificar si el email ya existe
    const existingUser = await this.prisma.userAdmin.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    return this.prisma.userAdmin.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        role: role || UserRole.USER,
        isActive: isActive ?? true,
      },
    });
  }

  // Obtener todos los usuarios (sin contraseña)
  async findAll(): Promise<Omit<UserAdmin, 'password'>[]> {
    return this.prisma.userAdmin.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        isActive: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Obtener un usuario por ID
  async findOne(id: number): Promise<UserAdmin> {
    const user = await this.prisma.userAdmin.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Obtener un usuario por email
  async findByEmail(email: string): Promise<UserAdmin | undefined> {
    return this.prisma.userAdmin.findUnique({ where: { email } });
  }

  // Actualizar un usuario
  async update(
    id: number,
    updateUserAdminDto: UpdateUserAdminDto,
  ): Promise<UserAdmin> {
    // Si se actualiza el email, verificar que no esté duplicado
    if (updateUserAdminDto.email) {
      const existingUser = await this.prisma.userAdmin.findUnique({
        where: { email: updateUserAdminDto.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    // Si se actualiza la contraseña, encriptarla
    if (updateUserAdminDto.password) {
      updateUserAdminDto.password = await bcrypt.hash(
        updateUserAdminDto.password,
        10,
      );
    }

    return this.prisma.userAdmin.update({
      where: { id },
      data: updateUserAdminDto,
    });
  }

  // Eliminar un usuario
  async remove(id: number): Promise<UserAdmin> {
    const user = await this.prisma.userAdmin.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.prisma.userAdmin.delete({ where: { id } });
  }

  // Obtener usuario por email (sin contraseña)
  async findByEmailAdmin(email: string) {
    return this.prisma.userAdmin.findUnique({
      where: { email },
    });
  }
}
