// // src/auth/strategies/admin-jwt.strategy.ts

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
// import { AdminService } from '../../usuarios/usuario/services/admin.service'; // Ajusta la ruta según tu estructura
// import { JwtPayload } from '../interfaces/jwt-payload.interface';

// @Injectable()
// export class AdminJwtStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
//   constructor(
//     private configService: ConfigService,
//     private adminService: AdminService, // Servicio para manejar administradores
//   ) {
//     super({
//       jwtFromRequest: (req) => {
//         const authHeader = req.headers.authorization;
//         if (authHeader) {
//           return authHeader.split(' ')[1];
//         }
//         return null;
//       },
//       secretOrKey: configService.get<string>('JWT_SECRET_ADMIN'), // Usa una clave secreta específica para admins
//     });
//   }

//   async validate(payload: JwtPayload) {
//     console.log('Payload recibido strategy admin:', payload);
//     const admin = await this.adminService.findOne(payload.sub);
//     if (admin.role !== 'ADMIN') {
//       throw new UnauthorizedException('Administrador no encontrado');
//     }
//     // console.log('Administrador encontrado:', admin);
//     return { id: admin.id, email: admin.email, rol: admin.role };
//   }
// }
