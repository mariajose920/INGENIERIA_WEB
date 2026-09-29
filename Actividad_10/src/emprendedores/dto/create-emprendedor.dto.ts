// Trae la herramienta ApiProperty para documentar y mostrar este campo en el catálogo web interactivo de la API
import { ApiProperty } from '@nestjs/swagger'
// Trae reglas de validación para verificar automáticamente que los datos recibidos sean válidos (texto, no vacío, tamaño mínimo)
import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator'

// Lista con las categorías o rubros comerciales autorizados para registrar a un emprendedor
export const RUBROS = ['Apicultura','Lácteos','Textiles','Turismo','Artesanía','Agricultura'] as const
// Crea una regla de tipo que obliga a que el rubro coincida exactamente con alguna de las opciones de la lista anterior
export type Rubro = typeof RUBROS[number]

// Define la estructura o formulario de datos requeridos para poder registrar a un nuevo emprendedor
export class CreateEmprendedorDto {
  // Configura este campo en la documentación interactiva para que se muestre en el catálogo de la API
  @ApiProperty()
  // Comprueba que el dato recibido sea texto y que contenga como mínimo 3 caracteres
  @IsString() @MinLength(3)
  // Guarda el nombre del emprendedor o de su negocio como texto
  nombre: string

  // Agrega este campo a la documentación interactiva mostrando 'Chillán' como ejemplo sugerido
  @ApiProperty({ example: 'Chillán' })
  // Comprueba que el dato recibido sea texto y que no esté vacío
  @IsString() @IsNotEmpty()
  // Guarda la comuna o ciudad de residencia del emprendedor como texto
  comuna: string

  // Muestra en la documentación interactiva el menú de opciones permitidas basado en la lista de rubros
  @ApiProperty({ enum: RUBROS })
  // Comprueba estrictamente que la opción enviada pertenezca a la lista autorizada de rubros
  @IsIn(RUBROS as unknown as string[])
  // Guarda el rubro o sector productivo seleccionado por el emprendedor
  rubro: Rubro

  // Configura este campo en la documentación interactiva para que se muestre en el catálogo de la API
  @ApiProperty()
  // Comprueba que el dato recibido sea texto y que tenga una longitud mínima de 10 caracteres
  @IsString() @MinLength(10)
  // Guarda la descripción detallada sobre lo que hace el emprendimiento
  descripcion: string

  // Agrega este campo a la documentación interactiva mostrando un ejemplo de correo o teléfono
  @ApiProperty({ example: 'correo@dominio.cl o +56 9 1234 5678' })
  // Comprueba que el dato recibido sea texto y que no esté en blanco
  @IsString() @IsNotEmpty()
  // Guarda la información de contacto (correo electrónico o teléfono) como texto
  contacto: string
// Cierre del bloque que define el formulario de creación del emprendedor
}
