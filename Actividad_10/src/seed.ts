// Importa la herramienta NestFactory de NestJS para inicializar la aplicación en segundo plano
import { NestFactory } from '@nestjs/core'
// Importa el módulo principal AppModule que contiene todas las configuraciones del sistema
import { AppModule } from './app.module'
// Importa la herramienta DataSource que gestiona la conexión con la base de datos
import { DataSource } from 'typeorm'
// Importa el molde o modelo Emprendedor que define cómo se guardan los datos en la tabla
import { Emprendedor } from './emprendedores/entities/emprendedor.entity'

// Define una función principal que se encargará de cargar los datos de prueba iniciales en el sistema
async function bootstrap() {
  // Enciende la aplicación en segundo plano sin levantar un servidor web, usando la configuración principal
  const app = await NestFactory.createApplicationContext(AppModule)
  // Obtiene la conexión activa con la base de datos para poder realizar operaciones en ella
  const ds = app.get(DataSource)
  // Obtiene el administrador (repositorio) encargado de guardar y consultar los registros de emprendedores
  const repo = ds.getRepository(Emprendedor)

  // Crea una lista con datos de prueba de diferentes emprendimientos locales
  const base = [
    // Datos del primer emprendimiento de artesanías en Chillán con su información de contacto
    { nombre: 'Catedral Gifts', comuna: 'Chillán', rubro: 'Artesanía', descripcion: 'Souvenirs inspirados en la catedral.', contacto: 'catedral@negocio.cl' },
    // Datos del segundo emprendimiento de apicultura en Pinto con su número telefónico
    { nombre: 'Miel Las Trancas', comuna: 'Pinto', rubro: 'Apicultura', descripcion: 'Miel de montaña 100% natural.', contacto: '+56 9 1234 5678' },
    // Datos del tercer emprendimiento de lácteos artesanales en San Carlos con su correo
    { nombre: 'Quesos San Carlos', comuna: 'San Carlos', rubro: 'Lácteos', descripcion: 'Quesos artesanales madurados.', contacto: 'ventas@quesossancarlos.cl' }
    // Cierra la lista que agrupa a los emprendedores de ejemplo
  ]

  // Guarda y almacena en la base de datos todos los emprendedores definidos en la lista anterior
  await repo.save(base)
  // Muestra un mensaje en la consola avisando al usuario que los datos fueron insertados con éxito
  console.log('Datos de ejemplo insertados')
  // Cierra de forma ordenada la aplicación y finaliza las conexiones abiertas
  await app.close()
// Cierra el bloque de código de la función bootstrap
}
// Llama y ejecuta la función bootstrap para iniciar todo el proceso de carga de datos
bootstrap()
