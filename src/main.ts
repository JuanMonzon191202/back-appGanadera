import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura el directorio estático para servir archivos de subida
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'));

  app.setGlobalPrefix('api'); // Opcional: configura un prefijo global para las rutas

  await app.listen(3000);
}
bootstrap();
