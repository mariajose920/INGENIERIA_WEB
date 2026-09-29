<!-- Bloque de script con Composition API (script setup) de Vue -->
<script setup>
// Importa las funciones de ciclo de vida onMounted y onBeforeUnmount desde el paquete 'vue'
import { onMounted, onBeforeUnmount } from 'vue'

// Declara las propiedades (props) aceptadas por el componente
const props = defineProps({
  // Propiedad 'producto': objeto con los datos del producto a mostrar; su valor por defecto es null
  producto: { type: Object, default: null },
  // Propiedad 'visible': valor booleano obligatorio que indica si el modal se encuentra abierto
  visible: { type: Boolean, required: true }
// Cierre de la configuración de props
})

// Define los eventos personalizados que el componente puede emitir hacia el componente padre ('close')
const emit = defineEmits(['close'])

// Función controladora para gestionar eventos de teclado
function onKeydown(event) {
  // Si el modal está visible y la tecla pulsada es Escape, emite el evento 'close' para cerrarlo
  if (props.visible && event.key === 'Escape') emit('close')
// Cierre del cuerpo de la función onKeydown
}

// Hook onMounted: se ejecuta al montar el componente en el DOM y registra el evento keydown en el objeto window
onMounted(() => window.addEventListener('keydown', onKeydown))
// Hook onBeforeUnmount: se ejecuta antes de desmontar el componente y remueve el listener para evitar fugas de memoria
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
// Cierre del bloque de script
</script>

<!-- Bloque de plantilla HTML con la estructura visual y enlaces declarativos de Vue -->
<template>
  <!-- Contenedor overlay con fondo oscurecido que se muestra solo si visible es verdadero y producto existe; cierra al hacer click en el fondo -->
  <div v-if="visible && producto" class="overlay" @click.self="emit('close')">
    <!-- Contenedor principal de la ventana modal con atributos de accesibilidad para diálogos -->
    <section class="modal" role="dialog" aria-modal="true">
      <!-- Encabezado de la ventana modal que agrupa la información del producto y el botón de cierre -->
      <header class="modal__header">
        <!-- Contenedor que agrupa la categoría y el nombre del producto en la cabecera -->
        <div>
          <!-- Muestra el texto de la categoría a la que pertenece el producto actual -->
          <small>{{ producto.categoria }}</small>
          <!-- Muestra el nombre principal del producto como encabezado de nivel 2 -->
          <h2>{{ producto.nombre }}</h2>
        <!-- Cierre del contenedor de textos de la cabecera -->
        </div>
        <!-- Botón que permite cerrar el modal al hacer clic en él, emitiendo el evento 'close' -->
        <button class="modal__close" @click="emit('close')" aria-label="Cerrar">
          <!-- Carácter '×' (multiplicación) usado como ícono visual para la acción de cerrar -->
          ×
        <!-- Cierre de la etiqueta del botón -->
        </button>
      <!-- Cierre del encabezado de la ventana modal -->
      </header>
      <!-- Imagen ilustrativa del producto con enlace dinámico a la URL y texto alternativo accesible -->
      <img class="modal__img" :src="producto.imagen" :alt="producto.nombre" />
      <!-- Contenedor del contenido principal con la descripción y el precio del producto -->
      <div class="modal__content">
        <!-- Párrafo que renderiza el texto de la descripción detallada del producto -->
        <p>{{ producto.descripcion }}</p>
        <!-- Párrafo con estilo destacado para mostrar el precio del producto -->
        <p class="modal__price">
          <!-- Muestra el precio formateado numéricamente según la convención local de Chile (es-CL) -->
          Precio: ${{ Number(producto.precio).toLocaleString('es-CL') }}
        <!-- Cierre del párrafo de precio -->
        </p>
      <!-- Cierre del contenedor del contenido -->
      </div>
    <!-- Cierre de la sección modal -->
    </section>
  <!-- Cierre del div overlay -->
  </div>
<!-- Fin de la sección de plantilla -->
</template>

<!-- Bloque de estilos CSS encapsulados (scoped) para el componente -->
<style scoped>
/* Regla de estilos para la capa de superposición oscura (overlay) */
.overlay {
  /* Posicionamiento fijo respecto a la ventana gráfica del navegador */
  position: fixed;
  /* Ocupa los cuatro lados de la pantalla: superior, derecho, inferior e izquierdo a 0 */
  inset: 0;
  /* Nivel de capa z en 100 para situarse por encima del contenido inferior */
  z-index: 100;
  /* Define un contenedor con formato CSS Grid */
  display: grid;
  /* Centra perfectamente el contenido (modal) tanto horizontal como verticalmente */
  place-items: center;
  /* Relleno interno perimetral de 20px para evitar desbordes contra bordes de pantalla */
  padding: 20px;
  /* Fondo oscuro semitransparente con formato RGBA al 65% de opacidad */
  background: rgba(15, 23, 42, .65);
/* Cierre de la clase .overlay */
}
/* Regla de estilos para la tarjeta de la ventana modal */
.modal {
  /* Ancho dinámico que toma el valor mínimo entre 680px y el 100% disponible */
  width: min(680px, 100%);
  /* Oculta el contenido hijo que exceda los bordes redondeados */
  overflow: hidden;
  /* Aplica un redondeo de esquinas con radio de 18px */
  border-radius: 18px;
  /* Color de fondo blanco puro para el contenedor modal */
  background: white;
  /* Sombra difuminada para otorgar profundidad y elevación visual */
  box-shadow: 0 25px 80px rgba(0, 0, 0, .3);
/* Cierre de la clase .modal */
}
/* Regla de estilos para la barra superior o cabecera del modal */
.modal__header {
  /* Distribuye los elementos interiores usando el modelo Flexbox */
  display: flex;
  /* Separa el bloque de títulos y el botón de cierre a extremos opuestos */
  justify-content: space-between;
  /* Establece un espacio de separación de 16px entre columnas flexibles */
  gap: 16px;
  /* Alinea los elementos al tope superior del contenedor */
  align-items: flex-start;
  /* Aplica un padding interno de 18px en todos los lados */
  padding: 18px;
  /* Agrega una línea divisoria inferior de 1px con color gris claro */
  border-bottom: 1px solid #e5e7eb;
/* Cierre de la clase .modal__header */
}
/* Elimina el margen superior excesivo del encabezado de título h2 */
.modal__header h2 { margin: 2px 0 0; }
/* Aplica un tono gris azulado suave al texto de la categoría */
.modal__header small { color: #64748b; }
/* Regla de estilos para el botón de cerrar el modal */
.modal__close {
  /* Remueve el borde por defecto del elemento botón */
  border: 0;
  /* Establece un fondo completamente transparente */
  background: transparent;
  /* Aplica un tamaño de fuente de 2rem para agrandar la cruz de cierre */
  font-size: 2rem;
  /* Altura de línea unitaria para evitar espacio vertical innecesario */
  line-height: 1;
  /* Color gris para el icono de la cruz */
  color: #475569;
/* Cierre de la clase .modal__close */
}
/* Estilos para la imagen del producto dentro del modal: ancho completo, altura fija de 300px y recorte proporcional */
.modal__img { width: 100%; height: 300px; object-fit: cover; }
/* Espaciado interno de 18px para el bloque de contenido descriptivo */
.modal__content { padding: 18px; }
/* Altura de línea de 1.55 para favorecer la lectura del párrafo descriptivo */
.modal__content p { line-height: 1.55; }
/* Estilos para el texto de precio: tamaño de 1.05rem y peso tipográfico negrita de 800 */
.modal__price { font-size: 1.05rem; font-weight: 800; }
/* Cierre del bloque de estilos */
</style>
