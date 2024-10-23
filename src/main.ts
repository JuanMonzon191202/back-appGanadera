import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura CORS para permitir el acceso desde el frontend
  app.enableCors({
    origin: 'http://localhost:8100', // Cambia esto si tu frontend está en otra URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies o autenticación
  });

  // Configura el directorio estático para servir archivos de subida
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'));

  app.setGlobalPrefix('api'); // Opcional: configura un prefijo global para las rutas

  // Configurar la validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si existen propiedades no permitidas
      transform: true, // Transforma automáticamente los datos a los tipos especificados en los DTOs
    }),
  );

  // Configuracion del swagger
  const config = new DocumentBuilder()
    .setTitle('API de Direcciones')
    .setDescription(
      'Documentación de la API para gestión de la api, Grimaldo se la come',
    )
    .setVersion('1.0')
    .addBearerAuth() // Agrega soporte para autenticación con JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Ruta donde estará la documentación de Swagger

  await app.listen(3000);
}
bootstrap();
