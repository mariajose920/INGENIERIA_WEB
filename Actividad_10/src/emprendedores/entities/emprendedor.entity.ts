// Importa herramientas de la librería TypeORM (Column, Entity, PrimaryGeneratedColumn) para estructurar y conectar los datos con la base de datos
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// Indica al sistema que esta clase representa una tabla completa donde se guardarán los emprendedores en la base de datos
@Entity()
// Crea y comparte la plantilla o modelo "Emprendedor" para que pueda ser utilizado en cualquier parte del sistema
export class Emprendedor {
  // Configura este campo como la clave principal e indica que se numerará automáticamente (1, 2, 3...) con cada nuevo registro
  @PrimaryGeneratedColumn()
  // Almacena el número identificador único asignado a cada emprendedor
  id: number

  // Indica que este dato se guardará como una columna estándar de texto en la tabla de la base de datos
  @Column()
  // Almacena el nombre del emprendedor en formato de texto
  nombre: string

  // Indica que este dato se guardará como una columna estándar de texto en la tabla de la base de datos
  @Column()
  // Almacena la comuna o ciudad donde opera el emprendedor
  comuna: string

  // Indica que este dato se guardará como una columna estándar de texto en la tabla de la base de datos
  @Column()
  // Almacena el rubro o área comercial a la que se dedica el emprendedor (por ejemplo: Turismo, Artesanía)
  rubro: string

  // Configura la columna para admitir un texto extenso y detallado sin límite corto de caracteres
  @Column({ type: 'text' })
  // Almacena una descripción completa y detallada sobre la actividad del emprendimiento
  descripcion: string

  // Indica que este dato se guardará como una columna estándar de texto en la tabla de la base de datos
  @Column()
  // Almacena los datos de contacto del emprendedor (como teléfono o correo electrónico)
  contacto: string
// Llave que marca el final de la definición de la plantilla Emprendedor
}
