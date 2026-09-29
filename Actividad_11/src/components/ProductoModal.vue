<!-- Bloque de código de configuración y lógica en JavaScript usando la sintaxis de Vue 3 -->
<script setup>
// Importa funciones especiales de Vue que detectan cuándo la ventana modal se crea y cuándo se destruye
import { onMounted, onBeforeUnmount } from 'vue'

// Define las propiedades de datos (información) que este componente recibe desde el componente padre
const props = defineProps({
  // Configuración de la propiedad 'producto', que almacena toda la información del producto a mostrar
  producto: {
    // Indica que el producto debe ser un objeto compuesto por varias propiedades (nombre, precio, etc.)
    type: Object,
    // Valor inicial por defecto en caso de no recibir ningún producto (nulo o vacío)
    default: null
  // Cierre de la configuración de la propiedad 'producto'
  },
  // Configuración de la propiedad 'visible', que indica si la ventana modal debe estar a la vista o no
  visible: {
    // Indica que debe ser un valor de tipo booleano (verdadero o falso)
    type: Boolean,
    // Especifica que es obligatorio enviar este valor para que el componente funcione
    required: true
  // Cierre de la configuración de la propiedad 'visible'
  }
// Cierre de la definición de las propiedades del componente
})

// Declara los eventos o avisos que este componente puede enviar a su componente padre, como la acción de cerrar
const emit = defineEmits(['close'])

// Función que se encarga de reaccionar cuando el usuario presiona una tecla en su teclado
function onKeydown(event) {
  // Comprueba si la ventana modal está abierta y si la tecla presionada por el usuario fue la tecla 'Escape'
  if (props.visible && event.key === 'Escape') {
    // Envía el aviso 'close' hacia afuera para ordenar el cierre de la ventana modal
    emit('close')
  // Cierre de la condición if
  }
// Cierre de la función onKeydown
}

// Función de ciclo de vida que se ejecuta automáticamente cuando el componente aparece en la pantalla
onMounted(() => {
  // Registra un detector en la ventana del navegador para escuchar cada vez que se pulsa una tecla
  window.addEventListener('keydown', onKeydown)
// Cierre de la función del hook onMounted
})

// Función de ciclo de vida que se ejecuta justo antes de que el componente desaparezca de la pantalla
onBeforeUnmount(() => {
  // Remueve el detector de teclas para no consumir recursos ni generar errores de memoria
  window.removeEventListener('keydown', onKeydown)
// Cierre de la función del hook onBeforeUnmount
})

// Fin del bloque de código JavaScript del componente
</script>

<!-- Bloque de plantilla HTML con la estructura visual y elementos que se verán en pantalla -->
<template>
  <!-- Contenedor de fondo oscuro que cubre toda la pantalla; solo se muestra si el modal está visible y hay un producto seleccionado, y al hacer clic en él emite la orden de cerrar -->
  <div v-if="visible && producto" class="overlay" @click.self="emit('close')">
    <!-- Cuadro o tarjeta principal del diálogo modal con atributos de accesibilidad para lectores de pantalla -->
    <section class="modal" role="dialog" aria-modal="true">
      <!-- Encabezado superior de la tarjeta modal donde va el título y el botón de cerrar -->
      <header class="modal__header">
        <!-- Contenedor divisor que agrupa la categoría y el nombre del producto en la cabecera -->
        <div>
          <!-- Muestra el texto de la categoría a la que pertenece el producto en formato pequeño -->
          <small>{{ producto.categoria }}</small>
          <!-- Muestra el nombre principal del producto en formato grande como encabezado secundario -->
          <h2>{{ producto.nombre }}</h2>
        <!-- Cierre del contenedor divisor de textos de la cabecera -->
        </div>
        <!-- Botón interactivo que al recibir un clic envía la orden para cerrar la ventana modal -->
        <button class="modal__close" @click="emit('close')" aria-label="Cerrar">
          <!-- Símbolo o cruz visual para indicar la acción de cerrar la ventana -->
          ×
        <!-- Cierre de la etiqueta del botón de cierre -->
        </button>
      <!-- Cierre del encabezado superior del modal -->
      </header>
      <!-- Fotografía del producto con su dirección enlazada dinámicamente y nombre accesible -->
      <img class="modal__img" :src="producto.imagen" :alt="producto.nombre" />
      <!-- Contenedor inferior para la descripción detallada y el precio del producto -->
      <div class="modal__content">
        <!-- Párrafo que muestra la descripción detallada de las características del producto -->
        <p>{{ producto.descripcion }}</p>
        <!-- Párrafo con estilo resaltado para mostrar el valor monetario del producto -->
        <p class="modal__price">
          <!-- Muestra el precio formateado con puntos de miles según las costumbres de Chile -->
          Precio: ${{ Number(producto.precio).toLocaleString('es-CL') }}
        <!-- Cierre del párrafo que muestra el precio -->
        </p>
      <!-- Cierre del contenedor de descripción y precio -->
      </div>
    <!-- Cierre del cuadro o tarjeta principal del modal -->
    </section>
  <!-- Cierre del contenedor de fondo oscuro overlay -->
  </div>
<!-- Fin del bloque de plantilla visual -->
</template>

<!-- Bloque de estilos CSS que definen los colores, tamaños y posiciones del componente -->
<style scoped>
/* Regla de estilos para el fondo oscurecido que cubre toda la pantalla (.overlay) */
.overlay {
  /* Fija la posición del fondo en relación con la pantalla completa para que no se mueva al desplazarse */
  position: fixed;
  /* Extiende el fondo hasta los cuatro bordes de la pantalla (arriba, derecha, abajo e izquierda en 0) */
  inset: 0;
  /* Coloca este elemento en la capa 100 para situarse por encima del resto del contenido de la página */
  z-index: 100;
  /* Activa el diseño de cuadrícula (Grid) para facilitar la alineación de sus elementos */
  display: grid;
  /* Centra perfectamente la tarjeta del modal tanto en el eje vertical como en el horizontal */
  place-items: center;
  /* Añade un relleno interno de 20 píxeles para que la tarjeta no toque los bordes de la pantalla */
  padding: 20px;
  /* Aplica un color de fondo azul oscuro semitransparente con un 65% de opacidad */
  background: rgba(15, 23, 42, .65);
/* Cierre de los estilos del fondo oscurecido */
}

/* Regla de estilos para la tarjeta o cuadro blanco del modal (.modal) */
.modal {
  /* Ancho dinámico que toma como máximo 680 píxeles o el 100% disponible en pantallas pequeñas */
  width: min(680px, 100%);
  /* Oculta cualquier contenido hijo que sobrepase las esquinas redondeadas */
  overflow: hidden;
  /* Redondea las cuatro esquinas de la tarjeta con un radio de 18 píxeles */
  border-radius: 18px;
  /* Asigna un color de fondo blanco limpio y brillante a la tarjeta */
  background: white;
  /* Aplica una sombra suave y profunda debajo de la tarjeta para crear un efecto de relieve */
  box-shadow: 0 25px 80px rgba(0, 0, 0, .3);
/* Cierre de los estilos de la tarjeta modal */
}

/* Regla de estilos para la barra superior o cabecera del modal (.modal__header) */
.modal__header {
  /* Coloca los elementos internos en fila horizontal usando el modelo de caja flexible (Flexbox) */
  display: flex;
  /* Empuja el bloque de títulos a la izquierda y el botón de cerrar a la derecha separándolos al máximo */
  justify-content: space-between;
  /* Añade un espacio de separación de 16 píxeles entre los elementos de la fila */
  gap: 16px;
  /* Alinea los elementos al inicio superior del contenedor */
  align-items: flex-start;
  /* Añade un relleno interno de 18 píxeles en todos los lados del encabezado */
  padding: 18px;
  /* Dibuja una línea divisoria inferior de 1 píxel gris claro para separarlo del resto de la tarjeta */
  border-bottom: 1px solid #e5e7eb;
/* Cierre de los estilos de la cabecera */
}

/* Regla de estilos para el título h2 dentro de la cabecera */
.modal__header h2 {
  /* Ajusta el margen superior a 2 píxeles y elimina los márgenes laterales e inferior */
  margin: 2px 0 0;
/* Cierre de los estilos del título h2 */
}

/* Regla de estilos para el texto de categoría (small) dentro de la cabecera */
.modal__header small {
  /* Aplica un color gris azulado suave para que la categoría se lea como información secundaria */
  color: #64748b;
/* Cierre de los estilos del texto de categoría */
}

/* Regla de estilos para el botón de cerrar (.modal__close) */
.modal__close {
  /* Quita el borde predeterminado del botón */
  border: 0;
  /* Establece un fondo totalmente transparente */
  background: transparent;
  /* Aumenta el tamaño del icono de cruz a 2rem para facilitar el clic táctil o con ratón */
  font-size: 2rem;
  /* Ajusta la altura de línea a 1 para evitar espacios verticales vacíos */
  line-height: 1;
  /* Define un color gris oscuro para el icono de la cruz */
  color: #475569;
/* Cierre de los estilos del botón de cerrar */
}

/* Regla de estilos para la fotografía del producto (.modal__img) */
.modal__img {
  /* Hace que la imagen ocupe todo el ancho disponible del modal (100%) */
  width: 100%;
  /* Fija la altura de la imagen exactamente en 300 píxeles */
  height: 300px;
  /* Recorta y acomoda la imagen proporcionalmente para que no se deforme ni pierda relación de aspecto */
  object-fit: cover;
/* Cierre de los estilos de la fotografía */
}

/* Regla de estilos para el contenedor del contenido descriptivo y precio (.modal__content) */
.modal__content {
  /* Agrega un relleno interno de 18 píxeles en todos los lados para que los textos tengan aire y margen */
  padding: 18px;
/* Cierre de los estilos del contenedor de contenido */
}

/* Regla de estilos para los párrafos dentro de la sección de contenido */
.modal__content p {
  /* Ajusta el interlineado a 1.55 veces para una lectura cómoda del párrafo */
  line-height: 1.55;
/* Cierre de los estilos de los párrafos */
}

/* Regla de estilos para el párrafo que muestra el precio (.modal__price) */
.modal__price {
  /* Aumenta el tamaño del texto a 1.05rem para destacar el precio */
  font-size: 1.05rem;
  /* Aplica un peso tipográfico muy grueso (negrita 800) para darle protagonismo */
  font-weight: 800;
/* Cierre de los estilos del precio */
}

/* Fin de los estilos del componente */
</style>
