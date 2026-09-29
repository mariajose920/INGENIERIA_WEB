// Importa los decoradores Column, Entity y PrimaryGeneratedColumn desde TypeORM para estructurar la entidad ORM
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// Decorador que indica a TypeORM que esta clase representa una tabla en la base de datos
@Entity()
// Exporta la clase Emprendedor para permitir su uso e inyección en otros módulos de la aplicación
export class Emprendedor {
  // Decorador que define la columna como clave primaria con valor numérico autoincremental
  @PrimaryGeneratedColumn()
  // Identificador único del emprendedor dentro de la base de datos
  id: number

  // Decorador que mapea esta propiedad a una columna de tipo texto estándar en la base de datos
  @Column()
  // Nombre del emprendedor
  nombre: string

  // Decorador que mapea esta propiedad a una columna de tipo texto estándar en la base de datos
  @Column()
  // Comuna o ubicación geográfica asociada al emprendedor
  comuna: string

  // Decorador que mapea esta propiedad a una columna de tipo texto estándar en la base de datos
  @Column()
  // Rubro o sector comercial al que pertenece el emprendedor
  rubro: string

  // Decorador que define una columna de tipo texto extenso ('text') en la base de datos
  @Column({ type: 'text' })
  // Descripción detallada sobre el emprendimiento o actividad
  descripcion: string

  // Decorador que mapea esta propiedad a una columna de tipo texto estándar en la base de datos
  @Column()
  // Información de contacto del emprendedor (teléfono, correo, etc.)
  contacto: string
// Cierre de la definición de la clase Emprendedor
}
