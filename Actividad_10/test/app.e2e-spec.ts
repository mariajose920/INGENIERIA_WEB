// Importa utilidades de NestJS para crear y simular un entorno de pruebas controlado
import { Test, TestingModule } from '@nestjs/testing';
// Importa la definición o tipo de datos que representa a la aplicación completa en funcionamiento
import { INestApplication } from '@nestjs/common';
// Importa la librería Supertest para simular peticiones web reales como si vinieran de un navegador o usuario
import request from 'supertest';
// Importa el tipo de aplicación específico que necesita Supertest para realizar las pruebas de red
import { App } from 'supertest/types';
// Importa el módulo principal de la aplicación para poder cargarlo y probarlo de extremo a extremo
import { AppModule } from './../src/app.module.js';

// Agrupa un conjunto de pruebas de extremo a extremo (e2e) para verificar el funcionamiento del controlador principal
describe('AppController (e2e)', () => {
  // Declara una variable donde se guardará la instancia de la aplicación que se creará para las pruebas
  let app: INestApplication<App>;

  // Ejecuta este bloque de instrucciones automáticamente antes de cada una de las pruebas que se realicen
  beforeEach(async () => {
    // Crea un entorno de pruebas aislado esperando a que se configuren todos los módulos necesarios
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // Carga el módulo principal del sistema dentro del entorno de prueba para contar con todas sus funciones
      imports: [AppModule],
    // Compila y finaliza el ensamblaje de todas las partes del módulo de prueba
    }).compile();

    // Crea una instancia real de la aplicación web a partir del entorno de prueba configurado
    app = moduleFixture.createNestApplication();
    // Inicia y arranca la aplicación de prueba, esperando a que esté completamente lista para recibir solicitudes
    await app.init();
  // Cierra la función de preparación que se ejecuta antes de cada prueba
  });

  // Define una prueba específica para verificar qué responde el sistema al consultar la ruta principal '/' con el método GET
  it('/ (GET)', () => {
    // Envía una solicitud HTTP simulada al servidor de la aplicación que está corriendo en las pruebas
    return request(app.getHttpServer())
      // Realiza una petición de tipo GET (solicitud de lectura) hacia la dirección raíz '/'
      .get('/')
      // Comprueba y espera que el servidor responda con el código de estado 200 (que significa que todo salió con éxito)
      .expect(200)
      // Comprueba y espera que el contenido del mensaje recibido sea exactamente el texto "Hello World!"
      .expect('Hello World!');
  // Cierra la definición de esta prueba individual
  });

  // Ejecuta este bloque de instrucciones automáticamente después de que termina cada una de las pruebas
  afterEach(async () => {
    // Apaga y cierra la aplicación de forma segura para liberar recursos y conexiones de la computadora
    await app.close();
  // Cierra la función de limpieza que se ejecuta después de cada prueba
  });
// Cierra el grupo de pruebas de extremo a extremo
});
