// Lee y carga el archivo de configuración (.env) donde se guardan contraseñas y ajustes ocultos del sistema
import 'dotenv/config';
// Trae la función 'Module' de NestJS, que sirve para crear cajas organizadoras (módulos) en la aplicación
import { Module } from '@nestjs/common';
// Trae la herramienta de TypeORM que permite conectar y comunicarse con la base de datos fácilmente
import { TypeOrmModule } from '@nestjs/typeorm';
// Trae la estructura o molde 'Emprendedor' que define qué datos (nombre, correo, etc.) tendrá cada emprendedor
import { Emprendedor } from './emprendedores/entities/emprendedor.entity';
// Trae el módulo de Emprendedores que agrupa todas las funciones y operaciones para gestionar emprendedores
import { EmprendedoresModule } from './emprendedores/emprendedores.module';

// Marca esta clase como el módulo principal o caja central que une todas las piezas de la aplicación
@Module({
  // Lista de otros módulos o herramientas que este módulo necesita para funcionar
  imports: [
    // Inicializa y prepara la conexión principal con la base de datos
    TypeOrmModule.forRoot({
      // Indica qué tipo de base de datos se usará; en este caso SQLite (una base de datos ligera guardada en un archivo)
      type: 'better-sqlite3',
      // Especifica el nombre del archivo en la computadora donde se guardarán todos los datos registrados ('data.db')
      database: 'data.db',
      // Registra qué tablas o moldes de información se deben crear y gestionar en la base de datos (aquí Emprendedor)
      entities: [Emprendedor],
      // Hace que la base de datos se adapte automáticamente al código cada vez que inicia (solo útil mientras se programa)
      synchronize: true, // Se activa solo en desarrollo para actualizar cambios rápido; en producción se desactiva por seguridad
    // Cierra las opciones de configuración de la conexión con la base de datos
    }),
    // Conecta el módulo de Emprendedores al sistema principal para que sus funciones y URLs estén disponibles
    EmprendedoresModule
  // Cierra la lista de módulos importados
  ],
// Cierra la configuración del módulo principal
})
// Declara y comparte hacia afuera la clase AppModule, que representa el corazón de toda la aplicación
export class AppModule {}
