// Importa decoradores y utilidades HTTP desde el paquete '@nestjs/common'
import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common'
// Importa el decorador ApiTags para la documentación OpenAPI / Swagger
import { ApiTags } from '@nestjs/swagger'
// Importa el DTO con la estructura para crear un nuevo emprendedor
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto'
// Importa el DTO con la estructura para actualizar un emprendedor existente
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto'
// Importa el servicio EmprendedoresService que gestiona la lógica de negocio
import { EmprendedoresService } from './emprendedores.service'

// Agrupa las rutas de este controlador bajo la etiqueta 'emprendedores' en Swagger
@ApiTags('emprendedores')
// Define el prefijo de ruta base '/emprendedores' para todas las rutas del controlador
@Controller('emprendedores')
// Declara y exporta la clase controladora de emprendedores
export class EmprendedoresController {
  // Inyecta la dependencia del servicio EmprendedoresService en el constructor
  constructor(private readonly service: EmprendedoresService) {}

  // Decorador para definir el endpoint HTTP GET en la ruta raíz '/'
  @Get()
  // Método del controlador para obtener la lista de todos los emprendedores
  findAll() {
    // Retorna el resultado de invocar el método findAll() del servicio
    return this.service.findAll()
  } // Fin del método findAll

  // Decorador para definir el endpoint HTTP GET en la subruta '/buscar'
  @Get('buscar')
  // Método que recibe los parámetros opcionales de consulta 'comuna' y 'rubro' mediante decoradores @Query
  buscar(@Query('comuna') comuna?: string, @Query('rubro') rubro?: string) {
    // Retorna el resultado de ejecutar la búsqueda en el servicio con los filtros proporcionados
    return this.service.buscar(comuna, rubro)
  } // Fin del método buscar

  // Decorador para definir el endpoint HTTP GET con parámetro de ruta ':id'
  @Get(':id')
  // Método que recibe el identificador 'id' desde los parámetros de la URL mediante @Param
  findOne(@Param('id') id: string) {
    // Convierte el id a tipo numérico y retorna el resultado de consultar dicho emprendedor en el servicio
    return this.service.findOne(Number(id))
  } // Fin del método findOne

  // Decorador para definir el endpoint HTTP POST en la ruta raíz '/'
  @Post()
  // Método que recibe los datos validados del cuerpo de la petición mediante @Body con CreateEmprendedorDto
  create(@Body() dto: CreateEmprendedorDto) {
    // Retorna el resultado de solicitar al servicio la creación del nuevo emprendedor con los datos del DTO
    return this.service.create(dto)
  } // Fin del método create

  // Decorador para definir el endpoint HTTP PUT con parámetro de ruta ':id' para actualizaciones
  @Put(':id')
  // Método que recibe el parámetro 'id' de la ruta y los datos a actualizar en el cuerpo de la petición
  update(@Param('id') id: string, @Body() dto: UpdateEmprendedorDto) {
    // Convierte el id a número y retorna el resultado de actualizar el registro en el servicio
    return this.service.update(Number(id), dto)
  } // Fin del método update

  // Decorador para definir el endpoint HTTP DELETE con parámetro de ruta ':id' para eliminaciones
  @Delete(':id')
  // Método que recibe el parámetro de ruta 'id' del emprendedor a eliminar
  remove(@Param('id') id: string) {
    // Convierte el id a número y retorna el resultado de eliminar el registro en el servicio
    return this.service.remove(Number(id))
  } // Fin del método remove
} // Fin de la clase EmprendedoresController
