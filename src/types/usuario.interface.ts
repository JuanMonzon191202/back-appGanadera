export interface User {
  idUsuario: number;
  email: string;
  sub: number;
  // Incluye todas las propiedades que deseas que estén disponibles en req.user
}
