// src/auth/jwt-auth.guard.ts

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   handleRequest(err, user) {
//     //console.log('Usuario autenticado en req:', user); // Verifica que el objeto user tiene los campos correctos
//     if (err || !user) {
//       throw err || new UnauthorizedException();
//     }
//     return user;
//   }
// }
