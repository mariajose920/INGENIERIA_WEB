<!-- // Inicio del bloque de código JavaScript con la lógica del componente -->
<script setup>
// Importa las funciones 'ref' (para variables reactivas que actualizan la vista) y 'computed' (para valores calculados automáticamente) desde Vue
import { ref, computed } from 'vue'
// Importa el almacén centralizado de datos de recepciones para compartir información entre componentes
import { useRecepcionStore } from '../stores/useRecepcionStore.js'
// Importa el componente hijo que muestra la lista detallada de libros recibidos
import ItemsRecepcion from './ItemsRecepcion.vue'

// Obtiene el estado global de la aplicación con las listas de proveedores, recepciones y libros
const { state } = useRecepcionStore()

// Obtiene la fecha actual del sistema en formato estándar año-mes-día (AAAA-MM-DD)
const today = new Date().toISOString().split('T')[0]
// Define una variable reactiva para guardar los datos ingresados en el formulario
const form = ref({
  // Campo de fecha inicializado con la fecha de hoy
  fecha: today,
  // Campo de número de guía o factura inicialmente vacío
  nro_guia: '',
  // Identificador del proveedor inicialmente vacío
  id_proveedor: ''
// Cierra el objeto de datos del formulario
})

// Variable reactiva que guarda el identificador de la recepción seleccionada para ver su detalle (inicia en 1)
const seleccion = ref(1)

// Función que se ejecuta al presionar el botón para guardar una nueva recepción
function guardar() {
  // Comprueba si el usuario no ha seleccionado ningún proveedor
  if (!form.value.id_proveedor) {
    // Muestra una ventana de alerta avisando que debe elegir un proveedor
    alert('Seleccione un proveedor.')
    // Detiene la ejecución para no guardar datos incompletos
    return
  // Cierra la validación de proveedor
  }
  // Comprueba si el número de guía está vacío o solo contiene espacios
  if (!form.value.nro_guia.trim()) {
    // Muestra una ventana de alerta avisando que debe ingresar el número de guía
    alert('Ingrese el N° de Guía o Factura.')
    // Detiene la ejecución si falta el número de guía
    return
  // Cierra la validación del número de guía
  }

  // Genera un nuevo número identificador único e incremental para la recepción
  const id = state._seq.recepciones++
  // Agrega la nueva recepción a la lista global en el almacén de datos
  state.recepciones.push({
    // Asigna el nuevo identificador numérico único
    id,
    // Asigna la fecha seleccionada en el formulario
    fecha: form.value.fecha,
    // Asigna el número de guía ingresado eliminando posibles espacios sobrantes
    nro_guia: form.value.nro_guia.trim(),
    // Guarda el ID del proveedor convirtiéndolo a número
    id_proveedor: Number(form.value.id_proveedor)
  // Cierra el objeto con los datos de la recepción
  })

  // Actualiza la recepción seleccionada para mostrar de inmediato la que se acaba de crear
  seleccion.value = id
  // Limpia los campos del formulario dejándolo listo para un nuevo registro
  form.value = { fecha: today, nro_guia: '', id_proveedor: '' }
// Cierra la función guardar
}

// Variable calculada que obtiene siempre la lista actualizada de recepciones o una lista vacía si no hay registros
const lista = computed(() => state?.recepciones || [])

// Función que calcula el total de libros y el porcentaje de defectuosos para una recepción específica
function getTotales(recepcionId) {
  // Busca y filtra únicamente los libros o ítems asociados al identificador de esta recepción
  const items = (state?.items || []).filter(
    // Condición: el ítem debe pertenecer a la recepción con este ID
    it => it.id_recepcion === recepcionId
  // Cierra el filtro de ítems
  )
  // Suma las cantidades de todos los libros registrados en esta recepción
  const total = items.reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0)
  // Filtra los libros que hayan llegado en mal estado
  const dañados = items
    // Condición: el estado del libro debe ser 'dañado' o 'mixto'
    .filter(it => it.estado === 'dañado' || it.estado === 'mixto')
    // Suma las cantidades de los libros que cumplen con la condición de estar defectuosos
    .reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0)

  // Calcula el porcentaje de libros dañados respecto al total con un decimal, o '0.0' si no hay libros
  const pct = total > 0 ? ((dañados / total) * 100).toFixed(1) : '0.0'
  // Retorna un objeto con el total de libros y el porcentaje de defectuosos calculado
  return { total, pct }
// Cierra la función getTotales
}

// Función para eliminar una recepción del sistema según su identificador
function eliminarRecepcion(id) {
  // Busca la posición en la que se encuentra la recepción dentro de la lista
  const index = state.recepciones.findIndex(r => r.id === id)
  // Verifica si la recepción efectivamente existe en la lista
  if (index !== -1) {
    // Elimina la recepción de la lista en la posición encontrada
    state.recepciones.splice(index, 1)
    // Comprueba si la recepción eliminada era la que estaba seleccionada en pantalla
    if (seleccion.value === id) {
      // Cambia la selección a la primera recepción restante de la lista o a nulo si ya no queda ninguna
      seleccion.value = state.recepciones[0]?.id || null
    // Cierra la condición de selección activa
    }
  // Cierra la condición de existencia de la recepción
  }
// Cierra la función eliminarRecepcion
}
// Fin del bloque de código JavaScript
</script>

<!-- Inicio de la plantilla visual HTML del componente -->
<template>
  <!-- Contenedor principal que envuelve toda la sección de recepciones -->
  <div class="recepciones-section">
    <!-- Título principal de la sección con icono decorativo -->
    <h2>📥 Recepciones de Guías</h2>

    <!-- Formulario para ingresar recepciones; evita recargar la página y llama a guardar() al presionar Enter o enviar -->
    <form class="custom-form" @submit.prevent="guardar">
      <!-- Agrupador visual para el campo de fecha de recepción -->
      <div class="form-group">
        <!-- Etiqueta de texto descriptiva que pide la fecha -->
        <label>Fecha de Recepción</label>
        <!-- Selector de calendario vinculado al campo de fecha del formulario y obligatorio -->
        <input type="date" v-model="form.fecha" required />
      <!-- Cierre del agrupador del campo de fecha -->
      </div>

      <!-- Agrupador visual para el campo de número de guía o factura -->
      <div class="form-group">
        <!-- Etiqueta de texto descriptiva que pide el número de guía o factura -->
        <label>N° Guía / Factura</label>
        <!-- Campo de texto vinculado al número de guía con texto de sugerencia y obligatorio -->
        <input v-model="form.nro_guia" placeholder="Ej: G-55421" required />
      <!-- Cierre del agrupador del número de guía -->
      </div>

      <!-- Agrupador visual para la selección de proveedor -->
      <div class="form-group">
        <!-- Etiqueta de texto descriptiva que solicita elegir un proveedor -->
        <label>Proveedor</label>
        <!-- Menú desplegable vinculado al ID de proveedor seleccionado en el formulario y obligatorio -->
        <select v-model="form.id_proveedor" required>
          <!-- Opción inicial predeterminada en blanco -->
          <option value="">-- Seleccione Proveedor --</option>
          <!-- Genera una opción por cada proveedor guardado en la lista del sistema -->
          <option v-for="p in state?.proveedores || []" :key="p.id" :value="p.id">
            <!-- Muestra el nombre del proveedor dentro de la opción desplegable -->
            {{ p.nombre }}
          <!-- Cierre de la opción de proveedor -->
          </option>
        <!-- Cierre del menú desplegable -->
        </select>
      <!-- Cierre del agrupador de proveedor -->
      </div>

      <!-- Botón principal para enviar el formulario y registrar la nueva recepción -->
      <button class="btn-primary" type="submit">➕ Nueva Recepción</button>
    <!-- Cierre del formulario -->
    </form>

    <!-- Contenedor con barra de desplazamiento horizontal para la tabla de recepciones -->
    <div class="table-container">
      <!-- Tabla estructurada con las filas y columnas de recepciones -->
      <table class="data-table">
        <!-- Encabezado de la tabla con los títulos de las columnas -->
        <thead>
          <!-- Fila de títulos de columna -->
          <tr>
            <!-- Columna para el número identificador -->
            <th>#</th>
            <!-- Columna para la fecha de recepción -->
            <th>Fecha</th>
            <!-- Columna para el nombre del proveedor -->
            <th>Proveedor</th>
            <!-- Columna para el número de guía o factura -->
            <th>N° Guía</th>
            <!-- Columna para el total acumulado de libros -->
            <th>Total Libros</th>
            <!-- Columna para el porcentaje de libros defectuosos -->
            <th>% Defectuosos</th>
            <!-- Columna para los botones de acciones -->
            <th>Acciones</th>
          <!-- Cierre de la fila de títulos -->
          </tr>
        <!-- Cierre del encabezado de la tabla -->
        </thead>
        <!-- Cuerpo de la tabla que contiene los datos de cada recepción -->
        <tbody>
          <!-- Fila repetitiva para cada recepción en la lista; resalta en azul si está seleccionada actualmente -->
          <tr 
            v-for="r in lista" 
            :key="r.id" 
            :class="{ selected: seleccion === r.id }"
          >
            <!-- Celda que muestra el número identificador en negrita -->
            <td><strong>#{{ r.id }}</strong></td>
            <!-- Celda que muestra la fecha de la recepción -->
            <td>{{ r.fecha }}</td>
            <!-- Celda que contiene la etiqueta del proveedor -->
            <td>
              <!-- Etiqueta con estilo decorativo que busca y muestra el nombre del proveedor según su ID -->
              <span class="provider-tag">
                <!-- Imprime el nombre del proveedor o una raya si no se encuentra -->
                {{ (state?.proveedores || []).find(p => p.id === Number(r.id_proveedor))?.nombre || '—' }}
              <!-- Cierre de la etiqueta de proveedor -->
              </span>
            <!-- Cierre de la celda de proveedor -->
            </td>
            <!-- Celda que muestra el número de guía en formato de código técnico -->
            <td><code>{{ r.nro_guia }}</code></td>
            <!-- Celda que muestra el total calculado de libros en negrita -->
            <td><strong>{{ getTotales(r.id).total }}</strong></td>
            <!-- Celda que muestra la insignia del porcentaje de defectuosos -->
            <td>
              <!-- Insignia visual que cambia a fondo rojo si hay libros defectuosos -->
              <span 
                class="pct-badge" 
                :class="{ 'has-defects': Number(getTotales(r.id).pct) > 0 }"
              >
                <!-- Imprime el porcentaje calculado junto al símbolo de porcentaje -->
                {{ getTotales(r.id).pct }}%
              <!-- Cierre de la insignia de porcentaje -->
              </span>
            <!-- Cierre de la celda de porcentaje -->
            </td>
            <!-- Celda que agrupa los botones de interacción para la fila -->
            <td class="actions-cell">
              <!-- Botón para ver el detalle de los libros de esta recepción; cambia su estilo si ya está seleccionado -->
              <button 
                class="btn-detail" 
                :class="{ 'active-btn': seleccion === r.id }" 
                @click="seleccion = r.id"
              >
                <!-- Muestra 'Viendo' si esta fila está seleccionada o 'Ver Detalle' si no lo está -->
                {{ seleccion === r.id ? '👁️ Viendo' : 'Ver Detalle' }}
              <!-- Cierre del botón de ver detalle -->
              </button>
              <!-- Botón rojo con cruz para eliminar esta recepción de la lista -->
              <button class="btn-danger-sm" @click="eliminarRecepcion(r.id)">✕</button>
            <!-- Cierre de la celda de acciones -->
            </td>
          <!-- Cierre de la fila de la recepción -->
          </tr>
          <!-- Fila informativa que solo se muestra cuando la lista de recepciones está vacía -->
          <tr v-if="!lista.length">
            <!-- Celda que se expande a lo ancho de las 7 columnas con el mensaje de estado vacío -->
            <td colspan="7" class="empty-msg">No hay recepciones registradas aún.</td>
          <!-- Cierre de la fila de tabla vacía -->
          </tr>
        <!-- Cierre del cuerpo de la tabla -->
        </tbody>
      <!-- Cierre de la tabla -->
      </table>
    <!-- Cierre del contenedor de la tabla -->
    </div>

    <!-- Componente hijo que muestra la lista detallada de libros recibidos para la recepción seleccionada -->
    <ItemsRecepcion :id-recepcion="seleccion" />
  <!-- Cierre del contenedor principal -->
  </div>
<!-- Fin de la plantilla visual HTML del componente -->
</template>

<!-- Inicio de los estilos visuales CSS exclusivos para este componente -->
<style scoped>
/* // Regla de estilo para el título principal dentro de la sección de recepciones */
.recepciones-section h2 {
  /* // Elimina el margen superior para alinear el título arriba */
  margin-top: 0;
  /* // Agrega una separación de 20 píxeles por debajo del título */
  margin-bottom: 20px;
  /* // Color de texto azul oscuro para alta legibilidad */
  color: #0f172a;
/* // Cierre de la regla del título */
}

/* // Regla de diseño para la caja del formulario */
.custom-form {
  /* // Organiza los campos en un esquema de cuadrícula o rejilla */
  display: grid;
  /* // Crea columnas responsivas de mínimo 180 píxeles y el botón con ancho automático */
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) auto;
  /* // Espacio de 12 píxeles de separación entre los campos */
  gap: 12px;
  /* // Alinea los campos y el botón al fondo de su fila */
  align-items: flex-end;
  /* // Color de fondo gris muy claro para diferenciar el formulario */
  background: #f8fafc;
  /* // Relleno interno de 18 píxeles para que los campos no toquen los bordes */
  padding: 18px;
  /* // Redondea las esquinas de la caja del formulario a 8 píxeles */
  border-radius: 8px;
  /* // Aplica un borde continuo gris suave de 1 píxel */
  border: 1px solid #e2e8f0;
  /* // Margen inferior de 24 píxeles para separar el formulario de la tabla */
  margin-bottom: 24px;
/* // Cierre de estilos del formulario */
}

/* // Regla para cada bloque que agrupa una etiqueta y su campo de entrada */
.form-group {
  /* // Utiliza diseño flexible para ordenar sus elementos */
  display: flex;
  /* // Coloca los elementos verticalmente, uno debajo del otro */
  flex-direction: column;
  /* // Añade 6 píxeles de separación entre la etiqueta y el campo */
  gap: 6px;
/* // Cierre del agrupador de campo */
}

/* // Regla para el texto de las etiquetas de los campos */
.form-group label {
  /* // Tamaño de letra mediano-pequeño (0.85 rem) */
  font-size: 0.85rem;
  /* // Grosor de letra seminegrita para destacar la etiqueta */
  font-weight: 600;
  /* // Color gris pizarra para el texto de la etiqueta */
  color: #475569;
/* // Cierre de estilos de la etiqueta */
}

/* // Reglas compartidas para cajas de texto y menús desplegables */
input, select {
  /* // Relleno interno de 8 píxeles vertical y 12 horizontal para escribir cómodamente */
  padding: 8px 12px;
  /* // Borde continuo de 1 píxel gris claro */
  border: 1px solid #cbd5e1;
  /* // Esquinas redondeadas a 6 píxeles */
  border-radius: 6px;
  /* // Tamaño de texto estándar cómodo para lectura */
  font-size: 0.95rem;
  /* // Elimina el contorno resaltado por defecto del navegador */
  outline: none;
  /* // Fondo blanco limpio para la escritura */
  background: white;
/* // Cierre de estilos de inputs y selects */
}

/* // Regla cuando el usuario hace clic o escribe dentro de un campo */
input:focus, select:focus {
  /* // Cambia el borde a color azul para indicar que el campo está activo */
  border-color: #2563eb;
/* // Cierre del estado enfocado */
}

/* // Regla para el botón principal de registrar nueva recepción */
.btn-primary {
  /* // Relleno interno de 9 píxeles vertical y 18 horizontal */
  padding: 9px 18px;
  /* // Color de fondo azul intenso llamativo */
  background: #2563eb;
  /* // Color blanco para el texto */
  color: white;
  /* // Quita los bordes por defecto del botón */
  border: none;
  /* // Esquinas redondeadas a 6 píxeles */
  border-radius: 6px;
  /* // Texto en seminegrita para mayor impacto visual */
  font-weight: 600;
  /* // Cambia el cursor a una mano indicando que es clickeable */
  cursor: pointer;
  /* // Altura fija de 38 píxeles que coincide con las cajas de entrada */
  height: 38px;
  /* // Impide que el texto del botón salte a una segunda línea */
  white-space: nowrap;
/* // Cierre de estilos del botón principal */
}

/* // Regla cuando se pasa el cursor sobre el botón principal */
.btn-primary:hover {
  /* // Oscurece el azul de fondo para dar respuesta visual al usuario */
  background: #1d4ed8;
/* // Cierre del hover del botón principal */
}

/* // Regla para el contenedor que envuelve la tabla */
.table-container {
  /* // Permite desplazamiento horizontal si la tabla sobrepasa el ancho de la pantalla */
  overflow-x: auto;
  /* // Margen inferior de 24 píxeles para separar la tabla del detalle de ítems */
  margin-bottom: 24px;
/* // Cierre del contenedor de la tabla */
}

/* // Regla para la tabla que muestra la lista de recepciones */
.data-table {
  /* // Hace que la tabla ocupe el 100% del ancho disponible */
  width: 100%;
  /* // Colapsa los bordes entre celdas para que queden líneas limpias y únicas */
  border-collapse: collapse;
  /* // Alinea todos los textos de la tabla a la izquierda */
  text-align: left;
/* // Cierre de estilos de la tabla */
}

/* // Regla para las celdas de encabezado de columna de la tabla */
.data-table th {
  /* // Color de fondo gris muy claro para diferenciar la cabecera */
  background: #f1f5f9;
  /* // Color gris azulado para los títulos de columna */
  color: #475569;
  /* // Relleno interno de 10 píxeles vertical y 14 horizontal */
  padding: 10px 14px;
  /* // Tamaño de texto ligeramente reducido para los títulos */
  font-size: 0.85rem;
  /* // Transforma automáticamente el texto a mayúsculas */
  text-transform: uppercase;
  /* // Espaciado sutil entre letras para mejor legibilidad en mayúsculas */
  letter-spacing: 0.05em;
/* // Cierre de estilos de encabezados */
}

/* // Regla para cada celda de datos regular en las filas de la tabla */
.data-table td {
  /* // Relleno interno de 12 píxeles vertical y 14 horizontal para dar holgura */
  padding: 12px 14px;
  /* // Línea divisoria gris muy suave en la parte inferior de cada fila */
  border-bottom: 1px solid #f1f5f9;
  /* // Color de texto gris oscuro estándar */
  color: #334155;
/* // Cierre de estilos de las celdas */
}

/* // Regla para las celdas de la fila que está seleccionada actualmente */
.data-table tr.selected td {
  /* // Pinta el fondo de la fila seleccionada con un azul pastel suave */
  background-color: #eff6ff;
/* // Cierre de estilos de fila seleccionada */
}

/* // Regla para la etiqueta visual del nombre del proveedor */
.provider-tag {
  /* // Grosor intermedio de la tipografía */
  font-weight: 500;
  /* // Color azul corporativo elegante para resaltar el proveedor */
  color: #1e40af;
/* // Cierre de la etiqueta de proveedor */
}

/* // Regla para la insignia o etiqueta del porcentaje de libros dañados */
.pct-badge {
  /* // Permite que se comporte como bloque en línea respetando dimensiones */
  display: inline-block;
  /* // Relleno compacto de 3 píxeles vertical y 8 horizontal */
  padding: 3px 8px;
  /* // Bordes completamente redondeados en forma de cápsula con radio de 12 píxeles */
  border-radius: 12px;
  /* // Tamaño de letra reducido para estilo de insignia */
  font-size: 0.85rem;
  /* // Texto en seminegrita para que los números resalten */
  font-weight: 600;
  /* // Fondo gris claro neutral cuando no hay defectos */
  background: #f1f5f9;
  /* // Color de texto gris suave neutral */
  color: #64748b;
/* // Cierre de estilos de la insignia de porcentaje */
}

/* // Regla aplicada a la insignia cuando el porcentaje de defectos es mayor a cero */
.pct-badge.has-defects {
  /* // Fondo rojo muy suave para alertar al usuario */
  background: #fee2e2;
  /* // Color de texto rojo fuerte para advertir sobre libros en mal estado */
  color: #dc2626;
/* // Cierre del estado con defectos */
}

/* // Regla para el contenedor de la celda de acciones */
.actions-cell {
  /* // Distribución horizontal flexible para ordenar los botones */
  display: flex;
  /* // Espacio de 8 píxeles de separación entre los botones */
  gap: 8px;
  /* // Centrado vertical de los botones dentro de la celda */
  align-items: center;
/* // Cierre de estilos de la celda de acciones */
}

/* // Regla para el botón de ver detalle de la recepción */
.btn-detail {
  /* // Relleno interno de 6 píxeles vertical y 12 horizontal */
  padding: 6px 12px;
  /* // Fondo gris claro neutral */
  background: #e2e8f0;
  /* // Color de texto gris oscuro */
  color: #334155;
  /* // Sin borde */
  border: none;
  /* // Esquinas redondeadas a 6 píxeles */
  border-radius: 6px;
  /* // Tamaño de letra mediano-pequeño */
  font-size: 0.85rem;
  /* // Tipografía en seminegrita */
  font-weight: 600;
  /* // Cursor de mano interactivo */
  cursor: pointer;
/* // Cierre de estilos del botón de detalle */
}

/* // Regla cuando el usuario pasa el mouse sobre el botón de ver detalle */
.btn-detail:hover {
  /* // Fondo gris ligeramente más oscuro para dar respuesta visual */
  background: #cbd5e1;
/* // Cierre del hover del botón de detalle */
}

/* // Regla para el botón de ver detalle cuando está actualmente seleccionado */
.btn-detail.active-btn {
  /* // Fondo azul corporativo para indicar claramente cuál detalle se está visualizando */
  background: #2563eb;
  /* // Texto blanco para alto contraste con el fondo azul */
  color: white;
/* // Cierre de estilos de botón de detalle activo */
}

/* // Regla para el botón pequeño de eliminar (cruz roja) */
.btn-danger-sm {
  /* // Fondo rojo muy suave que previene sobre una acción de borrado */
  background: #fee2e2;
  /* // Color de la cruz en rojo intenso */
  color: #dc2626;
  /* // Borde continuo fino en color rojo claro */
  border: 1px solid #fca5a5;
  /* // Relleno compacto de 5 píxeles vertical y 9 horizontal */
  padding: 5px 9px;
  /* // Esquinas redondeadas a 6 píxeles */
  border-radius: 6px;
  /* // Cursor de mano al pasar el puntero */
  cursor: pointer;
  /* // Tamaño de letra adecuado para el icono de cruz */
  font-size: 0.85rem;
/* // Cierre de estilos del botón de eliminar */
}

/* // Regla cuando se pasa el cursor sobre el botón de eliminar */
.btn-danger-sm:hover {
  /* // Intensifica suavemente el fondo rojo antes de hacer clic */
  background: #fecaca;
/* // Cierre del hover del botón de eliminar */
}

/* // Regla para el mensaje cuando no hay recepciones registradas en la tabla */
.empty-msg {
  /* // Centra el texto horizontalmente en el medio de la fila */
  text-align: center;
  /* // Color gris claro tenue para indicar mensaje informativo */
  color: #94a3b8;
  /* // Relleno amplio de 24 píxeles para dar sensación de holgura */
  padding: 24px;
/* // Cierre de estilos del mensaje de tabla vacía */
}
/* // Fin del bloque de estilos visuales CSS */
</style>
