<!-- Sección de lógica del componente en JavaScript moderno -->
<script setup>
// Importa de la librería Vue las herramientas 'ref' (para crear variables reactivas que actualizan la vista cuando cambian) y 'computed' (para valores que se calculan automáticamente)
import { ref, computed } from 'vue'

// Importa la función 'useRouter' para poder cambiar de página o navegar a otras rutas mediante código
import { useRouter } from 'vue-router'

// Importa el almacén central (store) que contiene el estado y las funciones relacionadas con los servicios tecnológicos
import { useServiciosStore } from '../stores/useServiciosStore.js'

// Importa el componente visual hijo 'ServicioCard' para mostrar cada tarjeta de servicio en la pantalla
import ServicioCard from '../components/ServicioCard.vue'

// Obtiene el objeto enrutador que permite redirigir al usuario a diferentes pantallas de la aplicación
const router = useRouter()

// Extrae del almacén global: el estado 'state', la lista de 'categorias', y las funciones para seleccionar o deseleccionar un servicio
const { state, categorias, seleccionarServicio, limpiarServicioSeleccionado } = useServiciosStore()

// Variable reactiva que almacena el texto que el usuario escribe en el cuadro de búsqueda (comienza vacía)
const busqueda = ref('')

// Variable reactiva que almacena la categoría seleccionada por el usuario para filtrar (comienza en 'Todas')
const categoriaActiva = ref('Todas')

// Propiedad computada que calcula y devuelve la lista de servicios filtrados sin modificar los datos originales
const serviciosFiltrados = computed(() => {
  // Convierte el texto de búsqueda a minúsculas y elimina espacios sobrantes al inicio y al final
  const query = busqueda.value.toLowerCase().trim()
  // Filtra los servicios según las condiciones de coincidencia
  return state.servicios.filter(s => {
    // Verifica si el texto buscado está incluido en el nombre o en la descripción del servicio
    const coincideNombre = s.nombre.toLowerCase().includes(query) ||
                           s.descripcion.toLowerCase().includes(query)
    // Verifica si la categoría seleccionada es 'Todas' o si coincide exactamente con la categoría del servicio
    const coincideCategoria = categoriaActiva.value === 'Todas' ||
                              s.categoria === categoriaActiva.value
    // Devuelve verdadero sólo si se cumplen ambos filtros: coincidir en texto y en categoría
    return coincideNombre && coincideCategoria
  })
})

// Propiedad computada que calcula la cantidad total de servicios disponibles en el catálogo
const totalServicios = computed(() => state.servicios.length)

// Propiedad computada que calcula cuántos servicios resultaron del filtro aplicado
const totalFiltrados = computed(() => serviciosFiltrados.value.length)

// Función que se ejecuta cuando el usuario hace clic para seleccionar un servicio
function onSeleccionarServicio(servicio) {
  // Llama a la acción del almacén global para guardar el servicio seleccionado
  seleccionarServicio(servicio)
}

// Función que redirige al usuario hacia la página de contacto para cotizar
function irAContacto() {
  // Navega hacia la ruta '/contacto'
  router.push('/contacto')
}

// Función que restablece los filtros de búsqueda a sus valores iniciales por defecto
function resetFiltros() {
  // Vacía el texto de búsqueda
  busqueda.value = ''
  // Restablece la categoría activa a 'Todas'
  categoriaActiva.value = 'Todas'
}
// Fin del bloque de lógica del componente
</script>

<!-- Sección de plantilla visual que define la estructura HTML que se mostrará en pantalla -->
<template>
  <!-- Contenedor principal que envuelve todos los elementos visibles de la página de servicios -->
  <div class="servicios-page">
    <!-- Encabezado de la página que contiene el título y la descripción general -->
    <section class="servicios-header">
      <!-- Etiqueta decorativa superior que resalta que este es un catálogo especializado -->
      <span class="badge-tag">Catálogo Especializado</span>
      <!-- Título principal grande de la sección de servicios -->
      <h1>Nuestros Servicios Tecnológicos</h1>
      <!-- Párrafo con texto descriptivo sobre la oferta tecnológica de la empresa -->
      <p class="subtitle">
        <!-- Texto explicativo detallando las áreas y estándares de calidad ofrecidos -->
        Soluciones integrales de software, ciberseguridad, infraestructura y consultoría con estándares de calidad empresarial.
      <!-- Cierre del párrafo de descripción -->
      </p>
    <!-- Cierre de la sección del encabezado -->
    </section>

    <!-- Componente de animación que aplica una transición suave de desvanecimiento (fade) -->
    <transition name="fade">
      <!-- Barra o banner flotante que solo aparece si el usuario ha seleccionado un servicio -->
      <div class="selected-service-banner" v-if="state.servicioSeleccionado">
        <!-- Bloque izquierdo con la información del servicio seleccionado -->
        <div class="banner-info">
          <!-- Muestra el emoticono o icono representativo del servicio seleccionado -->
          <span class="banner-icon">{{ state.servicioSeleccionado.icono }}</span>
          <!-- Contenedor de texto con detalles del servicio seleccionado -->
          <div class="banner-text">
            <!-- Texto pequeño que indica que este servicio fue seleccionado para cotizar -->
            <span class="banner-subtitle">Servicio Seleccionado para Cotizar:</span>
            <!-- Nombre del servicio destacado en negrita seguido de su precio de referencia -->
            <strong>{{ state.servicioSeleccionado.nombre }}</strong> ({{ state.servicioSeleccionado.precio }})
          <!-- Cierre del bloque de texto del banner -->
          </div>
        <!-- Cierre del bloque de información del banner -->
        </div>
        <!-- Bloque derecho con botones interactivos para gestionar la selección -->
        <div class="banner-actions">
          <!-- Botón para deseleccionar y descartar el servicio actual al hacer clic -->
          <button class="btn-clear-selection" @click="limpiarServicioSeleccionado">✕ Deseleccionar</button>
          <!-- Botón para ir al formulario de contacto y cotizar el servicio al hacer clic -->
          <button class="btn-go-contact" @click="irAContacto">Ir al Formulario de Contacto →</button>
        <!-- Cierre del bloque de botones de acción -->
        </div>
      <!-- Cierre del banner de servicio seleccionado -->
      </div>
    <!-- Cierre del componente de transición -->
    </transition>

    <!-- Caja que agrupa todos los controles de filtrado y búsqueda -->
    <section class="filter-controls-box">
      <!-- Contenedor relativo que organiza el campo de texto de búsqueda y sus iconos -->
      <div class="search-input-wrapper">
        <!-- Icono decorativo de lupa posicionado dentro del campo de texto -->
        <span class="search-icon">🔍</span>
        <!-- Campo de texto interactivo donde el usuario escribe; vinculado bidireccionalmente con la variable 'busqueda' -->
        <input 
          type="text" 
          v-model="busqueda" 
          placeholder="Buscar por nombre, palabra clave o descripción..."
          class="search-input"
        />
        <!-- Botón con una 'X' que aparece solo cuando hay texto escrito para borrarlo al hacer clic -->
        <button v-if="busqueda" class="clear-search-btn" @click="busqueda = ''">✕</button>
      <!-- Cierre del contenedor del campo de búsqueda -->
      </div>

      <!-- Contenedor horizontal que agrupa los botones de categorías disponibles -->
      <div class="categories-filter">
        <!-- Botón generado dinámicamente para cada categoría; al hacer clic se establece como categoría activa -->
        <button
          v-for="cat in categorias"
          :key="cat"
          class="cat-pill"
          :class="{ active: categoriaActiva === cat }"
          @click="categoriaActiva = cat"
        >
          <!-- Muestra el nombre de la categoría actual dentro del botón -->
          {{ cat }}
        <!-- Cierre del botón de categoría -->
        </button>
      <!-- Cierre del contenedor de categorías -->
      </div>

      <!-- Fila inferior que muestra el contador de resultados y el botón de restablecer -->
      <div class="results-counter">
        <!-- Texto informativo que muestra la cantidad de resultados encontrados del total -->
        <span>Mostrando <strong>{{ totalFiltrados }}</strong> de <strong>{{ totalServicios }}</strong> servicios</span>
        <!-- Botón que aparece si se ha filtrado algo para restablecer la búsqueda a su estado original -->
        <button v-if="busqueda || categoriaActiva !== 'Todas'" class="btn-reset" @click="resetFiltros">
          <!-- Texto dentro del botón de restablecer filtros -->
          Restablecer filtros
        <!-- Cierre del botón de restablecer -->
        </button>
      <!-- Cierre del contador de resultados -->
      </div>
    <!-- Cierre de la sección de controles de filtro -->
    </section>

    <!-- Sección principal donde se presenta el catálogo de servicios -->
    <section class="catalog-section">
      <!-- Cuadrícula de tarjetas que se muestra si hay al menos un servicio filtrado -->
      <div class="services-grid" v-if="serviciosFiltrados.length > 0">
        <!-- Componente de tarjeta repetido para cada servicio que cumple el filtro de búsqueda -->
        <ServicioCard
          v-for="servicio in serviciosFiltrados"
          :key="servicio.id"
          :servicio="servicio"
          :es-seleccionado="state.servicioSeleccionado?.id === servicio.id"
          @seleccionar-servicio="onSeleccionarServicio"
        />
      <!-- Cierre de la cuadrícula de servicios -->
      </div>

      <!-- Cuadro de estado vacío que se muestra cuando no hay ningún servicio que coincida con la búsqueda -->
      <div class="empty-results-box" v-else>
        <!-- Icono de lupa grande que ilustra visualmente la falta de resultados -->
        <div class="empty-icon">🔎</div>
        <!-- Título que informa que no se encontraron servicios coincidentes -->
        <h3>No se encontraron servicios</h3>
        <!-- Mensaje detallado indicando los términos y la categoría que no arrojaron coincidencias -->
        <p>No hay resultados que coincidan con "{{ busqueda }}" en la categoría "{{ categoriaActiva }}".</p>
        <!-- Botón grande para borrar todos los filtros y volver a ver el catálogo completo -->
        <button class="btn-reset-large" @click="resetFiltros">Ver Todos los Servicios</button>
      <!-- Cierre del cuadro de estado vacío -->
      </div>
    <!-- Cierre de la sección del catálogo -->
    </section>
  <!-- Cierre del contenedor principal de la página de servicios -->
  </div>
<!-- Cierre de la plantilla visual -->
</template>

<!-- Sección de estilos CSS encapsulados que aplican únicamente a este componente -->
<style scoped>
/* Regla de diseño para el contenedor principal de la página de servicios */
.servicios-page {
  /* Habilita el modo de caja flexible (Flexbox) para organizar los elementos */
  display: flex;
  /* Ordena los elementos hijos de forma vertical, uno debajo del otro */
  flex-direction: column;
  /* Establece un espacio de separación de 36 píxeles entre cada sección vertical */
  gap: 36px;
} /* Fin de los estilos de .servicios-page */

/* Regla de estilo para el bloque de cabecera con el título de la página */
.servicios-header {
  /* Alinea todo el texto del encabezado al centro */
  text-align: center;
  /* Limita el ancho máximo a 750 píxeles para que la lectura sea cómoda */
  max-width: 750px;
  /* Centra el bloque horizontalmente en la pantalla de forma automática */
  margin: 0 auto;
} /* Fin de los estilos de .servicios-header */

/* Regla de estilo para la pequeña etiqueta distintiva superior */
.badge-tag {
  /* Permite que el elemento se comporte como bloque en línea respetando márgenes y rellenos */
  display: inline-block;
  /* Color azul para el texto de la etiqueta */
  color: #2563eb;
  /* Tamaño de fuente pequeño (0.8 veces el tamaño base) */
  font-size: 0.8rem;
  /* Grosor de texto en negrita fuerte */
  font-weight: 700;
  /* Transforma todas las letras a mayúsculas */
  text-transform: uppercase;
  /* Añade un espacio extra entre cada letra para mejorar la estética */
  letter-spacing: 0.1em;
  /* Color de fondo azul claro suave */
  background: #dbeafe;
  /* Espaciado interno: 4 píxeles arriba/abajo y 12 píxeles a los lados */
  padding: 4px 12px;
  /* Bordes redondeados en forma de píldora */
  border-radius: 20px;
  /* Margen inferior de 12 píxeles para separarlo del título */
  margin-bottom: 12px;
} /* Fin de los estilos de .badge-tag */

/* Regla de estilo para el título principal H1 dentro de la cabecera */
.servicios-header h1 {
  /* Tamaño de letra grande e impactante (2.5 veces el tamaño base) */
  font-size: 2.5rem;
  /* Color azul muy oscuro / grafito para el texto */
  color: #0f172a;
  /* Márgenes: 0 arriba, 0 derecha, 12 píxeles abajo y 0 izquierda */
  margin: 0 0 12px 0;
} /* Fin de los estilos de .servicios-header h1 */

/* Regla de estilo para el subtítulo explicativo de la cabecera */
.subtitle {
  /* Tamaño de letra ligeramente mayor al texto normal */
  font-size: 1.1rem;
  /* Color gris azulado suave y legible */
  color: #64748b;
  /* Altura de línea para que las líneas de texto tengan una separación cómoda al leer */
  line-height: 1.6;
} /* Fin de los estilos de .subtitle */

/* Regla de estilo para el banner flotante que muestra el servicio seleccionado */
.selected-service-banner {
  /* Fondo degradado diagonal en tonos azul oscuro a azul vibrante */
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  /* Color blanco para todo el texto dentro del banner */
  color: white;
  /* Esquinas redondeadas con un radio de 16 píxeles */
  border-radius: 16px;
  /* Relleno interno de 16 píxeles arriba/abajo y 24 píxeles a los lados */
  padding: 16px 24px;
  /* Habilita Flexbox para distribuir los elementos del banner */
  display: flex;
  /* Separa el contenido informativo a la izquierda y los botones a la derecha */
  justify-content: space-between;
  /* Centra verticalmente los elementos dentro del banner */
  align-items: center;
  /* Sombra azul suave que da sensación de elevación */
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
  /* Permite que los elementos pasen a otra línea si la pantalla es estrecha */
  flex-wrap: wrap;
  /* Espacio de 16 píxeles entre los elementos si se reorganizan */
  gap: 16px;
  /* Borde fino blanco semi-transparente para dar un acabado elegante */
  border: 1px solid rgba(255, 255, 255, 0.15);
} /* Fin de los estilos de .selected-service-banner */

/* Regla de estilo para la sección con información del banner */
.banner-info {
  /* Habilita Flexbox para colocar el icono junto al texto */
  display: flex;
  /* Alinea verticalmente el icono y el texto al centro */
  align-items: center;
  /* Espacio de 14 píxeles entre el icono y el texto */
  gap: 14px;
} /* Fin de los estilos de .banner-info */

/* Regla de estilo para el icono del banner */
.banner-icon {
  /* Tamaño de fuente grande (2 veces el tamaño base) para destacar el icono */
  font-size: 2rem;
  /* Fondo blanco translúcido detrás del icono */
  background: rgba(255, 255, 255, 0.15);
  /* Relleno interno de 8 píxeles alrededor del icono */
  padding: 8px;
  /* Bordes redondeados en las esquinas del recuadro del icono */
  border-radius: 10px;
} /* Fin de los estilos de .banner-icon */

/* Regla de estilo para el texto descriptivo del banner */
.banner-text {
  /* Habilita Flexbox para ordenar subtítulo y nombre */
  display: flex;
  /* Coloca el subtítulo arriba y el nombre abajo en columna */
  flex-direction: column;
  /* Tamaño de fuente para el texto del banner */
  font-size: 0.95rem;
} /* Fin de los estilos de .banner-text */

/* Regla de estilo para el subtítulo pequeño del banner */
.banner-subtitle {
  /* Tamaño de texto más pequeño para el subtítulo */
  font-size: 0.78rem;
  /* Color azul cielo claro para diferenciarlo del texto principal */
  color: #93c5fd;
  /* Transforma las letras a mayúsculas */
  text-transform: uppercase;
  /* Grosor de texto semi-negrita */
  font-weight: 600;
} /* Fin de los estilos de .banner-subtitle */

/* Regla de estilo para el contenedor de los botones de acción del banner */
.banner-actions {
  /* Habilita Flexbox para colocar los botones uno al lado del otro */
  display: flex;
  /* Espacio de 10 píxeles entre los botones */
  gap: 10px;
  /* Alinea los botones verticalmente al centro */
  align-items: center;
} /* Fin de los estilos de .banner-actions */

/* Regla de estilo para el botón de cancelar selección */
.btn-clear-selection {
  /* Fondo blanco semi-transparente */
  background: rgba(255, 255, 255, 0.15);
  /* Texto en color blanco */
  color: white;
  /* Borde blanco semi-transparente */
  border: 1px solid rgba(255, 255, 255, 0.25);
  /* Espaciado interno: 8 píxeles vertical y 14 píxeles horizontal */
  padding: 8px 14px;
  /* Bordes ligeramente redondeados */
  border-radius: 8px;
  /* Tamaño de letra para el botón */
  font-size: 0.85rem;
  /* Cambia el cursor al icono de mano indicando que es interactivo */
  cursor: pointer;
  /* Transición suave de 0.2 segundos al cambiar el color de fondo */
  transition: background 0.2s;
} /* Fin de los estilos de .btn-clear-selection */

/* Efecto al pasar el cursor sobre el botón de cancelar selección */
.btn-clear-selection:hover {
  /* Aumenta la opacidad del fondo blanco para resaltar el botón */
  background: rgba(255, 255, 255, 0.25);
} /* Fin de los estilos de .btn-clear-selection:hover */

/* Regla de estilo para el botón de ir al formulario de contacto */
.btn-go-contact {
  /* Fondo blanco sólido para que destaque como acción principal */
  background: white;
  /* Texto en color azul intenso */
  color: #1d4ed8;
  /* Quita el borde por defecto */
  border: none;
  /* Espaciado interno: 8 píxeles vertical y 18 píxeles horizontal */
  padding: 8px 18px;
  /* Bordes redondeados */
  border-radius: 8px;
  /* Grosor de texto en negrita fuerte */
  font-weight: 700;
  /* Tamaño de fuente del botón */
  font-size: 0.9rem;
  /* Cambia el cursor a mano interactiva */
  cursor: pointer;
  /* Transición suave para la animación de movimiento al pasar el cursor */
  transition: transform 0.2s;
} /* Fin de los estilos de .btn-go-contact */

/* Efecto al pasar el cursor sobre el botón de contacto */
.btn-go-contact:hover {
  /* Eleva el botón 1 píxel hacia arriba para dar efecto de botón pulsable */
  transform: translateY(-1px);
} /* Fin de los estilos de .btn-go-contact:hover */

/* Regla de estilo para la caja contenedora de los controles de filtrado y búsqueda */
.filter-controls-box {
  /* Color de fondo blanco limpio */
  background: #ffffff;
  /* Espaciado interno generoso de 24 píxeles */
  padding: 24px;
  /* Esquinas suavemente redondeadas con un radio de 18 píxeles */
  border-radius: 18px;
  /* Borde delgado gris claro para delimitar la caja */
  border: 1px solid #e2e8f0;
  /* Sombra sutil que da profundidad estética al contenedor */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  /* Habilita Flexbox para ordenar los elementos internos */
  display: flex;
  /* Organiza los controles verticalmente en fila tras fila */
  flex-direction: column;
  /* Espacio de 20 píxeles entre cada fila de controles */
  gap: 20px;
} /* Fin de los estilos de .filter-controls-box */

/* Regla de estilo para el contenedor del campo de búsqueda */
.search-input-wrapper {
  /* Posicionamiento relativo para que los iconos internos puedan posicionarse respecto a este contenedor */
  position: relative;
  /* Habilita Flexbox */
  display: flex;
  /* Alinea verticalmente los elementos internos al centro */
  align-items: center;
} /* Fin de los estilos de .search-input-wrapper */

/* Regla de estilo para el icono de lupa del buscador */
.search-icon {
  /* Posicionamiento absoluto respecto a su contenedor padre */
  position: absolute;
  /* Ubicado a 16 píxeles del borde izquierdo */
  left: 16px;
  /* Tamaño del icono de lupa */
  font-size: 1.1rem;
  /* Color gris suave para no distraer */
  color: #94a3b8;
} /* Fin de los estilos de .search-icon */

/* Regla de estilo para el campo de texto de búsqueda */
.search-input {
  /* Ocupa el 100% del ancho disponible en su contenedor */
  width: 100%;
  /* Relleno interno: 14 píxeles arriba/abajo, 44 píxeles a la derecha (para la X) y 48 píxeles a la izquierda (para la lupa) */
  padding: 14px 44px 14px 48px;
  /* Esquinas redondeadas con un radio de 12 píxeles */
  border-radius: 12px;
  /* Borde grisáceo definido de 1.5 píxeles */
  border: 1.5px solid #cbd5e1;
  /* Tamaño de letra legible de 1rem */
  font-size: 1rem;
  /* Quita el contorno por defecto del navegador */
  outline: none;
  /* Transición suave al enfocar para el borde y la sombra */
  transition: border-color 0.2s, box-shadow 0.2s;
} /* Fin de los estilos de .search-input */

/* Efecto cuando el campo de búsqueda está activo o enfocado por el usuario */
.search-input:focus {
  /* Cambia el color del borde a azul llamativo */
  border-color: #2563eb;
  /* Añade un halo o resplandor azul suave alrededor del campo */
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
} /* Fin de los estilos de .search-input:focus */

/* Regla de estilo para el botón de limpiar texto de búsqueda */
.clear-search-btn {
  /* Posicionamiento absoluto dentro del campo de búsqueda */
  position: absolute;
  /* Ubicado a 14 píxeles del borde derecho */
  right: 14px;
  /* Color de fondo gris claro */
  background: #e2e8f0;
  /* Sin borde exterior */
  border: none;
  /* Forma perfectamente circular */
  border-radius: 50%;
  /* Ancho fijo de 24 píxeles */
  width: 24px;
  /* Altura fija de 24 píxeles */
  height: 24px;
  /* Cursor interactivo de mano al apuntar */
  cursor: pointer;
  /* Tamaño pequeño del icono de cruz */
  font-size: 0.8rem;
  /* Color gris oscuro para la cruz */
  color: #475569;
} /* Fin de los estilos de .clear-search-btn */

/* Regla de estilo para el contenedor de los botones de categorías */
.categories-filter {
  /* Habilita Flexbox para distribuir los botones en línea */
  display: flex;
  /* Espacio de 8 píxeles entre cada botón de categoría */
  gap: 8px;
  /* Permite que los botones pasen a la siguiente línea si no caben en una sola */
  flex-wrap: wrap;
} /* Fin de los estilos de .categories-filter */

/* Regla de estilo para cada botón de categoría en forma de píldora */
.cat-pill {
  /* Espaciado interno: 8 píxeles vertical y 16 píxeles horizontal */
  padding: 8px 16px;
  /* Bordes completamente redondeados en forma de píldora */
  border-radius: 20px;
  /* Borde delgado gris claro */
  border: 1px solid #cbd5e1;
  /* Fondo gris muy claro y sutil */
  background: #f8fafc;
  /* Color gris oscuro para el texto */
  color: #475569;
  /* Grosor de texto semi-negrita para que sea legible */
  font-weight: 600;
  /* Tamaño de fuente del texto de la categoría */
  font-size: 0.88rem;
  /* Cambia el cursor a mano interactiva */
  cursor: pointer;
  /* Transición suave para todos los cambios de estilo al interactuar */
  transition: all 0.2s;
} /* Fin de los estilos de .cat-pill */

/* Efecto al pasar el cursor sobre un botón de categoría */
.cat-pill:hover {
  /* Oscurece ligeramente el fondo a gris para dar retroalimentación visual */
  background: #e2e8f0;
} /* Fin de los estilos de .cat-pill:hover */

/* Estilo para el botón de la categoría que se encuentra actualmente activa o seleccionada */
.cat-pill.active {
  /* Fondo azul vibrante para destacar la categoría activa */
  background: #2563eb;
  /* Texto en color blanco puro */
  color: white;
  /* Borde del mismo color azul del fondo */
  border-color: #2563eb;
  /* Sombra azul suave que resalta la selección */
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
} /* Fin de los estilos de .cat-pill.active */

/* Regla de estilo para la barra que muestra el contador de resultados */
.results-counter {
  /* Habilita Flexbox para separar el texto y el botón a los extremos */
  display: flex;
  /* Coloca el texto a la izquierda y el botón a la derecha */
  justify-content: space-between;
  /* Alinea verticalmente los elementos al centro */
  align-items: center;
  /* Tamaño de fuente para el contador */
  font-size: 0.9rem;
  /* Color de texto gris suave */
  color: #64748b;
  /* Línea divisoria superior delgada de color gris claro */
  border-top: 1px solid #f1f5f9;
  /* Espacio superior de 14 píxeles respecto a la línea divisoria */
  padding-top: 14px;
} /* Fin de los estilos de .results-counter */

/* Regla de estilo para el botón de restablecer filtros */
.btn-reset {
  /* Sin fondo visible */
  background: none;
  /* Sin borde exterior */
  border: none;
  /* Color azul para indicar que es un enlace interactivo */
  color: #2563eb;
  /* Grosor de letra semi-negrita */
  font-weight: 600;
  /* Cursor interactivo de mano */
  cursor: pointer;
  /* Tamaño de fuente */
  font-size: 0.88rem;
  /* Subrayado decorativo que refuerza su apariencia de enlace */
  text-decoration: underline;
} /* Fin de los estilos de .btn-reset */

/* Regla de estilo para la cuadrícula que organiza las tarjetas de servicios */
.services-grid {
  /* Habilita el sistema de diseño en cuadrícula (CSS Grid) */
  display: grid;
  /* Crea columnas responsivas automáticas con un ancho mínimo de 320 píxeles */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  /* Espacio de 28 píxeles entre filas y columnas de la cuadrícula */
  gap: 28px;
} /* Fin de los estilos de .services-grid */

/* Regla de estilo para la caja de mensaje cuando no hay resultados */
.empty-results-box {
  /* Color de fondo gris muy claro */
  background: #f8fafc;
  /* Borde discontinuo con guiones de color gris para indicar estado vacío */
  border: 2px dashed #cbd5e1;
  /* Esquinas redondeadas con radio de 18 píxeles */
  border-radius: 18px;
  /* Espaciado interno: 50 píxeles vertical y 20 píxeles horizontal */
  padding: 50px 20px;
  /* Centra horizontalmente todo el texto e iconos */
  text-align: center;
  /* Color de texto gris suave */
  color: #64748b;
} /* Fin de los estilos de .empty-results-box */

/* Regla de estilo para el icono de búsqueda vacía */
.empty-icon {
  /* Tamaño de fuente muy grande (3.5 veces el tamaño base) para destacar el icono */
  font-size: 3.5rem;
  /* Margen inferior de 12 píxeles para separarlo del título */
  margin-bottom: 12px;
} /* Fin de los estilos de .empty-icon */

/* Regla de estilo para el título dentro de la caja de resultados vacíos */
.empty-results-box h3 {
  /* Color oscuro para que el título resalte con claridad */
  color: #0f172a;
  /* Tamaño de fuente intermedio */
  font-size: 1.3rem;
  /* Margen inferior de 8 píxeles */
  margin-bottom: 8px;
} /* Fin de los estilos de .empty-results-box h3 */

/* Regla de estilo para el párrafo explicativo dentro de la caja de resultados vacíos */
.empty-results-box p {
  /* Margen inferior de 20 píxeles antes del botón */
  margin-bottom: 20px;
  /* Tamaño de fuente normal */
  font-size: 0.95rem;
} /* Fin de los estilos de .empty-results-box p */

/* Regla de estilo para el botón grande de restablecer en estado vacío */
.btn-reset-large {
  /* Espaciado interno: 10 píxeles arriba/abajo y 22 píxeles a los lados */
  padding: 10px 22px;
  /* Color de fondo azul llamativo */
  background: #2563eb;
  /* Color de texto blanco puro */
  color: white;
  /* Sin bordes */
  border: none;
  /* Esquinas redondeadas con un radio de 10 píxeles */
  border-radius: 10px;
  /* Grosor de texto en negrita fuerte */
  font-weight: 700;
  /* Cursor interactivo de mano */
  cursor: pointer;
} /* Fin de los estilos de .btn-reset-large */

/* Reglas de animación aplicadas durante la transición de entrada y salida suave */
.fade-enter-active, .fade-leave-active {
  /* Transición suave de opacidad que dura 0.3 segundos */
  transition: opacity 0.3s ease;
} /* Fin de las reglas de transición activa */

/* Reglas de estado inicial de entrada y estado final de salida */
.fade-enter-from, .fade-leave-to {
  /* Opacidad cero (totalmente transparente) al iniciar la entrada o terminar la salida */
  opacity: 0;
} /* Fin de las reglas de estado de transición */
</style>
