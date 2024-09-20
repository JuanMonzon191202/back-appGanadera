import { User } from '../usuarios/usuario/usuario.interface'; // Asegúrate de importar correctamente tu interfaz de usuario

declare global {
  namespace Express {
    interface Request {
      user?: User; // Extiende la interfaz Request para incluir el campo user
    }
  }
}
