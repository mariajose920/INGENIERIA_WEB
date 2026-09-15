// Importa la función decoradora Module de NestJS para organizar y estructurar este módulo
import { Module } from '@nestjs/common'
// Importa el módulo de TypeORM para permitir la comunicación con la base de datos
import { TypeOrmModule } from '@nestjs/typeorm'
// Importa el controlador que recibe y atiende las solicitudes web relacionadas con emprendedores
import { EmprendedoresController } from './emprendedores.controller'
// Importa el servicio que contiene la lógica de negocio y las operaciones de los emprendedores
import { EmprendedoresService } from './emprendedores.service'
// Importa la entidad Emprendedor que representa la estructura de datos guardada en la base de datos
import { Emprendedor } from './entities/emprendedor.entity'

// Aplica el decorador @Module para configurar los componentes que forman este módulo
@Module({
  // Registra la tabla o entidad Emprendedor para que este módulo tenga acceso a su repositorio de datos
  imports: [TypeOrmModule.forFeature([Emprendedor])],
  // Especifica el controlador que escuchará y manejará las peticiones de los usuarios para este módulo
  controllers: [EmprendedoresController],
  // Registra el servicio que contiene los métodos y la lógica que se pueden inyectar y usar aquí
  providers: [EmprendedoresService],
// Cierra la configuración de metadatos del módulo
})
// Exporta la clase EmprendedoresModule para que pueda ser importada e integrada en el módulo principal
export class EmprendedoresModule {}
