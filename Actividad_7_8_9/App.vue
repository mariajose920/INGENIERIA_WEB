<!-- Inicia el bloque de lógica y configuración en JavaScript del componente -->
<script setup>
// Importa el componente Navbar que representa la barra de navegación superior desde la carpeta de componentes
import Navbar from './components/Navbar.vue'
// Importa el componente Footer que representa el pie de página desde la carpeta de componentes
import Footer from './components/Footer.vue'
// Cierra el bloque de lógica de JavaScript
</script>

<!-- Inicia la plantilla visual que define la estructura HTML del componente -->
<template>
  <!-- Contenedor principal que envuelve toda la estructura visible de la aplicación -->
  <div class="app-layout">
    <!-- Muestra el componente de la barra de navegación en la parte superior -->
    <Navbar />
    
    <!-- Contenedor semántico principal donde se presentará el contenido central de cada pantalla -->
    <main class="main-content">
      <!-- Visor de rutas que detecta dinámicamente cuál página debe mostrarse según la dirección web actual -->
      <router-view v-slot="{ Component }">
        <!-- Componente de animación que aplica una transición visual suave al cambiar entre páginas -->
        <transition name="page-fade" mode="out-in">
          <!-- Renderiza dinámicamente el componente de la página activa correspondiente a la ruta actual -->
          <component :is="Component" />
        <!-- Cierre de la animación de transición entre páginas -->
        </transition>
      <!-- Cierre del visor de rutas -->
      </router-view>
    <!-- Cierre del contenedor de contenido principal -->
    </main>

    <!-- Muestra el componente de pie de página en la parte inferior -->
    <Footer />
  <!-- Cierre del contenedor principal de la aplicación -->
  </div>
<!-- Cierre de la plantilla visual del componente -->
</template>

<!-- Inicia la sección de estilos CSS para dar apariencia visual, colores y dimensiones a la página -->
<style>
/* Sección de reinicios globales y definición de tipografías */
/* Selector que define variables de diseño globales accesibles desde cualquier lugar del documento */
:root {
  /* Variable para el color azul principal de la aplicación */
  --primary: #2563eb;
  /* Variable para un tono azul más oscuro usado al interactuar con elementos */
  --primary-dark: #1d4ed8;
  /* Variable para el color oscuro del texto principal */
  --text-main: #0f172a;
  /* Variable para el color gris utilizado en textos secundarios o sutiles */
  --text-muted: #64748b;
  /* Variable para el color claro del fondo general de la aplicación */
  --bg-app: #f8fafc;
/* Cierre de la definición de variables globales */
}

/* Selector universal que aplica estas reglas a absolutamente todos los elementos HTML */
* {
  /* Configura el modelo de caja para que el tamaño total incluya el relleno y los bordes sin desbordar */
  box-sizing: border-box;
  /* Elimina el margen exterior predeterminado de todos los elementos */
  margin: 0;
  /* Elimina el relleno interior predeterminado de todos los elementos */
  padding: 0;
/* Cierre del selector universal */
}

/* Reglas de estilo para el cuerpo completo del documento HTML */
body {
  /* Establece la tipografía moderna que se usará para los textos en toda la aplicación */
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  /* Aplica el color de fondo general usando la variable definida anteriormente */
  background-color: var(--bg-app);
  /* Establece el color principal del texto usando la variable correspondiente */
  color: var(--text-main);
  /* Define la altura de cada línea de texto para que sea fácil y cómoda de leer */
  line-height: 1.5;
  /* Suaviza los bordes de las letras en navegadores basados en WebKit como Chrome o Safari */
  -webkit-font-smoothing: antialiased;
  /* Suaviza los bordes de las letras en navegadores basados en Firefox */
  -moz-osx-font-smoothing: grayscale;
/* Cierre de los estilos del cuerpo */
}

/* Reglas de estilo para la clase del contenedor principal de la aplicación */
.app-layout {
  /* Activa el modelo de caja flexible (Flexbox) para ordenar sus elementos fácilmente */
  display: flex;
  /* Ordena los elementos hijos en dirección vertical, uno debajo del otro */
  flex-direction: column;
  /* Establece que la altura mínima sea el 100% de la altura visible de la ventana del navegador */
  min-height: 100vh;
/* Cierre de los estilos del contenedor principal */
}

/* Reglas de estilo para el área central de contenido */
.main-content {
  /* Permite que esta sección crezca para ocupar todo el espacio vertical disponible, empujando el pie hacia abajo */
  flex: 1;
  /* Establece un ancho máximo de 1200 píxeles para que el contenido no se extienda demasiado en pantallas grandes */
  max-width: 1200px;
  /* Hace que el elemento ocupe el 100% del ancho disponible dentro de su límite */
  width: 100%;
  /* Centra automáticamente la sección de manera horizontal en la pantalla */
  margin: 0 auto;
  /* Aplica un espacio de relleno interno de 36 píxeles arriba y abajo, y 20 píxeles a los lados */
  padding: 36px 20px;
/* Cierre de los estilos del contenido central */
}

/* Reglas de estilo para las transiciones y animaciones al cambiar de página */
/* Aplica durante toda la animación mientras la nueva página entra */
.page-fade-enter-active,
/* Aplica durante toda la animación mientras la página anterior sale */
.page-fade-leave-active {
  /* Configura una animación suave de 0.2 segundos tanto para la transparencia como para el movimiento */
  transition: opacity 0.2s ease, transform 0.2s ease;
/* Cierre de la regla de animación activa */
}

/* Estado inicial de la nueva página antes de comenzar a entrar */
.page-fade-enter-from {
  /* Inicia completamente transparente e invisible */
  opacity: 0;
  /* Inicia desplazada 8 píxeles hacia abajo para luego subir suavemente */
  transform: translateY(8px);
/* Cierre del estado inicial de entrada */
}

/* Estado final de la página anterior cuando termina de salir */
.page-fade-leave-to {
  /* Termina completamente transparente al retirarse */
  opacity: 0;
  /* Se desplaza 8 píxeles hacia arriba mientras se desvanece */
  transform: translateY(-8px);
/* Cierre del estado final de salida */
}
/* Cierre de la sección de estilos CSS */
</style>
