import { Request } from 'express';

export interface CustomRequest extends Request {
  user: {
    sub: number; // El tipo de dato de 'sub' (puede ser string o number)
    email: string;
    // cualquier otra propiedad que incluya tu token JWT
  };
}
