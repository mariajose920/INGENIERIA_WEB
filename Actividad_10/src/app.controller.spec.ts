// Importa utilidades del paquete de pruebas de NestJS para simular el entorno de la aplicación
import { Test, TestingModule } from '@nestjs/testing';
// Importa el controlador principal de la aplicación que se va a poner a prueba
import { AppController } from './app.controller.js';
// Importa el servicio principal que contiene la lógica de negocio que utiliza el controlador
import { AppService } from './app.service.js';

// Agrupa y define un bloque de pruebas unitarias enfocado en el controlador AppController
describe('AppController', () => {
  // Declara una variable para almacenar la instancia del controlador que se usará en las pruebas
  let appController: AppController;

  // Ejecuta una función de preparación de forma asíncrona antes de cada una de las pruebas individuales
  beforeEach(async () => {
    // Crea un módulo de prueba aislado esperando a que se configuren sus componentes
    const app: TestingModule = await Test.createTestingModule({
      // Registra el controlador AppController dentro del módulo de pruebas
      controllers: [AppController],
      // Registra el servicio AppService como proveedor de dependencias para el controlador
      providers: [AppService],
    // Compila y finaliza la creación del módulo de pruebas en memoria
    }).compile();

    // Obtiene del módulo de prueba la instancia ya creada y lista de AppController
    appController = app.get<AppController>(AppController);
  // Cierra el bloque de configuración beforeEach
  });

  // Agrupa las pruebas relacionadas con la ruta raíz o funcionalidad básica del controlador
  describe('root', () => {
    // Define un caso de prueba específico que verifica que retorne el saludo "Hello World!"
    it('should return "Hello World!"', () => {
      // Llama al método getHello del controlador y comprueba que el resultado sea exactamente "Hello World!"
      expect(appController.getHello()).toBe('Hello World!');
    // Cierra la definición del caso de prueba 'it'
    });
  // Cierra el grupo de pruebas de la ruta 'root'
  });
// Cierra el grupo principal de pruebas de 'AppController'
});
