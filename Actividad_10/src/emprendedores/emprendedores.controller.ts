// Importa herramientas del marco de trabajo NestJS para procesar peticiones web (manejo de rutas, verbos HTTP y recepción de parámetros)
import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common'
// Importa la utilidad ApiTags para agrupar y rotular las operaciones en la documentación interactiva de Swagger
import { ApiTags } from '@nestjs/swagger'
// Importa la plantilla de validación que define los campos obligatorios al crear un nuevo emprendedor
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto'
// Importa la plantilla de validación con los campos editables para actualizar un emprendedor
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto'
// Importa el servicio que contiene las reglas de negocio y las consultas directas a la base de datos
import { EmprendedoresService } from './emprendedores.service'

// Asigna la categoría 'emprendedores' para clasificar este grupo de rutas en la interfaz visual de Swagger
@ApiTags('emprendedores')
// Define que todas las direcciones web gestionadas por este controlador comenzarán con el prefijo '/emprendedores'
@Controller('emprendedores')
// Declara y exporta la clase controladora encargada de atender las peticiones de los usuarios sobre emprendedores
export class EmprendedoresController {
  // Constructor que recibe e inicializa de manera automática el servicio de emprendedores para usar sus funciones internas
  constructor(private readonly service: EmprendedoresService) {}

  // Indica que la siguiente función responderá a consultas de lectura (GET) en la dirección principal '/emprendedores'
  @Get()
  // Función encargada de solicitar y retornar el listado completo de todos los emprendedores registrados
  findAll() {
    // Pide al servicio que busque todos los emprendedores y devuelve la lista obtenida
    return this.service.findAll()
  // Cierre de la función findAll
  }

  // Indica que la siguiente función responderá a consultas GET en la subdirección '/emprendedores/buscar'
  @Get('buscar')
  // Función que recibe filtros opcionales de búsqueda escritos en la dirección web (comuna o rubro)
  buscar(@Query('comuna') comuna?: string, @Query('rubro') rubro?: string) {
    // Solicita al servicio buscar los emprendedores que coincidan con los filtros indicados y retorna los resultados
    return this.service.buscar(comuna, rubro)
  // Cierre de la función buscar
  }

  // Indica que la siguiente función responderá a consultas GET que incluyan el número identificador (:id) en la dirección web
  @Get(':id')
  // Función que captura el parámetro 'id' correspondiente al emprendedor que se desea consultar
  findOne(@Param('id') id: string) {
    // Convierte el identificador a formato numérico y retorna los datos del emprendedor encontrados por el servicio
    return this.service.findOne(Number(id))
  // Cierre de la función findOne
  }

  // Indica que la siguiente función responderá a solicitudes de creación de datos (POST) en la ruta '/emprendedores'
  @Post()
  // Función que recibe y valida los datos enviados para dar de alta a un nuevo emprendedor
  create(@Body() dto: CreateEmprendedorDto) {
    // Solicita al servicio guardar el nuevo emprendedor en la base de datos y retorna el registro creado
    return this.service.create(dto)
  // Cierre de la función create
  }

  // Indica que la siguiente función responderá a solicitudes de modificación (PUT) indicando el identificador (:id) del registro
  @Put(':id')
  // Función que recibe el identificador del emprendedor y los nuevos datos para actualizar su información
  update(@Param('id') id: string, @Body() dto: UpdateEmprendedorDto) {
    // Convierte el identificador a número, solicita al servicio actualizar el registro y retorna el resultado modificado
    return this.service.update(Number(id), dto)
  // Cierre de la función update
  }

  // Indica que la siguiente función responderá a solicitudes de eliminación (DELETE) indicando el identificador (:id)
  @Delete(':id')
  // Función que recibe el identificador del emprendedor que se desea remover del sistema
  remove(@Param('id') id: string) {
    // Convierte el identificador a número, solicita al servicio borrar el registro y retorna la confirmación de la operación
    return this.service.remove(Number(id))
  // Cierre de la función remove
  }
// Cierre del cuerpo de la clase EmprendedoresController
}
