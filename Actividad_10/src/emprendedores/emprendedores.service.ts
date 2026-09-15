// Importa herramientas de NestJS: Injectable para servicios y clases de error para responder cuando algo falla
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
// Importa el decorador para conectar y solicitar la tabla de datos en el servicio
import { InjectRepository } from '@nestjs/typeorm'
// Importa el manejador de la base de datos (Repository) que permite buscar, guardar y borrar registros
import { Repository } from 'typeorm'
// Importa la plantilla de datos que define los campos obligatorios para registrar un nuevo emprendedor
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto'
// Importa la plantilla de datos que define qué información se puede modificar en un emprendedor existente
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto'
// Importa el modelo de datos de Emprendedor que representa la tabla en la base de datos
import { Emprendedor } from './entities/emprendedor.entity'

// Indica al sistema que esta clase es un servicio reutilizable que puede ser inyectado donde se necesite
@Injectable()
// Declara y exporta la clase del servicio que contiene la lógica para gestionar a los emprendedores
export class EmprendedoresService {
  // Constructor que recibe las herramientas necesarias cuando se inicializa la clase
  constructor(
    // Indica que se debe conectar específicamente con la tabla de datos de Emprendedor
    @InjectRepository(Emprendedor)
    // Declara una propiedad privada 'repo' para realizar operaciones de base de datos sobre los emprendedores
    private repo: Repository<Emprendedor>,
  // Cierre de los parámetros del constructor
  ) {}

  // Declara la función para consultar y obtener la lista de todos los emprendedores registrados
  findAll() {
    // Consulta a la base de datos y entrega la lista completa de todos los emprendedores
    return this.repo.find()
  // Cierre de la función findAll
  }

  // Declara la función asíncrona para buscar a un único emprendedor a través de su número de identificación (ID)
  async findOne(id: number) {
    // Busca en la base de datos el primer emprendedor cuyo ID coincida con el solicitado
    const found = await this.repo.findOne({ where: { id } })
    // Si no se encontró ningún emprendedor con ese ID, detiene la ejecución y devuelve un error indicando que no existe
    if (!found) throw new NotFoundException({ error: 'Emprendedor no encontrado' })
    // Retorna la información del emprendedor encontrado
    return found
  // Cierre de la función findOne
  }

  // Declara la función para registrar un nuevo emprendedor con los datos recibidos del formulario
  create(dto: CreateEmprendedorDto) {
    // Prepara una nueva instancia de emprendedor combinando los datos recibidos con la estructura de la base de datos
    const ent = this.repo.create(dto)
    // Guarda de manera permanente el nuevo emprendedor en la base de datos y lo devuelve
    return this.repo.save(ent)
  // Cierre de la función create
  }

  // Declara la función asíncrona para modificar los datos de un emprendedor existente según su ID
  async update(id: number, dto: UpdateEmprendedorDto) {
    // Busca primero al emprendedor para verificar que existe en la base de datos antes de editarlo
    const prev = await this.findOne(id)
    // Copia y reemplaza los datos existentes del emprendedor con la nueva información recibida
    Object.assign(prev, dto)
    // Guarda los cambios realizados en la base de datos y retorna el emprendedor actualizado
    return this.repo.save(prev)
  // Cierre de la función update
  }

  // Declara la función asíncrona para eliminar un emprendedor de la base de datos usando su ID
  async remove(id: number) {
    // Busca al emprendedor para confirmar su existencia antes de proceder a borrarlo
    const prev = await this.findOne(id)
    // Elimina de forma definitiva al emprendedor de la base de datos
    await this.repo.remove(prev)
    // Retorna una confirmación indicando que la eliminación fue exitosa con ok en true
    return { ok: true }
  // Cierre de la función remove
  }

  // Declara la función asíncrona para buscar emprendedores filtrando por comuna y/o por rubro
  async buscar(comuna?: string, rubro?: string) {
    // Verifica si no se proporcionó ningún filtro de búsqueda (ni comuna ni rubro)
    if (!comuna && !rubro) {
        // Al no haber filtros especificados, devuelve la lista con todos los emprendedores
        return this.findAll();
    // Cierre de la condición sin filtros
    }
    // Inicia un constructor de consultas (QueryBuilder) para armar una búsqueda personalizada con el alias 'e'
    const qb = this.repo.createQueryBuilder('e')
    // Si se especificó una comuna, añade un filtro para que solo traiga emprendedores de esa comuna
    if (comuna) qb.andWhere('e.comuna = :comuna', { comuna })
    // Si se especificó un rubro, añade un filtro para que solo traiga emprendedores de ese rubro
    if (rubro) qb.andWhere('e.rubro = :rubro', { rubro })
    // Ejecuta la consulta en la base de datos y devuelve todos los emprendedores que cumplieron las condiciones
    return qb.getMany()
  // Cierre de la función buscar
  }
// Cierre de la clase EmprendedoresService
}
