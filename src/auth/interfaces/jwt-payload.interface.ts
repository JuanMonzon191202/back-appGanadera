export interface JwtPayload {
  sub: number; // ID del usuario
  email: string; // Opcional: email del usuario
  // Puedes agregar otros campos si es necesario
}
