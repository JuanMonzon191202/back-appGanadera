import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../usuarios/usuario/dto/enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Si no hay roles requeridos, permitir acceso
    if (!requiredRoles) {
      return true;
    }

    // Verificar si el usuario está presente
    if (!user) {
      throw new ForbiddenException('No se encontró el usuario en la solicitud');
    }

    // Permitir acceso si el usuario no tiene rol
    if (!user.rol) {
      return true; // Permitir acceso a quien no tenga rol
    }

    // Verificar si el rol del usuario es ADMIN o si está en los roles requeridos
    if (!requiredRoles.includes(user.rol) && user.rol !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso',
      );
    }

    return true;
  }
}
