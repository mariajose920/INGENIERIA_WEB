<!-- Bloque de lógica del componente en Vue 3 utilizando Composition API y sintaxis setup -->
<script setup>
// Importa las funciones reactivas 'ref' y 'computed' desde la biblioteca Vue
import { ref, computed } from 'vue'
// Importa la lista de productos predeterminados con el alias 'baseProductos' desde el archivo de datos
import { productos as baseProductos } from './data/productos'
// Importa el componente ProductoCard que renderiza cada tarjeta individual de producto
import ProductoCard from './components/ProductoCard.vue'
// Importa el componente ProductoModal que muestra los detalles del producto en una ventana modal
import ProductoModal from './components/ProductoModal.vue'

// Define una variable reactiva para almacenar la cadena de búsqueda de productos
const filtro = ref('')
// Define una variable reactiva para almacenar la categoría seleccionada, inicializada en 'Todas'
const categoria = ref('Todas')
// Define una variable reactiva booleana para controlar la visibilidad del catálogo en la vista
const mostrarCatalogo = ref(true)
// Define una variable reactiva para almacenar el objeto del producto actualmente seleccionado
const seleccionado = ref(null)
// Define una variable reactiva booleana que controla si la ventana modal está abierta o cerrada
const modalVisible = ref(false)

// Propiedad computada que construye la lista única de categorías disponibles para el selector
const categorias = computed(() => [
  // Añade la opción por defecto 'Todas' al inicio del arreglo de categorías
  'Todas',
  // Extrae las categorías únicas de baseProductos mediante Set y map, y las desestructura en el arreglo
  ...new Set(baseProductos.map(producto => producto.categoria))
// Cierre del arreglo y de la función de la propiedad computada 'categorias'
])

// Propiedad computada que filtra los productos según el término de búsqueda y la categoría seleccionada
const listaFiltrada = computed(() => {
  // Limpia los espacios en blanco de los extremos y convierte el texto de búsqueda a minúsculas
  const texto = filtro.value.trim().toLowerCase()
  // Retorna el arreglo de productos filtrado según los criterios de búsqueda y categoría
  return baseProductos.filter(producto => {
    // Evalúa si el producto coincide con el texto buscado en su nombre o en su categoría
    const coincideTexto =
      // Coincide por defecto si no se ha ingresado texto en el buscador
      !texto ||
      // O si el nombre del producto incluye el término de búsqueda
      producto.nombre.toLowerCase().includes(texto) ||
      // O si la categoría del producto incluye el término de búsqueda
      producto.categoria.toLowerCase().includes(texto)

    // Evalúa si el producto coincide con la categoría seleccionada en el filtro
    const coincideCategoria =
      // Coincide si la categoría elegida es 'Todas' o si es igual a la categoría del producto
      categoria.value === 'Todas' || producto.categoria === categoria.value

    // Retorna verdadero solo si se cumplen simultáneamente ambos criterios de filtrado
    return coincideTexto && coincideCategoria
  // Cierre de la función de iteración del método filter
  })
// Cierre del bloque de la propiedad computada 'listaFiltrada'
})

// Función para abrir la ventana modal asignando el producto seleccionado recibido como parámetro
function verDetalle(producto) {
  // Asigna el producto seleccionado a la variable reactiva 'seleccionado'
  seleccionado.value = producto
  // Cambia el estado a verdadero para hacer visible la ventana modal
  modalVisible.value = true
// Cierre de la función verDetalle
}

// Función para cerrar la ventana modal y restablecer el producto seleccionado
function cerrarModal() {
  // Cambia el estado a falso para ocultar la ventana modal
  modalVisible.value = false
  // Restablece el valor del producto seleccionado a null
  seleccionado.value = null
// Cierre de la función cerrarModal
}
// Cierre de la etiqueta del bloque de script setup
</script>

<!-- Bloque de plantilla HTML que define la estructura visual e interactiva del componente -->
<template>
  <!-- Contenedor principal semántico de la página con clase de estilo page -->
  <main class="page">
    <!-- Sección de encabezado principal tipo hero con estilo visual destacado -->
    <section class="hero">
      <!-- Contenedor divisor para agrupar los textos del banner principal -->
      <div>
        <!-- Párrafo superior que muestra la identificación de la actividad académica -->
        <p class="eyebrow">Actividad N° 10 · Vue.js</p>
        <!-- Título principal de nivel 1 con el nombre de la feria artesanal -->
        <h1>Mercadito Artesanal de Ñuble</h1>
        <!-- Párrafo descriptivo con información y bienvenida sobre los productos regionales -->
        <p class="hero__text">
          <!-- Primera línea de texto descriptivo sobre creaciones, textiles y sabores locales -->
          Descubre las mejores creaciones, textiles y sabores de nuestros emprendedores locales. 
          <!-- Segunda línea de texto descriptivo invitando a explorar con filtros interactivos -->
          Aquí podrás aplicar filtros dinámicos y explorar cada detalle de forma interactiva.
        <!-- Cierre de la etiqueta del párrafo descriptivo del hero -->
        </p>
      <!-- Cierre del contenedor de textos del hero -->
      </div>
    <!-- Cierre de la sección hero -->
    </section>

    <!-- Sección de barra de herramientas y filtros del catálogo con etiqueta de accesibilidad -->
    <section class="toolbar" aria-label="Filtros del catálogo">
      <!-- Contenedor flexible del campo de texto de búsqueda de productos -->
      <div class="field field--grow">
        <!-- Etiqueta descriptiva vinculada al campo de búsqueda de texto -->
        <label for="buscar">Buscar producto</label>
        <!-- Campo de entrada con enlace bidireccional reactivo a la variable 'filtro' -->
        <input id="buscar" v-model="filtro" type="search" placeholder="Ej.: miel, queso, textil..." />
      <!-- Cierre del contenedor del campo de búsqueda -->
      </div>

      <!-- Contenedor del selector desplegable de categoría de producto -->
      <div class="field">
        <!-- Etiqueta descriptiva vinculada al selector desplegable de categoría -->
        <label for="categoria">Categoría</label>
        <!-- Selector desplegable vinculado bidireccionalmente a la variable reactiva 'categoria' -->
        <select id="categoria" v-model="categoria">
          <!-- Opción generada dinámicamente con v-for que itera sobre la lista de categorías -->
          <option v-for="item in categorias" :key="item" :value="item">
            <!-- Interpolación reactiva del nombre de la categoría actual dentro de la opción -->
            {{ item }}
          <!-- Cierre de la opción del selector desplegable -->
          </option>
        <!-- Cierre del selector desplegable de categorías -->
        </select>
      <!-- Cierre del contenedor del selector de categoría -->
      </div>

      <!-- Botón interactivo que alterna la visibilidad del catálogo mediante el evento click -->
      <button class="toggle" @click="mostrarCatalogo = !mostrarCatalogo">
        <!-- Texto dinámico del botón según el valor booleano de la variable reactiva mostrarCatalogo -->
        {{ mostrarCatalogo ? 'Ocultar catálogo' : 'Mostrar catálogo' }}
      <!-- Cierre de la etiqueta del botón de alternancia -->
      </button>
    <!-- Cierre de la sección de la barra de herramientas -->
    </section>

    <!-- Sección del catálogo vinculada a v-show para alternar su visibilidad sin alterar el DOM -->
    <section v-show="mostrarCatalogo" class="catalogo">
      <!-- Encabezado del catálogo con el título de sección y el contador de resultados encontrados -->
      <div class="catalogo__header">
        <!-- Título secundario que indica los productos disponibles en la feria -->
        <h2>Productos disponibles</h2>
        <!-- Indicador de texto que interpola la cantidad de resultados de la lista filtrada -->
        <span>{{ listaFiltrada.length }} resultado(s)</span>
      <!-- Cierre del encabezado del catálogo -->
      </div>

      <!-- Contenedor renderizado con v-if cuando la lista filtrada no contiene productos -->
      <div v-if="listaFiltrada.length === 0" class="empty">
        <!-- Texto destacado en negrita informando que no se encontraron coincidencias -->
        <strong>No se encontraron productos.</strong>
        <!-- Párrafo orientativo invitando al usuario a probar con otro término o categoría -->
        <p>Prueba con otro texto o selecciona una categoría diferente.</p>
      <!-- Cierre del contenedor de mensaje de catálogo vacío -->
      </div>

      <!-- Contenedor renderizado con v-else cuando la lista filtrada sí tiene productos para mostrar -->
      <div v-else class="grid">
        <!-- Componente hijo ProductoCard instanciado para cada producto con sus props y evento ver-detalle -->
        <ProductoCard v-for="producto in listaFiltrada" :key="producto.id" :producto="producto" @ver-detalle="verDetalle" />
      <!-- Cierre de la cuadrícula de tarjetas de productos -->
      </div>
    <!-- Cierre de la sección del catálogo -->
    </section>

    <!-- Contenedor con mensaje visual renderizado condicionalmente con v-if cuando el catálogo está oculto -->
    <div v-if="!mostrarCatalogo" class="hidden-msg">
      <!-- Párrafo explicativo indicando que el catálogo está oculto y cómo volver a mostrarlo -->
      <p>👁️ El catálogo se encuentra oculto. Presiona el botón "Mostrar catálogo" para volver a explorarlo.</p>
    <!-- Cierre del contenedor de mensaje de catálogo oculto -->
    </div>

    <!-- Componente modal para visualizar la información detallada del producto seleccionado -->
    <ProductoModal :producto="seleccionado" :visible="modalVisible" @close="cerrarModal" />

    <!-- Pie de página con créditos e información de la actividad académica -->
    <footer class="footer">
      <!-- Texto descriptivo de los créditos académicos, naturaleza demostrativa y región -->
      Actividad académica · Datos demostrativos · Región de Ñuble
    <!-- Cierre de la etiqueta del pie de página -->
    </footer>
  <!-- Cierre del contenedor semántico principal -->
  </main>
<!-- Cierre de la etiqueta del bloque de plantilla HTML -->
</template>

<!-- Bloque de estilos CSS scoped con alcance exclusivo para los elementos de este componente -->
<style scoped>
/* Regla para el contenedor general: define ancho máximo, centrado horizontal y espaciado interno */
.page { max-width: 1120px; margin: 0 auto; padding: 28px 20px 40px; }
/* Regla de estilos para la sección hero */
.hero {
  /* Margen inferior para separar la sección hero de la barra de herramientas */
  margin-bottom: 20px;
  /* Espaciado interno de 32 píxeles en todos los lados del banner */
  padding: 32px;
  /* Radio para bordes redondeados de 22 píxeles */
  border-radius: 22px;
  /* Color blanco para todos los textos contenidos en el hero */
  color: white;
  /* Fondo con degradado diagonal de 135 grados de azul oscuro a azul medio */
  background: linear-gradient(135deg, #0f3f76, #1d4ed8);
/* Cierre de la regla .hero */
}
/* Regla para el texto introductorio superior (eyebrow) con formato destacado en mayúsculas */
.eyebrow { margin: 0 0 8px; font-size: .8rem; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; opacity: .85; }
/* Regla para el título principal h1 dentro del hero con tamaño de fuente responsivo */
.hero h1 { margin: 0; font-size: clamp(2rem, 5vw, 3.3rem); }
/* Regla para el párrafo descriptivo del hero con ancho máximo y separación interlineal */
.hero__text { max-width: 760px; margin: 12px 0 0; line-height: 1.6; opacity: .92; }
/* Regla para la barra de herramientas que contiene los filtros del catálogo */
.toolbar {
  /* Disposición flexbox para alinear y distribuir los controles */
  display: flex;
  /* Permite el salto de línea de los elementos en pantallas angostas */
  flex-wrap: wrap;
  /* Espaciado de separación de 12 píxeles entre los controles */
  gap: 12px;
  /* Alinea los controles en la parte inferior del contenedor */
  align-items: end;
  /* Margen inferior para separar la barra del catálogo de productos */
  margin-bottom: 18px;
  /* Espaciado interno de 16 píxeles */
  padding: 16px;
  /* Borde delgado gris claro */
  border: 1px solid #e2e8f0;
  /* Bordes redondeados de 16 píxeles */
  border-radius: 16px;
  /* Fondo de color blanco */
  background: white;
/* Cierre de la regla .toolbar */
}
/* Regla para cada grupo de campo con diseño de cuadrícula y ancho mínimo */
.field { display: grid; gap: 6px; min-width: 190px; }
/* Regla para que el campo de búsqueda se expanda en el espacio disponible */
.field--grow { flex: 1 1 320px; }
/* Regla para las etiquetas de los campos con fuente en negrita y color gris azulado */
.field label { font-size: .82rem; font-weight: 800; color: #475569; }
/* Regla común para los elementos input y select dentro de los campos */
.field input, .field select {
  /* Ocupa el 100% del ancho del contenedor del campo */
  width: 100%;
  /* Espaciado interno cómodo para escritura y selección */
  padding: 10px 12px;
  /* Borde perimetral gris claro */
  border: 1px solid #cbd5e1;
  /* Bordes redondeados de 10 píxeles */
  border-radius: 10px;
  /* Fondo de color blanco */
  background: white;
/* Cierre de la regla .field input, .field select */
}
/* Regla para el botón de alternancia del catálogo con fondo oscuro y texto en negrita */
.toggle { padding: 10px 14px; border: 0; border-radius: 10px; background: #0f172a; color: white; font-weight: 700; }
/* Regla para la sección del catálogo estableciendo una altura mínima de 280 píxeles */
.catalogo { min-height: 280px; }
/* Regla para el encabezado del catálogo con distribución espacial en los extremos */
.catalogo__header { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin: 18px 0 12px; }
/* Regla para el título h2 dentro del encabezado del catálogo eliminando márgenes */
.catalogo__header h2 { margin: 0; }
/* Regla para el contador de resultados con color gris neutro y tamaño reducido */
.catalogo__header span { color: #64748b; font-size: .9rem; }
/* Regla para la cuadrícula responsiva de productos con una columna inicial en móviles */
.grid { display: grid; gap: 16px; grid-template-columns: repeat(1, minmax(0, 1fr)); }
/* Regla para la tarjeta de mensaje vacío con borde discontinuo y texto centrado */
.empty { padding: 32px; text-align: center; border: 1px dashed #94a3b8; border-radius: 14px; background: white; color: #475569; }
/* Regla para el pie de página con línea divisoria superior y texto centrado */
.footer { margin-top: 30px; padding-top: 18px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: .85rem; text-align: center; }

/* Regla de estilos para el mensaje visual cuando el catálogo se encuentra oculto */
.hidden-msg { padding: 24px; text-align: center; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; color: #334155; margin-top: 10px; }

/* Media query para pantallas medianas (640px o más) que organiza la cuadrícula en 2 columnas */
@media (min-width: 640px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
/* Media query para pantallas grandes (900px o más) que organiza la cuadrícula en 3 columnas */
@media (min-width: 900px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
/* Cierre de la etiqueta del bloque de estilos CSS */
</style>
