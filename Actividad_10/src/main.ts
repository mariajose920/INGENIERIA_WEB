// Importa ValidationPipe desde el paquete '@nestjs/common' para realizar la validación y transformación de datos en las solicitudes
import { ValidationPipe } from '@nestjs/common';
// Importa NestFactory desde '@nestjs/core' para crear y gestionar la instancia de la aplicación NestJS
import { NestFactory } from '@nestjs/core';
// Importa DocumentBuilder y SwaggerModule desde '@nestjs/swagger' para configurar y generar la documentación Swagger de la API
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// Importa AppModule, el módulo raíz que organiza la estructura y dependencias de la aplicación
import { AppModule } from './app.module';

// Función asíncrona principal encargada de inicializar y arrancar la aplicación
async function bootstrap() {
  // Crea la instancia de la aplicación NestJS utilizando AppModule y habilita CORS para permitir peticiones desde otros orígenes
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // Configura un pipe de validación global para validar y transformar los datos de entrada en todos los endpoints
  app.useGlobalPipes(new ValidationPipe({
    // Elimina automáticamente cualquier propiedad recibida en la petición que no esté definida en el DTO
    whitelist: true,
    // Transforma automáticamente los datos entrantes a los tipos especificados en las clases DTO
    transform: true,
    // Lanza un error si el cliente envía propiedades no permitidas que no estén en la lista blanca
    forbidNonWhitelisted: true
  }));

  // Inicializa la configuración de OpenAPI/Swagger mediante DocumentBuilder
  const config = new DocumentBuilder()
    // Establece el título representativo de la API en la documentación Swagger
    .setTitle('API Emprendedores Ñuble')
    // Establece una descripción informativa sobre el propósito y compatibilidad de la API
    .setDescription('CRUD + búsqueda compatible con frontend Vue')
    // Asigna la versión de la API que se mostrará en Swagger
    .setVersion('1.0')
    // Construye y finaliza el objeto con toda la configuración definida para Swagger
    .build();
    
  // Genera el documento de especificación OpenAPI asociando la aplicación con la configuración creada
  const doc = SwaggerModule.createDocument(app, config);
  // Configura la interfaz interactiva de Swagger UI asociándola a la ruta '/api'
  SwaggerModule.setup('/api', app, doc);
  
  // Inicia el servidor HTTP escuchando las peticiones en el puerto 3000 de forma asíncrona
  await app.listen(3000);
  // Muestra un mensaje en la consola indicando la dirección URL local de la API
  console.log('API en http://localhost:3000');
  // Muestra un mensaje en la consola indicando la dirección URL donde consultar la documentación Swagger
  console.log('Swagger en http://localhost:3000/api');
}
// Invoca la función bootstrap para poner en marcha la ejecución del servidor
bootstrap();
