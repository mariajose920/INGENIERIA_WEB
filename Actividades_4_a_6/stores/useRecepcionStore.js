// Importa la función 'reactive' desde la biblioteca Vue para hacer que los datos se actualicen automáticamente en la interfaz
import { reactive } from 'vue'

// Crea y define la variable 'state' que contiene el almacén centralizado de datos interactivos del sistema
const state = reactive({
  // Lista que almacena todos los proveedores o empresas editoriales registradas
  proveedores: [
    // Datos del primer proveedor: identificador único, nombre de la editorial, RUT comercial y correo de contacto
    { id: 1, nombre: 'Editorial Santillana', rut: '76.123.456-7', contacto: 'soporte@santillana.cl' },
    // Datos del segundo proveedor: identificador único, nombre de la editorial, RUT comercial y correo de contacto
    { id: 2, nombre: 'Editorial SM', rut: '77.234.567-8', contacto: 'contacto@sm.cl' }
  // Fin de la lista de proveedores
  ],
  // Lista que almacena el catálogo de libros disponibles en el sistema
  libros: [
    // Datos de un libro de muestra: identificador único, código ISBN, título de la obra, editorial, nivel escolar y año de edición
    { id: 1, isbn: '978-956-123456-0', titulo: 'Matemática 5° Básico', editorial: 'Santillana', nivel: 'Básica', anio: 2024 }
  // Fin de la lista de libros
  ],
  // Lista que registra cada una de las recepciones o entregas de libros que llegan a bodega
  recepciones: [
    // Registro de una recepción: identificador único, fecha en que llegó, número de guía de despacho y el ID del proveedor asociado
    { id: 1, fecha: '2025-09-01', nro_guia: 'G-55421', id_proveedor: 1 }
  // Fin de la lista de recepciones
  ],
  // Lista con el detalle de los libros y cantidades recibidas en cada recepción
  items: [
    // Detalle de un ítem recibido: identificador del ítem, a qué recepción pertenece, qué libro es, cuántas unidades llegaron, su condición y notas sobre su estado
    { id: 1, id_recepcion: 1, id_libro: 1, cantidad: 450, estado: 'mixto', observacion: '5 libros arrugados' }
  // Fin de la lista de ítems recibidos
  ],
  // Secuencia de números para saber cuál es el próximo número de identificación (ID) que le toca a un nuevo registro
  _seq: { proveedores: 3, libros: 2, recepciones: 2, items: 2 }
// Fin de la declaración del objeto de estado global
})

// Función exportada para permitir que cualquier pantalla o componente del sistema use este almacén de datos
export function useRecepcionStore() {
  // Entrega el estado reactivo con toda la información para que pueda ser leído o modificado
  return { state }
// Fin de la función useRecepcionStore
}
