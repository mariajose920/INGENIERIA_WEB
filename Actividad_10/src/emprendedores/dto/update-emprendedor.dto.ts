// Importa la función PartialType desde NestJS Swagger para transformar todos los campos de un molde en datos opcionales
import { PartialType } from '@nestjs/swagger'
// Importa la plantilla de datos CreateEmprendedorDto con la estructura original que se usa para crear un emprendedor
import { CreateEmprendedorDto } from './create-emprendedor.dto'

// Declara y exporta la clase UpdateEmprendedorDto que hereda todas las propiedades de creación, permitiendo actualizar solo los campos deseados
export class UpdateEmprendedorDto extends PartialType(CreateEmprendedorDto) {}
