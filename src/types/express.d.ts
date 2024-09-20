import { JwtPayload } from '../auth/interfaces/jwt-payload.interface'; // O ajusta la ruta según corresponda
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: JwtPayload; // O el tipo que estés usando para el payload del token
  }
}
