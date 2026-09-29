// Inicia el bloque de programación en JavaScript con la sintaxis de Vue 3 Composition API (setup)
<script setup>
// Importa las funciones reactivas 'ref' y computadas 'computed' desde la biblioteca principal de Vue
import { ref, computed } from 'vue'
// Importa la función del almacén central para conectar con los datos compartidos de recepciones y libros
import { useRecepcionStore } from '../stores/useRecepcionStore.js'

// Define las propiedades que este componente recibe desde el componente padre
const props = defineProps({
  // Identificador numérico de la recepción seleccionada actualmente (opcional si aún no se selecciona ninguna)
  idRecepcion: { type: Number, required: false }
// Cierra la definición de propiedades
})

// Extrae el estado global reactivo desde el almacén de datos
const { state } = useRecepcionStore()

// Crea la variable reactiva 'form' con los datos iniciales para el formulario de ingreso de un nuevo ítem
const form = ref({
  // Identificador del libro seleccionado por el usuario, inicialmente vacío
  id_libro: '',
  // Cantidad de ejemplares recibidos, iniciando por defecto en 1 unidad
  cantidad: 1,
  // Estado físico de los ejemplares recibidos, con valor inicial 'correcto'
  estado: 'correcto',
  // Campo de texto para notas o comentarios sobre el estado del lote recibido
  observacion: ''
// Cierra el objeto con los campos del formulario reactivo
})

// Propiedad computada que filtra automáticamente los ítems pertenecientes a la recepción seleccionada
const items = computed(() =>
  // Toma la lista global de ítems (o una lista vacía como respaldo) y aplica un filtro
  (state?.items || []).filter(
    // Evalúa si el identificador de recepción del ítem coincide con la recepción recibida por propiedad
    it => it.id_recepcion === props.idRecepcion
  // Cierra la condición de filtro
  )
// Cierra la definición de la propiedad computada 'items'
)

// Propiedad computada que busca y obtiene los datos detallados de la recepción activa
const recepcionActual = computed(() =>
  // Busca en la lista de recepciones aquella cuyo identificador coincida con la recepción seleccionada
  (state?.recepciones || []).find(r => r.id === props.idRecepcion)
// Cierra la definición de la propiedad computada 'recepcionActual'
)

// Función para validar los datos del formulario y registrar un nuevo ítem en la recepción
function agregar() {
  // Verifica si no se ha seleccionado ninguna recepción
  if (!props.idRecepcion) {
    // Muestra un mensaje emergente avisando que se debe seleccionar una recepción
    alert('Seleccione una recepción primero.')
    // Cancela y detiene la ejecución de la función
    return
  // Cierra la verificación de recepción seleccionada
  }
  // Verifica si el usuario no ha seleccionado ningún libro en el formulario
  if (!form.value.id_libro) {
    // Muestra un mensaje emergente pidiendo seleccionar un libro
    alert('Seleccione un libro.')
    // Cancela y detiene la ejecución de la función
    return
  // Cierra la verificación de libro seleccionado
  }
  // Verifica si la cantidad de libros es inválida o menor a 1 unidad
  if (!form.value.cantidad || form.value.cantidad < 1) {
    // Muestra una alerta indicando que la cantidad mínima debe ser 1
    alert('La cantidad debe ser mayor o igual a 1.')
    // Cancela y detiene la ejecución de la función
    return
  // Cierra la verificación de cantidad válida
  }

  // Genera un nuevo identificador único para el ítem e incrementa el contador correlativo en 1
  const id = state._seq.items++
  // Agrega el nuevo registro de ítem a la lista global de ítems
  state.items.push({
    // Asigna el identificador único recién obtenido
    id,
    // Asigna el número de recepción al cual pertenece este ítem
    id_recepcion: props.idRecepcion,
    // Guarda el ID del libro asegurando su conversión a tipo numérico
    id_libro: Number(form.value.id_libro),
    // Guarda la cantidad de ejemplares asegurando su conversión a tipo numérico
    cantidad: Number(form.value.cantidad),
    // Guarda el estado de conservación seleccionado (correcto, dañado o mixto)
    estado: form.value.estado,
    // Guarda la observación eliminando espacios sobrantes en los extremos del texto
    observacion: form.value.observacion.trim()
  // Cierra el objeto del nuevo ítem que se inserta en la lista
  })

  // Restaura los campos del formulario a sus valores originales listos para otro ingreso
  form.value = { id_libro: '', cantidad: 1, estado: 'correcto', observacion: '' }
// Cierra la función agregar
}

// Función para remover un ítem de la recepción según su identificador único
function eliminarItem(id) {
  // Encuentra la posición del ítem en la lista comparando su número de ID
  const index = state.items.findIndex(it => it.id === id)
  // Verifica si el ítem efectivamente existe dentro del arreglo
  if (index !== -1) {
    // Quita exactamente 1 elemento en la posición encontrada de la lista
    state.items.splice(index, 1)
  // Cierra la comprobación de existencia
  }
// Cierra la función eliminarItem
}

// Función auxiliar que obtiene la información completa de un libro dado su número de ID
function getLibro(idLibro) {
  // Busca en la lista de libros aquel cuyo ID coincida con el número consultado
  return (state?.libros || []).find(l => l.id === Number(idLibro))
// Cierra la función getLibro
}
// Cierra el bloque de código de programación JavaScript
</script>

<!-- Inicia la plantilla visual HTML donde se estructura la interfaz de usuario del componente -->
<template>
  <!-- Contenedor principal que se muestra únicamente cuando hay una recepción seleccionada -->
  <div class="card-items" v-if="idRecepcion">
    <!-- Contenedor del encabezado superior con el título -->
    <div class="items-header">
      <!-- Muestra el título indicando el número de recepción y el número de guía de despacho asociada -->
      <h3>📦 Detalle de Ítems — Recepción #{{ idRecepcion }} (Guía: {{ recepcionActual?.nro_guia || '—' }})</h3>
    <!-- Cierra el encabezado superior -->
    </div>

    <!-- Formulario para ingresar nuevos ítems; previene la recarga de página al enviarse llamando a agregar() -->
    <form class="custom-form-inline" @submit.prevent="agregar">
      <!-- Grupo que agrupa la etiqueta y el selector del libro -->
      <div class="form-group">
        <!-- Etiqueta con el nombre del campo para el usuario -->
        <label>Libro</label>
        <!-- Menú desplegable enlazado con form.id_libro, de selección obligatoria -->
        <select v-model="form.id_libro" required>
          <!-- Opción inicial que invita a seleccionar un libro -->
          <option value="">— Seleccionar Libro —</option>
          <!-- Recorre el catálogo de libros disponibles para crear una opción por cada uno -->
          <option v-for="l in state?.libros || []" :key="l.id" :value="l.id">
            <!-- Muestra el título del libro junto a su editorial entre paréntesis -->
            {{ l.titulo }} ({{ l.editorial }})
          <!-- Cierra la opción individual del libro -->
          </option>
        <!-- Cierra el selector del libro -->
        </select>
      <!-- Cierra el grupo del selector del libro -->
      </div>

      <!-- Grupo con estilo de ancho reducido para ingresar la cantidad recibida -->
      <div class="form-group sm-input">
        <!-- Etiqueta con el nombre del campo de cantidad -->
        <label>Cantidad</label>
        <!-- Campo numérico vinculado a form.cantidad, que exige como mínimo 1 unidad -->
        <input type="number" v-model.number="form.cantidad" min="1" required />
      <!-- Cierra el grupo del campo de cantidad -->
      </div>

      <!-- Grupo que contiene el selector del estado físico de los ejemplares -->
      <div class="form-group">
        <!-- Etiqueta con el nombre del campo de estado -->
        <label>Estado</label>
        <!-- Menú desplegable vinculado a form.estado para elegir la condición de los libros -->
        <select v-model="form.estado">
          <!-- Opción para registrar libros que llegaron en óptimo estado -->
          <option value="correcto">✅ Correcto</option>
          <!-- Opción para registrar libros que llegaron con roturas o fallas -->
          <option value="dañado">❌ Dañado</option>
          <!-- Opción para registrar lotes con libros tanto buenos como dañados -->
          <option value="mixto">⚠️ Mixto</option>
        <!-- Cierra el menú desplegable de estado -->
        </select>
      <!-- Cierra el grupo de selección de estado -->
      </div>

      <!-- Grupo con estilo de ancho amplio para escribir notas u observaciones -->
      <div class="form-group lg-input">
        <!-- Etiqueta con el nombre del campo de observación -->
        <label>Observación</label>
        <!-- Campo de texto enlazado a form.observacion con ejemplos descriptivos -->
        <input v-model="form.observacion" placeholder="Ej: Empaque roto, hojas arrugadas..." />
      <!-- Cierra el grupo de observación -->
      </div>

      <!-- Botón verde para procesar y añadir el ítem especificado en el formulario -->
      <button class="btn-success" type="submit">➕ Añadir Ítem</button>
    <!-- Cierra el formulario en línea -->
    </form>

    <!-- Contenedor que aloja la tabla con el resumen de ítems registrados -->
    <div class="items-list-container">
      <!-- Tabla con el listado detallado de ítems ingresados a la recepción -->
      <table class="items-table">
        <!-- Encabezado con los títulos de cada columna de la tabla -->
        <thead>
          <!-- Fila que agrupa las celdas de encabezado -->
          <tr>
            <!-- Columna para el número identificador del ítem -->
            <th>#</th>
            <!-- Columna para el nombre o título del libro -->
            <th>Libro</th>
            <!-- Columna para el código identificador ISBN del libro -->
            <th>ISBN</th>
            <!-- Columna para el número de unidades recibidas -->
            <th>Cantidad</th>
            <!-- Columna para el estado de los ejemplares -->
            <th>Estado</th>
            <!-- Columna para comentarios u observaciones adicionales -->
            <th>Observaciones</th>
            <!-- Columna para los botones de acción como eliminar -->
            <th>Acción</th>
          <!-- Cierra la fila de títulos de la tabla -->
          </tr>
        <!-- Cierra el encabezado de la tabla -->
        </thead>
        <!-- Cuerpo de la tabla que contendrá las filas de datos -->
        <tbody>
          <!-- Itera sobre cada ítem recibido para renderizar una fila por cada uno -->
          <tr v-for="it in items" :key="it.id">
            <!-- Celda que muestra el número identificador del ítem -->
            <td>#{{ it.id }}</td>
            <!-- Celda que muestra el título del libro en negrita obtenido con la función getLibro -->
            <td><strong>{{ getLibro(it.id_libro)?.titulo || 'Libro #' + it.id_libro }}</strong></td>
            <!-- Celda que muestra el código ISBN del libro con estilo de código monoespaciado -->
            <td><code>{{ getLibro(it.id_libro)?.isbn || '—' }}</code></td>
            <!-- Celda que muestra la cantidad de ejemplares en una pastilla decorativa -->
            <td><span class="qty-pill">{{ it.cantidad }}</span></td>
            <!-- Celda que muestra el estado de los libros con una etiqueta de color dinámico -->
            <td>
              <!-- Etiqueta decorativa con clase css dinámica según el estado del ítem -->
              <span class="state-pill" :class="'state-' + it.estado">
                <!-- Muestra el texto legible correspondiente al estado: Correcto, Dañado o Mixto -->
                {{ it.estado === 'correcto' ? 'Correcto' : (it.estado === 'dañado' ? 'Dañado' : 'Mixto') }}
              <!-- Cierra la etiqueta decorativa de estado -->
              </span>
            <!-- Cierra la celda de estado -->
            </td>
            <!-- Celda que muestra la observación registrada o un guión si está vacía -->
            <td>{{ it.observacion || '—' }}</td>
            <!-- Celda que contiene las acciones disponibles para este ítem -->
            <td>
              <!-- Botón rojo para eliminar este ítem específico de la recepción al hacer clic -->
              <button class="btn-danger-xs" @click="eliminarItem(it.id)">Eliminar</button>
            <!-- Cierra la celda de acción -->
            </td>
          <!-- Cierra la fila del ítem -->
          </tr>
          <!-- Fila informativa que aparece cuando la lista de ítems de la recepción está vacía -->
          <tr v-if="!items.length">
            <!-- Celda extendida que abarca las 7 columnas avisando que no hay ítems cargados -->
            <td colspan="7" class="empty-msg">No hay ítems cargados en esta recepción.</td>
          <!-- Cierra la fila de tabla vacía -->
          </tr>
        <!-- Cierra el cuerpo de la tabla -->
        </tbody>
      <!-- Cierra la tabla de ítems -->
      </table>
    <!-- Cierra el contenedor de la tabla -->
    </div>
  <!-- Cierra la tarjeta principal de ítems -->
  </div>
  <!-- Bloque que se muestra en caso de que aún no se haya seleccionado ninguna recepción -->
  <div v-else class="no-selection-box">
    <!-- Mensaje con un emoticón guiando al usuario a elegir una recepción en la lista superior -->
    <p>👈 Selecciona una recepción en la tabla para ver y cargar sus ítems.</p>
  <!-- Cierra el bloque informativo de no selección -->
  </div>
<!-- Cierra la plantilla visual HTML del componente -->
</template>

<!-- Inicia la sección de estilos CSS locales aplicados exclusivamente a este componente -->
<style scoped>
/* // Estilo para la tarjeta principal contenedora de ítems */
.card-items {
  /* // Agrega una separación de 30 píxeles por encima del contenedor */
  margin-top: 30px;
  /* // Asigna un color de fondo gris claro suave */
  background: #f8fafc;
  /* // Define un borde continuo y sutil de color gris claro */
  border: 1px solid #e2e8f0;
  /* // Redondea las cuatro esquinas de la tarjeta a 10 píxeles */
  border-radius: 10px;
  /* // Aplica un espacio interno de 20 píxeles alrededor de todo el contenido */
  padding: 20px;
/* // Cierra el bloque de estilos de la tarjeta principal */
}

/* // Estilo para el título de tercer nivel dentro del encabezado de ítems */
.items-header h3 {
  /* // Deja 16 píxeles de margen inferior y remueve los demás márgenes */
  margin: 0 0 16px 0;
  /* // Establece un tamaño de fuente de 1.15 unidades de medida rem */
  font-size: 1.15rem;
  /* // Aplica un color azul oscuro elegante al texto */
  color: #1e293b;
/* // Cierra el bloque de estilos del título */
}

/* // Estilo para organizar los controles del formulario en una sola línea horizontal */
.custom-form-inline {
  /* // Utiliza la cuadrícula CSS para posicionar los campos en columnas */
  display: grid;
  /* // Define el ancho de las cinco columnas para acomodar cada campo y el botón */
  grid-template-columns: 2fr 100px 140px 2fr auto;
  /* // Separa cada columna con un espacio de 10 píxeles */
  gap: 10px;
  /* // Alinea verticalmente los campos hacia la parte inferior */
  align-items: flex-end;
  /* // Asigna un fondo blanco al formulario */
  background: #ffffff;
  /* // Aplica un margen interno de 14 píxeles */
  padding: 14px;
  /* // Redondea las esquinas del formulario a 8 píxeles */
  border-radius: 8px;
  /* // Aplica un borde gris perimetral */
  border: 1px solid #cbd5e1;
  /* // Añade un margen de 20 píxeles por debajo del formulario */
  margin-bottom: 20px;
/* // Cierra el bloque de estilos del formulario en línea */
}

/* // Regla de diseño adaptable para pantallas menores o iguales a 768 píxeles de ancho */
@media (max-width: 768px) {
  /* // Modifica el formulario para acomodarse a dispositivos móviles */
  .custom-form-inline {
    /* // Cambia la cuadrícula para mostrar todos los campos en una sola columna vertical */
    grid-template-columns: 1fr;
  /* // Cierra la adaptación del formulario en línea */
  }
/* // Cierra la regla de medios */
}

/* // Estilo para agrupar cada etiqueta con su respectivo campo de entrada */
.form-group {
  /* // Dispone los elementos utilizando caja flexible */
  display: flex;
  /* // Organiza los elementos en orientación vertical (columna) */
  flex-direction: column;
  /* // Establece un espacio de 4 píxeles entre la etiqueta y el campo */
  gap: 4px;
/* // Cierra el bloque de estilos del grupo de formulario */
}

/* // Estilo para las etiquetas de texto de cada campo del formulario */
.form-group label {
  /* // Define un tamaño de letra reducido de 0.8rem */
  font-size: 0.8rem;
  /* // Establece un grosor de letra seminegrita */
  font-weight: 600;
  /* // Aplica un tono de color gris azulado al texto */
  color: #64748b;
/* // Cierra el bloque de estilos de las etiquetas */
}

/* // Estilo general para todos los campos de texto y menús desplegables */
input, select {
  /* // Añade un relleno interno de 7 píxeles vertical y 10 píxeles horizontal */
  padding: 7px 10px;
  /* // Dibuja un borde gris claro alrededor del campo */
  border: 1px solid #cbd5e1;
  /* // Redondea las esquinas del campo a 6 píxeles */
  border-radius: 6px;
  /* // Define el tamaño de letra en 0.9rem */
  font-size: 0.9rem;
  /* // Asigna un fondo blanco al campo */
  background: white;
/* // Cierra el bloque de estilos para inputs y selects */
}

/* // Estilo para el botón verde de confirmación o añadir */
.btn-success {
  /* // Asigna un color de fondo verde representativo */
  background: #16a34a;
  /* // Coloca el color de texto del botón en blanco */
  color: white;
  /* // Elimina los bordes predeterminados */
  border: none;
  /* // Redondea las esquinas del botón a 6 píxeles */
  border-radius: 6px;
  /* // Aplica un relleno de 8 píxeles arriba/abajo y 16 píxeles a los lados */
  padding: 8px 16px;
  /* // Aplica un grosor de letra en negrita */
  font-weight: 600;
  /* // Cambia el cursor del ratón a forma de mano al pasar por encima */
  cursor: pointer;
  /* // Establece una altura fija de 36 píxeles */
  height: 36px;
  /* // Impide que el texto se rompa en dos renglones */
  white-space: nowrap;
/* // Cierra el bloque de estilos del botón verde */
}

/* // Estilo para el botón verde cuando el usuario pasa el puntero sobre él */
.btn-success:hover {
  /* // Oscurece ligeramente el fondo verde para dar retroalimentación interactiva */
  background: #15803d;
/* // Cierra el efecto hover del botón verde */
}

/* // Estilo para la tabla de visualización de ítems */
.items-table {
  /* // Extiende la tabla al 100% del ancho disponible */
  width: 100%;
  /* // Combina los bordes adyacentes para una apariencia limpia */
  border-collapse: collapse;
  /* // Asigna un fondo blanco puro a la tabla */
  background: #ffffff;
  /* // Redondea las esquinas externas a 8 píxeles */
  border-radius: 8px;
  /* // Recorta el contenido que sobrepase los bordes redondeados */
  overflow: hidden;
  /* // Aplica un borde fino alrededor de la tabla */
  border: 1px solid #e2e8f0;
/* // Cierra el bloque de estilos de la tabla */
}

/* // Estilo para las celdas del encabezado de la tabla */
.items-table th {
  /* // Asigna un color de fondo gris claro para diferenciar los títulos */
  background: #f1f5f9;
  /* // Asigna un tono de gris oscuro al texto */
  color: #475569;
  /* // Añade un espacio interno de 8 píxeles vertical y 12 píxeles horizontal */
  padding: 8px 12px;
  /* // Fija el tamaño de fuente en 0.8rem */
  font-size: 0.8rem;
  /* // Alinea el texto hacia el margen izquierdo */
  text-align: left;
  /* // Convierte el texto de los encabezados a letras mayúsculas */
  text-transform: uppercase;
/* // Cierra el bloque de estilos del encabezado */
}

/* // Estilo para las celdas estándar con contenido de datos */
.items-table td {
  /* // Añade un espacio interno de 10 píxeles vertical y 12 píxeles horizontal */
  padding: 10px 12px;
  /* // Coloca una línea de separación gris clara en la parte inferior de la celda */
  border-bottom: 1px solid #f1f5f9;
  /* // Define un tamaño de texto de 0.9rem */
  font-size: 0.9rem;
  /* // Asigna un color de texto oscuro legible */
  color: #334155;
/* // Cierra el bloque de estilos de las celdas de datos */
}

/* // Estilo para la pastilla o etiqueta que resalta la cantidad de unidades */
.qty-pill {
  /* // Aplica un peso de fuente en negrita resaltada */
  font-weight: 700;
  /* // Establece un color de fondo gris claro */
  background: #e2e8f0;
  /* // Añade un relleno de 2 píxeles arriba/abajo y 8 píxeles a los lados */
  padding: 2px 8px;
  /* // Redondea los extremos a 10 píxeles para formar una cápsula */
  border-radius: 10px;
/* // Cierra el bloque de estilos de la pastilla de cantidad */
}

/* // Estilo base para las pastillas decorativas que indican el estado */
.state-pill {
  /* // Añade un relleno de 2 píxeles arriba/abajo y 8 píxeles a los lados */
  padding: 2px 8px;
  /* // Redondea las esquinas a 10 píxeles formando una cápsula */
  border-radius: 10px;
  /* // Define un tamaño de letra pequeño de 0.8rem */
  font-size: 0.8rem;
  /* // Aplica un grosor seminegrita para legibilidad */
  font-weight: 600;
/* // Cierra el bloque de estilos base de la pastilla de estado */
}

/* // Estilo específico para ítems en estado correcto */
.state-correcto {
  /* // Aplica un color de fondo verde suave */
  background: #dcfce7;
  /* // Aplica un color de texto verde oscuro contrastante */
  color: #166534;
/* // Cierra el bloque de estilos de estado correcto */
}

/* // Estilo específico para ítems en estado dañado */
.state-dañado {
  /* // Aplica un color de fondo rojo suave */
  background: #fee2e2;
  /* // Aplica un color de texto rojo oscuro contrastante */
  color: #991b1b;
/* // Cierra el bloque de estilos de estado dañado */
}

/* // Estilo específico para ítems en estado mixto */
.state-mixto {
  /* // Aplica un color de fondo amarillo pastel suave */
  background: #fef9c3;
  /* // Aplica un color de texto dorado oscuro o marrón */
  color: #854d0e;
/* // Cierra el bloque de estilos de estado mixto */
}

/* // Estilo para el botón de eliminar de tamaño extra pequeño */
.btn-danger-xs {
  /* // Asigna un fondo rojo suave al botón */
  background: #fee2e2;
  /* // Asigna un color rojo intenso al texto */
  color: #dc2626;
  /* // Agrega un borde fino de tono rojizo */
  border: 1px solid #fca5a5;
  /* // Aplica un relleno compacto de 3 píxeles vertical y 8 píxeles horizontal */
  padding: 3px 8px;
  /* // Redondea las esquinas a 4 píxeles */
  border-radius: 4px;
  /* // Define un tamaño de letra pequeño de 0.75rem */
  font-size: 0.75rem;
  /* // Establece el cursor en forma de mano interactiva */
  cursor: pointer;
/* // Cierra el bloque de estilos del botón de eliminar */
}

/* // Estilo para el botón de eliminar cuando el cursor se sitúa sobre él */
.btn-danger-xs:hover {
  /* // Intensifica el tono rojizo de fondo al interactuar */
  background: #fecaca;
/* // Cierra el efecto hover del botón de eliminar */
}

/* // Estilo para el mensaje que se muestra cuando la tabla no tiene ítems */
.empty-msg {
  /* // Centra el texto en el medio del contenedor */
  text-align: center;
  /* // Aplica un color de texto gris claro tenue */
  color: #94a3b8;
  /* // Añade un espacio interno amplio de 16 píxeles */
  padding: 16px;
/* // Cierra el bloque de estilos del mensaje de tabla vacía */
}

/* // Estilo para el recuadro informativo cuando no hay recepción seleccionada */
.no-selection-box {
  /* // Aplica un margen superior de 20 píxeles */
  margin-top: 20px;
  /* // Aplica un relleno interno de 20 píxeles */
  padding: 20px;
  /* // Centra el mensaje de texto */
  text-align: center;
  /* // Establece un color de fondo gris claro */
  background: #f8fafc;
  /* // Crea un borde segmentado o punteado gris claro */
  border: 1px dashed #cbd5e1;
  /* // Redondea las esquinas a 8 píxeles */
  border-radius: 8px;
  /* // Asigna un color de texto gris oscuro neutro */
  color: #64748b;
/* // Cierra el bloque de estilos de la caja de no selección */
}
/* // Cierra la sección de estilos CSS del componente */
</style>
