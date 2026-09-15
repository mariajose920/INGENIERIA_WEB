// Importa la herramienta de validación (ValidationPipe) para comprobar que los datos que envían los usuarios sean válidos y seguros
import { ValidationPipe } from '@nestjs/common';
// Importa el motor de creación (NestFactory) para construir y poner en funcionamiento la aplicación NestJS
import { NestFactory } from '@nestjs/core';
// Importa las herramientas de Swagger para generar automáticamente un manual interactivo donde consultar y probar la API
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// Importa AppModule, que es el módulo central que organiza todas las partes y funciones de nuestra aplicación
import { AppModule } from './app.module';

// Define la función principal de inicio encargada de preparar y encender todo el sistema paso a paso
async function bootstrap() {
  // Crea la aplicación usando el módulo central y habilita los permisos CORS para permitir que la web frontend se conecte sin problemas
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // Activa un revisor de seguridad general en toda la aplicación para examinar cada dato que ingrese
  app.useGlobalPipes(new ValidationPipe({
    // Elimina de forma automática cualquier campo o dato desconocido que el usuario intente enviar
    whitelist: true,
    // Transforma automáticamente los datos entrantes a su tipo correcto (como convertir texto a número)
    transform: true,
    // Rechaza la petición y devuelve un mensaje de error si se envían datos que no están permitidos
    forbidNonWhitelisted: true
  // Cierra la configuración y opciones del filtro de validación
  }));

  // Comienza a preparar la configuración para el manual interactivo de la API con Swagger
  const config = new DocumentBuilder()
    // Asigna el título principal que se mostrará en el encabezado del manual interactivo
    .setTitle('API Emprendedores Ñuble')
    // Añade una breve descripción que explica que esta API permite crear, leer, actualizar, borrar y buscar datos para el frontend Vue
    .setDescription('CRUD + búsqueda compatible con frontend Vue')
    // Define el número de versión actual que tendrá la documentación de la API
    .setVersion('1.0')
    // Finaliza y construye el paquete con toda la configuración definida para el manual
    .build();
    
  // Genera el documento completo de la documentación uniendo la configuración creada con la aplicación
  const doc = SwaggerModule.createDocument(app, config);
  // Publica la página web del manual interactivo asociándola a la ruta '/api' para verla en el navegador
  SwaggerModule.setup('/api', app, doc);
  
  // Pone a funcionar el servidor esperando peticiones en el puerto 3000 de la computadora
  await app.listen(3000);
  // Imprime un mensaje en la terminal avisando que la API está lista y en qué enlace encontrarla
  console.log('API en http://localhost:3000');
  // Imprime un mensaje en la terminal indicando el enlace exacto para abrir y explorar el manual interactivo Swagger
  console.log('Swagger en http://localhost:3000/api');
// Cierra el bloque de instrucciones de la función principal de arranque
}
// Ejecuta la función bootstrap para poner en marcha el servidor inmediatamente
bootstrap();
