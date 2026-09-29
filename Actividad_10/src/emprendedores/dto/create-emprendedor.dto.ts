// Importa el decorador ApiProperty desde @nestjs/swagger para exponer y documentar propiedades en OpenAPI/Swagger
import { ApiProperty } from '@nestjs/swagger'
// Importa los decoradores de validación de class-validator para asegurar la integridad de los datos recibidos
import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator'

// Define una lista inmutable (tupla de solo lectura) con los nombres de los rubros válidos para los emprendedores
export const RUBROS = ['Apicultura','Lácteos','Textiles','Turismo','Artesanía','Agricultura'] as const
// Define un tipo TypeScript basado en los elementos del arreglo RUBROS para restringir el valor a uno de ellos
export type Rubro = typeof RUBROS[number]

// Declara y exporta la clase CreateEmprendedorDto utilizada como Data Transfer Object (DTO) para la creación de emprendedores
export class CreateEmprendedorDto {
  // Documenta el campo 'nombre' en Swagger indicando que forma parte del esquema del DTO
  @ApiProperty()
  // Valida que el valor sea una cadena de texto y que su longitud sea de al menos 3 caracteres
  @IsString() @MinLength(3)
  // Declara la propiedad 'nombre' de tipo string que almacena el nombre del emprendedor
  nombre: string

  // Documenta el campo 'comuna' en Swagger incluyendo un valor de ejemplo ('Chillán')
  @ApiProperty({ example: 'Chillán' })
  // Valida que el valor sea una cadena de texto y que no esté vacía ni contenga solo espacios
  @IsString() @IsNotEmpty()
  // Declara la propiedad 'comuna' de tipo string que almacena la comuna donde opera el emprendedor
  comuna: string

  // Documenta el campo 'rubro' en Swagger indicando que su valor debe pertenecer a la lista RUBROS
  @ApiProperty({ enum: RUBROS })
  // Valida que el valor ingresado esté estrictamente contenido en el arreglo RUBROS
  @IsIn(RUBROS as unknown as string[])
  // Declara la propiedad 'rubro' con el tipo específico Rubro para garantizar consistencia tipada
  rubro: Rubro

  // Documenta el campo 'descripcion' en Swagger para la especificación de la API
  @ApiProperty()
  // Valida que el valor sea una cadena de texto y que tenga una longitud mínima de 10 caracteres
  @IsString() @MinLength(10)
  // Declara la propiedad 'descripcion' de tipo string para detallar la actividad comercial del emprendedor
  descripcion: string

  // Documenta el campo 'contacto' en Swagger proporcionando un ejemplo del formato esperado (correo o teléfono)
  @ApiProperty({ example: 'correo@dominio.cl o +56 9 1234 5678' })
  // Valida que el valor sea una cadena de texto y que no esté vacío
  @IsString() @IsNotEmpty()
  // Declara la propiedad 'contacto' de tipo string para almacenar la información de contacto del emprendedor
  contacto: string
// Cierre del cuerpo de la clase CreateEmprendedorDto
}
