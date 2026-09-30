<!-- // Inicio del bloque de código JavaScript con la sintaxis 'script setup' de Vue -->
<script setup>
// Importa la función 'ref' de la biblioteca Vue para crear datos reactivos que actualizan la pantalla al cambiar
import { ref } from 'vue'
// Importa el componente visual 'Proveedores' para administrar los proveedores de textos escolares
import Proveedores from './components/Proveedores.vue'
// Importa el componente visual 'Libros' para administrar el catálogo de textos escolares
import Libros from './components/Libros.vue'
// Importa el componente visual 'Recepciones' para administrar el registro y control de recepciones de libros
import Recepciones from './components/Recepciones.vue'

// Declara la variable reactiva 'tab' con valor inicial 'recepciones' para controlar qué pestaña está activa
const tab = ref('recepciones')
// Fin del bloque de código JavaScript
</script>

<!-- // Inicio de la plantilla visual HTML donde se define la estructura visual del componente -->
<template>
  <!-- // Caja contenedora principal que centra y limita el ancho de todo el contenido de la página -->
  <div class="container">
    <!-- // Encabezado de la aplicación que contiene el título principal y su descripción -->
    <header class="app-header">
      <!-- // Título principal de primer nivel con ícono representativo de libros -->
      <h1>📚 Recepción de Textos Escolares</h1>
      <!-- // Párrafo con texto secundario que describe el propósito del sistema de gestión -->
      <p class="subtitle">Sistema de Control y Gestión de Entregas</p>
    <!-- // Cierre del encabezado de la aplicación -->
    </header>

    <!-- // Barra de navegación que agrupa los botones para alternar entre las diferentes pestañas -->
    <nav class="nav-tabs">
      <!-- // Botón de pestaña que se marca activo si 'tab' es 'recepciones' y al hacer clic cambia la vista a 'recepciones' -->
      <button :class="{ active: tab === 'recepciones' }" @click="tab = 'recepciones'">
        <!-- // Texto e ícono que se muestran en el botón de la pestaña Recepciones -->
        📥 Recepciones
      <!-- // Cierre del botón de la pestaña Recepciones -->
      </button>
      <!-- // Botón de pestaña que se marca activo si 'tab' es 'libros' y al hacer clic cambia la vista a 'libros' -->
      <button :class="{ active: tab === 'libros' }" @click="tab = 'libros'">
        <!-- // Texto e ícono que se muestran en el botón de la pestaña Libros -->
        📖 Libros
      <!-- // Cierre del botón de la pestaña Libros -->
      </button>
      <!-- // Botón de pestaña que se marca activo si 'tab' es 'proveedores' y al hacer clic cambia la vista a 'proveedores' -->
      <button :class="{ active: tab === 'proveedores' }" @click="tab = 'proveedores'">
        <!-- // Texto e ícono que se muestran en el botón de la pestaña Proveedores -->
        🏢 Proveedores
      <!-- // Cierre del botón de la pestaña Proveedores -->
      </button>
    <!-- // Cierre de la barra de navegación de pestañas -->
    </nav>

    <!-- // Panel principal de contenido donde se carga la vista seleccionada por el usuario -->
    <main class="content-panel">
      <!-- // Renderiza el componente Recepciones solo si la pestaña actual seleccionada es 'recepciones' -->
      <Recepciones v-if="tab === 'recepciones'" />
      <!-- // Renderiza el componente Libros solo si la pestaña actual seleccionada es 'libros' -->
      <Libros v-if="tab === 'libros'" />
      <!-- // Renderiza el componente Proveedores solo si la pestaña actual seleccionada es 'proveedores' -->
      <Proveedores v-if="tab === 'proveedores'" />
    <!-- // Cierre del panel principal de contenido -->
    </main>
  <!-- // Cierre de la caja contenedora principal -->
  </div>
<!-- // Cierre de la plantilla visual HTML -->
</template>

<!-- // Inicio del bloque de estilos visuales CSS que aplican únicamente a este componente (scoped) -->
<style scoped>
/* // Regla de estilos para el contenedor principal de la aplicación */
.container {
  /* // Ancho máximo permitido para el contenido (1080 píxeles) para que no se extienda demasiado en pantallas anchas */
  max-width: 1080px;
  /* // Centra el contenedor horizontalmente en la pantalla con márgenes automáticos a los lados */
  margin: 0 auto;
  /* // Espaciado interno de 24px arriba/abajo y 16px a los lados para separar el contenido del borde */
  padding: 24px 16px;
  /* // Tipografía del sistema para mostrar un texto limpio, legible y nativo en cualquier sistema operativo */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  /* // Color de texto general en un tono azul pizarra oscuro para una buena lectura */
  color: #1e293b;
/* // Cierre de la regla del contenedor principal */
}

/* // Regla de estilos para el encabezado superior de la aplicación */
.app-header {
  /* // Margen inferior de 24 píxeles para separar el encabezado de las pestañas de navegación */
  margin-bottom: 24px;
  /* // Línea divisoria inferior continua de 2 píxeles de grosor en color gris claro */
  border-bottom: 2px solid #e2e8f0;
  /* // Espaciado interno inferior de 16 píxeles para separar el texto de la línea divisoria */
  padding-bottom: 16px;
/* // Cierre de la regla del encabezado */
}

/* // Regla de estilos para el título principal (h1) dentro del encabezado */
.app-header h1 {
  /* // Elimina los márgenes superior y laterales y deja 6 píxeles abajo para separar del subtítulo */
  margin: 0 0 6px 0;
  /* // Tamaño de fuente grande (2rem equivale al doble del tamaño base) para destacar el título */
  font-size: 2rem;
  /* // Color de texto azul marino muy oscuro para resaltar la jerarquía del título */
  color: #0f172a;
/* // Cierre de la regla del título principal */
}

/* // Regla de estilos para el subtítulo informativo */
.subtitle {
  /* // Quita los márgenes por defecto para mantener el texto compacto junto al título */
  margin: 0;
  /* // Color gris azulado intermedio para indicar que es un texto descriptivo secundario */
  color: #64748b;
  /* // Tamaño de fuente ligeramente menor (0.95rem) para complementar al título sin competir */
  font-size: 0.95rem;
/* // Cierre de la regla del subtítulo */
}

/* // Regla de estilos para el contenedor de botones de pestañas */
.nav-tabs {
  /* // Distribuye los botones en una fila horizontal usando la disposición flexible (flexbox) */
  display: flex;
  /* // Espacio de separación constante de 10 píxeles entre cada botón de pestaña */
  gap: 10px;
  /* // Margen inferior de 24 píxeles para separar la botonera del panel de contenido inferior */
  margin-bottom: 24px;
/* // Cierre de la regla del contenedor de pestañas */
}

/* // Regla de estilos base para los botones de las pestañas */
.nav-tabs button {
  /* // Relleno interno de 10 píxeles vertical y 20 píxeles horizontal para dar tamaño al botón */
  padding: 10px 20px;
  /* // Bordes redondeados con radio de 8 píxeles para una apariencia moderna y suave */
  border-radius: 8px;
  /* // Borde continuo de 1 píxel de grosor en tono gris claro */
  border: 1px solid #cbd5e1;
  /* // Color de fondo grisáceo muy claro cuando la pestaña no está seleccionada */
  background: #f8fafc;
  /* // Color del texto del botón en gris oscuro para buena visibilidad */
  color: #334155;
  /* // Grosor de fuente seminegrita (600) para hacer el texto más definido y legible */
  font-weight: 600;
  /* // Tamaño de fuente de 0.95rem proporcionado al botón */
  font-size: 0.95rem;
  /* // Transforma el cursor en una manito interactiva al pasar sobre el botón */
  cursor: pointer;
  /* // Animación de transición suave de 0.2 segundos para los cambios de color y estado */
  transition: all 0.2s ease;
/* // Cierre de la regla base de los botones de pestañas */
}

/* // Regla de estilos cuando el usuario pasa el puntero del mouse sobre un botón de pestaña */
.nav-tabs button:hover {
  /* // Oscurece ligeramente el fondo a gris claro para indicar que el botón es interactivo */
  background: #e2e8f0;
  /* // Oscurece el borde del botón para reforzar el efecto visual al pasar el cursor */
  border-color: #94a3b8;
/* // Cierre de la regla hover de los botones */
}

/* // Regla de estilos para el botón de la pestaña que está actualmente seleccionada (activa) */
.nav-tabs button.active {
  /* // Color de fondo azul intenso para destacar visualmente cuál sección está abierta */
  background: #2563eb;
  /* // Color blanco puro para el texto e ícono logrando máximo contraste con el fondo azul */
  color: #ffffff;
  /* // Borde azul un tono más oscuro para delimitar nítidamente el botón activo */
  border-color: #1d4ed8;
  /* // Sombra azul sutil debajo del botón activo para generar un efecto de elevación */
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.25);
/* // Cierre de la regla de la pestaña activa */
}

/* // Regla de estilos para el panel contenedor del contenido principal */
.content-panel {
  /* // Color de fondo blanco puro para hacer resaltar las tablas y formularios interiores */
  background: #ffffff;
  /* // Esquinas redondeadas con radio de 12 píxeles para enmarcar el contenido en una tarjeta */
  border-radius: 12px;
  /* // Espaciado interno de 24 píxeles para que los elementos internos no toquen los bordes */
  padding: 24px;
  /* // Doble sombra sutil para dar sensación de profundidad y relieve a la tarjeta sobre la página */
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
  /* // Borde exterior fino de 1 píxel en color gris claro para definir los límites de la caja */
  border: 1px solid #e2e8f0;
/* // Cierre de la regla del panel de contenido */
}
/* // Cierre del bloque de estilos CSS */
</style>
