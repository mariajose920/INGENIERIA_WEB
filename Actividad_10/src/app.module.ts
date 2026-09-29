// Carga las variables de entorno desde el archivo .env hacia el objeto global process.env
import 'dotenv/config';
// Importa el decorador Module desde el paquete @nestjs/common para definir un módulo de NestJS
import { Module } from '@nestjs/common';
// Importa TypeOrmModule desde @nestjs/typeorm para integrar el ORM TypeORM con NestJS
import { TypeOrmModule } from '@nestjs/typeorm';
// Importa la entidad Emprendedor que modela la tabla de emprendedores en la base de datos
import { Emprendedor } from './emprendedores/entities/emprendedor.entity';
// Importa el módulo EmprendedoresModule que encapsula los controladores y servicios de emprendedores
import { EmprendedoresModule } from './emprendedores/emprendedores.module';

// Aplica el decorador @Module para configurar los metadatos y dependencias del módulo raíz
@Module({
  // Define el arreglo de módulos que se importan para poner sus componentes a disposición de este módulo
  imports: [
    // Configura e inicializa la conexión principal y global de TypeORM para la base de datos
    TypeOrmModule.forRoot({
      // Establece el motor de base de datos a utilizar, en este caso SQLite mediante el driver better-sqlite3
      type: 'better-sqlite3',
      // Define el nombre y la ruta del archivo local de la base de datos SQLite donde se persistirá la información
      database: 'data.db',
      // Registra las entidades que formarán parte de la base de datos para que TypeORM las administre
      entities: [Emprendedor],
      // Sincroniza automáticamente el esquema de las tablas con las entidades (solo para desarrollo, no para producción)
      synchronize: true // SOLO en desarrollo (no en producción)
    // Cierra el objeto de opciones de configuración de la conexión de TypeORM
    }),
    // Agrega el módulo de Emprendedores a la lista de módulos importados para habilitar sus rutas y servicios
    EmprendedoresModule
  // Cierra el arreglo de módulos importados en la configuración
  ],
// Cierra el objeto de configuración proporcionado al decorador @Module
})
// Declara y exporta la clase AppModule que representa el módulo principal de la aplicación NestJS
export class AppModule {}
