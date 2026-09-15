// Importa el decorador Injectable desde el paquete central de NestJS para permitir la inyección de dependencias
import { Injectable } from '@nestjs/common';

// Marca esta clase como un proveedor de servicios que puede ser inyectado y reutilizado en otros componentes
@Injectable()
// Declara y exporta la clase AppService que contendrá la lógica básica de la aplicación
export class AppService {
  // Define un método llamado getHello que no recibe parámetros y retorna un texto
  getHello(): string {
    // Retorna el mensaje de texto de saludo 'Hello World!'
    return 'Hello World!';
  // Cierre del método getHello
  }
// Cierre del bloque de la clase AppService
}
