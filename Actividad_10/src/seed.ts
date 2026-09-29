// Importa NestFactory del núcleo de NestJS para inicializar el contexto de la aplicación
import { NestFactory } from '@nestjs/core'
// Importa el módulo principal AppModule que contiene las configuraciones y dependencias del sistema
import { AppModule } from './app.module'
// Importa DataSource de TypeORM para gestionar la conexión y operaciones de base de datos
import { DataSource } from 'typeorm'
// Importa la entidad Emprendedor que modela la tabla correspondiente en la base de datos
import { Emprendedor } from './emprendedores/entities/emprendedor.entity'

// Función asíncrona principal encargada de ejecutar el sembrado (seeding) de datos
async function bootstrap() {
  // Crea el contexto de ejecución de NestJS a partir de AppModule sin iniciar un servidor HTTP
  const app = await NestFactory.createApplicationContext(AppModule)
  // Obtiene la instancia del DataSource de TypeORM desde el contenedor de inyección de dependencias
  const ds = app.get(DataSource)
  // Obtiene el repositorio correspondiente a la entidad Emprendedor para realizar operaciones de base de datos
  const repo = ds.getRepository(Emprendedor)

  // Define un arreglo con la lista de objetos de emprendedores que se usarán como datos de prueba iniciales
  const base = [
    // Define el primer registro de ejemplo con información de 'Catedral Gifts'
    { nombre: 'Catedral Gifts', comuna: 'Chillán', rubro: 'Artesanía', descripcion: 'Souvenirs inspirados en la catedral.', contacto: 'catedral@negocio.cl' },
    // Define el segundo registro de ejemplo con información de 'Miel Las Trancas'
    { nombre: 'Miel Las Trancas', comuna: 'Pinto', rubro: 'Apicultura', descripcion: 'Miel de montaña 100% natural.', contacto: '+56 9 1234 5678' },
    // Define el tercer registro de ejemplo con información de 'Quesos San Carlos'
    { nombre: 'Quesos San Carlos', comuna: 'San Carlos', rubro: 'Lácteos', descripcion: 'Quesos artesanales madurados.', contacto: 'ventas@quesossancarlos.cl' }
    // Cierra la definición del arreglo de datos iniciales
  ]

  // Inserta y persiste en la base de datos la lista de emprendedores definida
  await repo.save(base)
  // Muestra un mensaje en consola confirmando la inserción de los registros
  console.log('Datos de ejemplo insertados')
  // Cierra el contexto de la aplicación NestJS finalizando conexiones activas
  await app.close()
// Cierra el bloque de la función bootstrap
}
// Ejecuta la función bootstrap para iniciar el proceso de siembra de datos
bootstrap()
