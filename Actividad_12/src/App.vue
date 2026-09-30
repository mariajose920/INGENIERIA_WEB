<!-- Bloque de lógica del componente en Vue 3 utilizando Composition API y sintaxis setup -->
<script setup>
// Importa las funciones reactivas 'ref' y 'computed' desde la biblioteca Vue para guardar datos y calcular valores automáticos
import { ref, computed } from 'vue'
// Importa la lista de productos predeterminados con el alias 'baseProductos' desde el archivo de datos local
import { productos as baseProductos } from './data/productos'
// Importa el componente ProductoCard que renderiza y muestra la tarjeta individual de cada producto
import ProductoCard from './components/ProductoCard.vue'
// Importa el componente ProductoModal que muestra una ventana flotante con los detalles completos del producto
import ProductoModal from './components/ProductoModal.vue'

// Define una variable reactiva para almacenar el texto que el usuario escribe en el buscador
const filtro = ref('')
// Define una variable reactiva para almacenar la categoría seleccionada por el usuario, iniciando con 'Todas'
const categoria = ref('Todas')
// Define una variable reactiva booleana para decidir si el catálogo de productos se muestra u oculta en pantalla
const mostrarCatalogo = ref(true)
// Define una variable reactiva para almacenar el producto que el usuario eligió ver en detalle
const seleccionado = ref(null)
// Define una variable reactiva booleana que indica si la ventana emergente modal está visible o cerrada
const modalVisible = ref(false)

// Propiedad computada que construye y actualiza automáticamente la lista de categorías únicas para el menú desplegable
const categorias = computed(() => [
  // Añade la opción general 'Todas' al principio de la lista de categorías
  'Todas',
  // Extrae sin duplicados las categorías existentes en la base de productos y las agrega a la lista
  ...new Set(baseProductos.map(producto => producto.categoria))
// Cierre del arreglo y de la función que calcula las categorías disponibles
])

// Propiedad computada que genera la lista de productos filtrados según la búsqueda de texto y la categoría elegida
const listaFiltrada = computed(() => {
  // Limpia los espacios sobrantes y convierte el texto de búsqueda a minúsculas para comparar fácilmente
  const texto = filtro.value.trim().toLowerCase()
  // Recorre y filtra la lista de productos conservando únicamente aquellos que coinciden con los criterios
  return baseProductos.filter(producto => {
    // Evalúa si el producto coincide con lo que el usuario escribió en el campo de búsqueda
    const coincideTexto =
      // Si el buscador está vacío, se consideran válidos todos los productos
      !texto ||
      // O si el nombre del producto contiene la palabra buscada
      producto.nombre.toLowerCase().includes(texto) ||
      // O si la categoría del producto contiene la palabra buscada
      producto.categoria.toLowerCase().includes(texto)

    // Evalúa si la categoría seleccionada en el menú coincide con la del producto
    const coincideCategoria =
      // Coincide si el usuario seleccionó la opción 'Todas' o si coincide exactamente con la categoría del producto
      categoria.value === 'Todas' || producto.categoria === categoria.value

    // Retorna verdadero solo si el producto cumple tanto con el texto buscado como con la categoría seleccionada
    return coincideTexto && coincideCategoria
  // Cierre de la función de comprobación para cada producto
  })
// Cierre de la función computada que calcula la lista de productos filtrados
})

// Función para abrir la ventana modal y mostrar los datos del producto seleccionado por el usuario
function verDetalle(producto) {
  // Guarda la información del producto clickeado en la variable reactiva 'seleccionado'
  seleccionado.value = producto
  // Cambia el estado a verdadero para hacer visible la ventana modal en pantalla
  modalVisible.value = true
// Cierre de la función verDetalle
}

// Función para cerrar la ventana modal y reiniciar la selección
function cerrarModal() {
  // Cambia el estado a falso para esconder la ventana modal de la pantalla
  modalVisible.value = false
  // Vacía el producto seleccionado volviendo su valor a nulo
  seleccionado.value = null
// Cierre de la función cerrarModal
}
// Fin del bloque de lógica en JavaScript del componente
</script>

<!-- Bloque de plantilla HTML que define la estructura visual e interactiva del componente en la página -->
<template>
  <!-- Contenedor principal semántico que envuelve toda la página con la clase de diseño 'page' -->
  <main class="page">
    <!-- Sección de encabezado principal tipo banner (hero) con información destacada de la feria -->
    <section class="hero">
      <!-- Contenedor divisor que agrupa y organiza los textos informativos del banner principal -->
      <div>
        <!-- Párrafo superior que muestra la identificación y número de la actividad académica -->
        <p class="eyebrow">Actividad N° 10 · Vue.js</p>
        <!-- Título principal de nivel 1 con el nombre destacado de la feria artesanal -->
        <h1>Mercadito Artesanal de Ñuble</h1>
        <!-- Párrafo descriptivo con información y bienvenida sobre los productos regionales -->
        <p class="hero__text">
          <!-- Primera línea de texto descriptivo destacando creaciones, textiles y sabores locales -->
          Descubre las mejores creaciones, textiles y sabores de nuestros emprendedores locales. 
          <!-- Segunda línea de texto descriptivo invitando al visitante a explorar con filtros interactivos -->
          Aquí podrás aplicar filtros dinámicos y explorar cada detalle de forma interactiva.
        <!-- Cierre de la etiqueta del párrafo descriptivo del hero -->
        </p>
      <!-- Cierre del contenedor de textos del hero -->
      </div>
    <!-- Cierre de la sección destacada hero -->
    </section>

    <!-- Sección de barra de herramientas y controles de filtro con etiqueta descriptiva de accesibilidad -->
    <section class="toolbar" aria-label="Filtros del catálogo">
      <!-- Contenedor flexible del campo de texto de búsqueda que se expande para ocupar espacio -->
      <div class="field field--grow">
        <!-- Etiqueta de texto explicativa vinculada al campo de búsqueda mediante el identificador 'buscar' -->
        <label for="buscar">Buscar producto</label>
        <!-- Campo de entrada donde el usuario escribe el texto a buscar, conectado en tiempo real a la variable 'filtro' -->
        <input id="buscar" v-model="filtro" type="search" placeholder="Ej.: miel, queso, textil..." />
      <!-- Cierre del contenedor del campo de búsqueda -->
      </div>

      <!-- Contenedor para el selector desplegable de categorías de productos -->
      <div class="field">
        <!-- Etiqueta de texto explicativa vinculada al selector mediante el identificador 'categoria' -->
        <label for="categoria">Categoría</label>
        <!-- Menú desplegable conectado en tiempo real a la variable reactiva 'categoria' -->
        <select id="categoria" v-model="categoria">
          <!-- Opción que se repite automáticamente para cada categoría disponible en la lista 'categorias' -->
          <option v-for="item in categorias" :key="item" :value="item">
            <!-- Muestra el nombre visible de cada categoría dentro de la lista de opciones -->
            {{ item }}
          <!-- Cierre de la opción individual del menú desplegable -->
          </option>
        <!-- Cierre del menú desplegable de categorías -->
        </select>
      <!-- Cierre del contenedor del selector de categoría -->
      </div>

      <!-- Botón interactivo que alterna entre mostrar y ocultar el catálogo completo al hacer clic -->
      <button class="toggle" @click="mostrarCatalogo = !mostrarCatalogo">
        <!-- Texto dinámico que cambia entre 'Ocultar catálogo' o 'Mostrar catálogo' según corresponda -->
        {{ mostrarCatalogo ? 'Ocultar catálogo' : 'Mostrar catálogo' }}
      <!-- Cierre de la etiqueta del botón de alternancia -->
      </button>
    <!-- Cierre de la sección de la barra de herramientas -->
    </section>

    <!-- Sección que contiene el catálogo de productos; se muestra o se oculta según la variable 'mostrarCatalogo' -->
    <section v-show="mostrarCatalogo" class="catalogo">
      <!-- Encabezado del catálogo con el título de la sección y el contador de productos encontrados -->
      <div class="catalogo__header">
        <!-- Título secundario de nivel 2 que indica que aquí se listan los productos disponibles -->
        <h2>Productos disponibles</h2>
        <!-- Etiqueta que muestra en pantalla la cantidad de productos resultantes del filtro -->
        <span>{{ listaFiltrada.length }} resultado(s)</span>
      <!-- Cierre del encabezado del catálogo -->
      </div>

      <!-- Contenedor de mensaje que se dibuja en pantalla únicamente si no se encontró ningún producto -->
      <div v-if="listaFiltrada.length === 0" class="empty">
        <!-- Texto en negrita para informar claramente que no hubo coincidencias con la búsqueda -->
        <strong>No se encontraron productos.</strong>
        <!-- Párrafo orientativo invitando al usuario a probar con otro texto o elegir otra categoría -->
        <p>Prueba con otro texto o selecciona una categoría diferente.</p>
      <!-- Cierre del contenedor de mensaje de búsqueda sin resultados -->
      </div>

      <!-- Contenedor en cuadrícula que se dibuja cuando la lista filtrada sí contiene productos para exhibir -->
      <div v-else class="grid">
        <!-- Componente individual ProductoCard que dibuja la tarjeta de cada producto y escucha el evento de ver detalle -->
        <ProductoCard v-for="producto in listaFiltrada" :key="producto.id" :producto="producto" @ver-detalle="verDetalle" />
      <!-- Cierre de la cuadrícula de tarjetas de productos -->
      </div>
    <!-- Cierre de la sección del catálogo de productos -->
    </section>

    <!-- Caja de aviso que se muestra únicamente cuando el catálogo de productos ha sido ocultado por el usuario -->
    <div v-if="!mostrarCatalogo" class="hidden-msg">
      <!-- Párrafo explicativo con un icono indicando que el catálogo está oculto y cómo volver a abrirlo -->
      <p>👁️ El catálogo se encuentra oculto. Presiona el botón "Mostrar catálogo" para volver a explorarlo.</p>
    <!-- Cierre del contenedor del mensaje de catálogo oculto -->
    </div>

    <!-- Componente de ventana modal que muestra la ficha detallada del producto seleccionado cuando está visible -->
    <ProductoModal :producto="seleccionado" :visible="modalVisible" @close="cerrarModal" />

    <!-- Pie de página semántico que muestra los créditos y contexto académico del proyecto -->
    <footer class="footer">
      <!-- Texto descriptivo con la mención de actividad académica, datos demostrativos y la Región de Ñuble -->
      Actividad académica · Datos demostrativos · Región de Ñuble
    <!-- Cierre de la etiqueta del pie de página -->
    </footer>
  <!-- Cierre del contenedor semántico principal de la página -->
  </main>
<!-- Cierre del bloque de plantilla HTML del componente -->
</template>

<!-- Bloque de estilos CSS encapsulados con alcance exclusivo para los elementos de este componente -->
<style scoped>
/* Regla de estilos para el contenedor principal de la página (.page) */
.page {
  /* Establece el ancho máximo horizontal que puede ocupar el contenido en pantalla */
  max-width: 1120px;
  /* Centra automáticamente la página horizontalmente en la ventana del navegador */
  margin: 0 auto;
  /* Aplica relleno interno: 28px arriba, 20px a los costados y 40px en la parte inferior */
  padding: 28px 20px 40px;
/* Cierre de la regla .page */
}

/* Regla de estilos para el banner superior principal (.hero) */
.hero {
  /* Añade un margen inferior de 20 píxeles para separarlo de la barra de herramientas */
  margin-bottom: 20px;
  /* Aplica un espaciado interno de 32 píxeles en todos los lados del banner */
  padding: 32px;
  /* Redondea las esquinas del banner con un radio de 22 píxeles */
  border-radius: 22px;
  /* Establece el color de los textos internos en blanco */
  color: white;
  /* Aplica un fondo con degradado de color azul diagonal desde 135 grados */
  background: linear-gradient(135deg, #0f3f76, #1d4ed8);
/* Cierre de la regla .hero */
}

/* Regla de estilos para el texto introductorio superior (.eyebrow) */
.eyebrow {
  /* Margen inferior de 8 píxeles para separarlo del título principal */
  margin: 0 0 8px;
  /* Tamaño de texto pequeño para jerarquizar la información */
  font-size: .8rem;
  /* Aplica un grosor de tipografía muy marcado en negrita */
  font-weight: 800;
  /* Convierte automáticamente todo el texto a mayúsculas */
  text-transform: uppercase;
  /* Agrega separación horizontal extra entre letras para facilitar su lectura */
  letter-spacing: .08em;
  /* Aplica una ligera transparencia del 85% para suavizar el contraste */
  opacity: .85;
/* Cierre de la regla .eyebrow */
}

/* Regla de estilos para el título principal h1 dentro de la sección hero */
.hero h1 {
  /* Elimina los márgenes exteriores predeterminados del título */
  margin: 0;
  /* Tamaño de fuente adaptable que escala dinámicamente entre 2rem y 3.3rem según la pantalla */
  font-size: clamp(2rem, 5vw, 3.3rem);
/* Cierre de la regla .hero h1 */
}

/* Regla de estilos para el párrafo descriptivo dentro del banner (.hero__text) */
.hero__text {
  /* Limita el ancho máximo del párrafo a 760 píxeles para facilitar una lectura cómoda */
  max-width: 760px;
  /* Margen superior de 12 píxeles para separarlo del título h1 */
  margin: 12px 0 0;
  /* Altura de línea ampliada a 1.6 para dar aire y legibilidad al texto */
  line-height: 1.6;
  /* Aplica una ligera transparencia del 92% para una apariencia armoniosa */
  opacity: .92;
/* Cierre de la regla .hero__text */
}

/* Regla de estilos para la barra de herramientas y filtros (.toolbar) */
.toolbar {
  /* Dispone los elementos internos en una fila flexible usando Flexbox */
  display: flex;
  /* Permite que los controles pasen a la siguiente línea si la pantalla es estrecha */
  flex-wrap: wrap;
  /* Agrega un espacio de separación de 12 píxeles entre cada control */
  gap: 12px;
  /* Alinea los controles en la parte inferior de la fila para nivelar etiquetas y botones */
  align-items: end;
  /* Margen inferior de 18 píxeles para separar la barra del catálogo */
  margin-bottom: 18px;
  /* Espaciado interno de 16 píxeles en todos los bordes */
  padding: 16px;
  /* Borde delgado de 1 píxel en color gris claro */
  border: 1px solid #e2e8f0;
  /* Esquinas redondeadas con un radio de 16 píxeles */
  border-radius: 16px;
  /* Fondo blanco brillante */
  background: white;
/* Cierre de la regla .toolbar */
}

/* Regla de estilos para cada grupo de campo del formulario (.field) */
.field {
  /* Organiza la etiqueta y el control verticalmente usando cuadrícula */
  display: grid;
  /* Espacio de separación vertical de 6 píxeles entre la etiqueta y el campo */
  gap: 6px;
  /* Ancho mínimo de 190 píxeles para evitar que el campo se encoja demasiado */
  min-width: 190px;
/* Cierre de la regla .field */
}

/* Regla para que el campo de búsqueda crezca y ocupe el espacio disponible (.field--grow) */
.field--grow {
  /* Permite que el elemento crezca flexiblemente con un tamaño base de 320 píxeles */
  flex: 1 1 320px;
/* Cierre de la regla .field--grow */
}

/* Regla de estilos para las etiquetas de texto de los campos (.field label) */
.field label {
  /* Tamaño de fuente compacto de 0.82rem */
  font-size: .82rem;
  /* Tipografía en negrita para destacar sobre el control */
  font-weight: 800;
  /* Color gris azulado para contraste visual limpio y elegante */
  color: #475569;
/* Cierre de la regla .field label */
}

/* Regla compartida para los campos de entrada de texto e inputs de selección */
.field input, .field select {
  /* Hace que el control ocupe el 100% del ancho de su contenedor */
  width: 100%;
  /* Relleno interno de 10 píxeles vertical y 12 píxeles horizontal para comodidad de uso */
  padding: 10px 12px;
  /* Borde perimetral gris claro de 1 píxel */
  border: 1px solid #cbd5e1;
  /* Esquinas redondeadas con un radio de 10 píxeles */
  border-radius: 10px;
  /* Fondo blanco */
  background: white;
/* Cierre de la regla .field input, .field select */
}

/* Regla de estilos para el botón de alternar catálogo (.toggle) */
.toggle {
  /* Espaciado interno de 10 píxeles arriba/abajo y 14 píxeles a los lados */
  padding: 10px 14px;
  /* Elimina el borde predeterminado del navegador */
  border: 0;
  /* Bordes redondeados con radio de 10 píxeles */
  border-radius: 10px;
  /* Fondo oscuro azul noche para darle jerarquía visual */
  background: #0f172a;
  /* Color de texto en blanco */
  color: white;
  /* Tipografía en negrita */
  font-weight: 700;
/* Cierre de la regla .toggle */
}

/* Regla de estilos para la sección contenedora del catálogo (.catalogo) */
.catalogo {
  /* Altura mínima de 280 píxeles para evitar saltos bruscos cuando carga o filtra contenido */
  min-height: 280px;
/* Cierre de la regla .catalogo */
}

/* Regla de estilos para el encabezado del catálogo (.catalogo__header) */
.catalogo__header {
  /* Organiza los elementos en fila horizontal usando Flexbox */
  display: flex;
  /* Separa los elementos enviando el título a la izquierda y el contador a la derecha */
  justify-content: space-between;
  /* Centra verticalmente los elementos en la fila */
  align-items: center;
  /* Espacio de separación de 10 píxeles entre los elementos */
  gap: 10px;
  /* Margen vertical de 18 píxeles arriba y 12 píxeles abajo */
  margin: 18px 0 12px;
/* Cierre de la regla .catalogo__header */
}

/* Regla de estilos para el título h2 dentro del encabezado del catálogo */
.catalogo__header h2 {
  /* Elimina los márgenes exteriores predeterminados */
  margin: 0;
/* Cierre de la regla .catalogo__header h2 */
}

/* Regla de estilos para el contador de resultados dentro del encabezado del catálogo */
.catalogo__header span {
  /* Color gris neutro suave para información secundaria */
  color: #64748b;
  /* Tamaño de fuente ligeramente reducido de 0.9rem */
  font-size: .9rem;
/* Cierre de la regla .catalogo__header span */
}

/* Regla de estilos para la cuadrícula que exhibe los productos (.grid) */
.grid {
  /* Dispone los productos en un esquema de cuadrícula bidimensional (CSS Grid) */
  display: grid;
  /* Espacio de separación de 16 píxeles entre cada tarjeta de producto */
  gap: 16px;
  /* Configura por defecto 1 sola columna de ancho completo para pantallas pequeñas */
  grid-template-columns: repeat(1, minmax(0, 1fr));
/* Cierre de la regla .grid */
}

/* Regla de estilos para la caja de mensaje cuando no hay resultados (.empty) */
.empty {
  /* Espaciado interno amplio de 32 píxeles en todos los lados */
  padding: 32px;
  /* Centra el texto del mensaje horizontalmente */
  text-align: center;
  /* Borde gris punteado para indicar un área vacía */
  border: 1px dashed #94a3b8;
  /* Bordes redondeados con radio de 14 píxeles */
  border-radius: 14px;
  /* Fondo blanco */
  background: white;
  /* Color del texto en gris azulado */
  color: #475569;
/* Cierre de la regla .empty */
}

/* Regla de estilos para el pie de página (.footer) */
.footer {
  /* Margen superior de 30 píxeles para separar del resto de la página */
  margin-top: 30px;
  /* Relleno superior de 18 píxeles dentro del pie de página */
  padding-top: 18px;
  /* Línea divisoria superior de 1 píxel gris claro */
  border-top: 1px solid #e2e8f0;
  /* Color de texto gris suave para notas de pie */
  color: #64748b;
  /* Tamaño de tipografía pequeño de 0.85rem */
  font-size: .85rem;
  /* Centra el texto en el medio de la página */
  text-align: center;
/* Cierre de la regla .footer */
}

/* Regla de estilos para el mensaje informativo cuando el catálogo se oculta (.hidden-msg) */
.hidden-msg {
  /* Espaciado interno de 24 píxeles en todos los lados */
  padding: 24px;
  /* Centra el texto del mensaje horizontalmente */
  text-align: center;
  /* Color de fondo gris muy claro */
  background: #f8fafc;
  /* Bordes redondeados con radio de 12 píxeles */
  border-radius: 12px;
  /* Borde perimetral gris claro de 1 píxel */
  border: 1px solid #e2e8f0;
  /* Color de texto oscuro para fácil lectura */
  color: #334155;
  /* Margen superior de 10 píxeles para separarlo de la barra de herramientas */
  margin-top: 10px;
/* Cierre de la regla .hidden-msg */
}

/* Regla de diseño responsivo: se aplica en pantallas medianas de 640 píxeles o más (tabletas) */
@media (min-width: 640px) {
  /* Modifica la cuadrícula de productos en pantallas medianas */
  .grid {
    /* Reorganiza los productos en 2 columnas de igual ancho */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  /* Cierre de la regla .grid para pantallas medianas */
  }
/* Cierre de la regla responsiva para 640px */
}

/* Regla de diseño responsivo: se aplica en pantallas grandes de 900 píxeles o más (computadores) */
@media (min-width: 900px) {
  /* Modifica la cuadrícula de productos en pantallas grandes */
  .grid {
    /* Reorganiza los productos en 3 columnas de igual ancho */
    grid-template-columns: repeat(3, minmax(0, 1fr));
  /* Cierre de la regla .grid para pantallas grandes */
  }
/* Cierre de la regla responsiva para 900px */
}
/* Fin del bloque de estilos del componente */
</style>
