// Importa utilidades, decoradores y excepciones HTTP necesarias desde el módulo común de NestJS
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
// Importa el decorador InjectRepository para inyectar el repositorio de TypeORM en el servicio
import { InjectRepository } from '@nestjs/typeorm'
// Importa la clase Repository de TypeORM que proporciona métodos para interactuar con la base de datos
import { Repository } from 'typeorm'
// Importa el DTO con la estructura y validaciones necesarias para crear un emprendedor
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto'
// Importa el DTO con los campos permitidos para actualizar un emprendedor existente
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto'
// Importa la entidad Emprendedor que representa el modelo y la tabla de emprendedores en la base de datos
import { Emprendedor } from './entities/emprendedor.entity'

// Decorador que registra esta clase como un proveedor inyectable en el contenedor de dependencias de NestJS
@Injectable()
// Declara y exporta la clase EmprendedoresService que gestiona la lógica de negocio de los emprendedores
export class EmprendedoresService {
  // Define el constructor de la clase para recibir las dependencias requeridas
  constructor(
    // Decorador que especifica la inyección del repositorio correspondiente a la entidad Emprendedor
    @InjectRepository(Emprendedor)
    // Declara una propiedad privada repo de tipo Repository<Emprendedor> para operar con la base de datos
    private repo: Repository<Emprendedor>,
  // Cierre de los parámetros del constructor
  ) {}

  // Declara el método para consultar y obtener todos los emprendedores registrados
  findAll() {
    // Ejecuta la consulta find() del repositorio para obtener y retornar todos los emprendedores de la base de datos
    return this.repo.find()
  // Cierre del método findAll
  }

  // Declara el método asíncrono para buscar un emprendedor específico a través de su ID
  async findOne(id: number) {
    // Consulta en el repositorio de manera asíncrona el primer registro que coincida con el ID proporcionado
    const found = await this.repo.findOne({ where: { id } })
    // Comprueba si no se encontró ningún emprendedor con dicho ID y lanza una excepción NotFoundException (404)
    if (!found) throw new NotFoundException({ error: 'Emprendedor no encontrado' })
    // Retorna la entidad del emprendedor encontrada en caso de existir
    return found
  // Cierre del método findOne
  }

  // Declara el método para crear y registrar un nuevo emprendedor a partir del DTO recibido
  create(dto: CreateEmprendedorDto) {
    // Crea una nueva instancia de la entidad Emprendedor mapeando las propiedades recibidas en el DTO
    const ent = this.repo.create(dto)
    // Guarda y persiste la nueva entidad en la base de datos mediante el repositorio y retorna el registro guardado
    return this.repo.save(ent)
  // Cierre del método create
  }

  // Declara el método asíncrono para actualizar los datos de un emprendedor existente identificado por su ID
  async update(id: number, dto: UpdateEmprendedorDto) {
    // Obtiene el registro actual llamando a findOne, asegurando que el emprendedor exista o lanzando error si no
    const prev = await this.findOne(id)
    // Copia y sobrescribe los nuevos campos provenientes del DTO sobre la entidad existente
    Object.assign(prev, dto)
    // Guarda los cambios aplicados en la base de datos a través del repositorio y retorna la entidad actualizada
    return this.repo.save(prev)
  // Cierre del método update
  }

  // Declara el método asíncrono para eliminar un registro de emprendedor de la base de datos por su ID
  async remove(id: number) {
    // Busca el emprendedor mediante findOne para validar su existencia previa antes de proceder al borrado
    const prev = await this.findOne(id)
    // Elimina de forma asíncrona la entidad encontrada de la base de datos utilizando el repositorio
    await this.repo.remove(prev)
    // Retorna un objeto con la propiedad ok en true para confirmar que la eliminación fue satisfactoria
    return { ok: true }
  // Cierre del método remove
  }

  // Declara el método asíncrono para realizar búsquedas filtradas de emprendedores por comuna y/o rubro
  async buscar(comuna?: string, rubro?: string) {
    // Evalúa si no se ha recibido ni el parámetro comuna ni el parámetro rubro como filtro
    if (!comuna && !rubro) {
        // En caso de que no existan filtros de búsqueda, retorna la lista completa usando findAll()
        return this.findAll();
    // Cierre del bloque condicional
    }
    // Inicializa una instancia de QueryBuilder sobre la entidad Emprendedor asignando el alias 'e'
    const qb = this.repo.createQueryBuilder('e')
    // Si se especificó el parámetro comuna, agrega una condición SQL AND WHERE parametrizada por comuna
    if (comuna) qb.andWhere('e.comuna = :comuna', { comuna })
    // Si se especificó el parámetro rubro, agrega una condición SQL AND WHERE parametrizada por rubro
    if (rubro) qb.andWhere('e.rubro = :rubro', { rubro })
    // Ejecuta la consulta construida y retorna la lista de emprendedores que coinciden con los filtros aplicados
    return qb.getMany()
  // Cierre del método buscar
  }
// Cierre del bloque de la clase EmprendedoresService
}
