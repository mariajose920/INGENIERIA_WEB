// Importa las herramientas Controller y Get desde NestJS para definir controladores y rutas web
import { Controller, Get } from '@nestjs/common';
// Importa el servicio AppService que contiene la lógica interna de respuesta de la aplicación
import { AppService } from './app.service.js';

// Decorador que define esta clase como un controlador encargado de recibir solicitudes web
@Controller()
// Declara y exporta la clase principal del controlador para que pueda ser utilizada en el sistema
export class AppController {
  // Inyecta automáticamente el servicio AppService en el constructor para poder usar sus métodos
  constructor(private readonly appService: AppService) {}

  // Decorador que define una ruta HTTP GET en la dirección raíz de la aplicación
  @Get()
  // Método que procesa la petición y especifica que responderá con una cadena de texto (string)
  getHello(): string {
    // Llama al método getHello del servicio y retorna el mensaje obtenido como respuesta al usuario
    return this.appService.getHello();
  } // Fin del método getHello
} // Fin de la clase AppController
