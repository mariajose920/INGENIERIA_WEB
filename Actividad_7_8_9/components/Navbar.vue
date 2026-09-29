<!-- Define la sección de lógica y programación en JavaScript del componente con sintaxis Vue 3 Setup -->
<script setup>
// Importa la utilidad 'ref' desde Vue para crear variables reactivas que actualizan la interfaz al cambiar
import { ref } from 'vue'
// Importa el gestor 'useRouter' para controlar la navegación entre diferentes páginas de la aplicación
import { useRouter } from 'vue-router'
// Importa el almacén de datos de servicios para compartir información en toda la aplicación
import { useServiciosStore } from '../stores/useServiciosStore.js'

// Extrae el estado global de servicios proporcionado por el almacén
const { state } = useServiciosStore()
// Variable reactiva booleana que controla si el menú para celulares está visible (falso = cerrado)
const isMenuOpen = ref(false)
// Crea una instancia del enrutador para manipular la navegación web
const router = useRouter()

// Función para alternar el menú móvil: si está abierto lo cierra, y si está cerrado lo abre
function toggleMenu() {
  // Invierte el valor booleano actual (de verdadero a falso o viceversa)
  isMenuOpen.value = !isMenuOpen.value
// Finaliza la función toggleMenu
}

// Función que asegura que el menú móvil quede completamente cerrado
function closeMenu() {
  // Asigna el valor falso a la variable para ocultar el menú
  isMenuOpen.value = false
// Finaliza la función closeMenu
}
// Finaliza el bloque de lógica y programación
</script>

<!-- Sección visual (plantilla HTML) que define la estructura y elementos que se verán en pantalla -->
<template>
  <!-- Etiqueta semántica de cabecera principal que envuelve toda la barra de navegación superior -->
  <header class="navbar-wrapper">
    <!-- Contenedor centralizado que limita el ancho máximo y organiza el contenido -->
    <div class="nav-container">
      <!-- Enlace que redirige a la página de inicio ('/') y cierra el menú desplegable al hacer clic -->
      <router-link to="/" class="brand-logo" @click="closeMenu">
        <!-- Ícono decorativo con forma de rayo para representar la marca de tecnología -->
        <div class="logo-icon">⚡</div>
        <!-- Bloque contenedor de los textos del logotipo -->
        <div class="logo-text">
          <!-- Nombre principal de la marca comercial en texto destacado -->
          <span class="brand-title">NEXORA</span>
          <!-- Subtítulo descriptivo que indica la especialidad en Servicios TI -->
          <span class="brand-sub">SERVICIOS TI</span>
        <!-- Cierre del bloque de textos del logotipo -->
        </div>
      <!-- Cierre del enlace al inicio del logotipo -->
      </router-link>

      <!-- Botón de menú hamburguesa para teléfonos móviles que ejecuta toggleMenu al hacer clic -->
      <button class="menu-toggle" @click="toggleMenu" aria-label="Abrir menú">
        <!-- Primera barra horizontal del icono hamburguesa -->
        <span class="bar"></span>
        <!-- Segunda barra horizontal del icono hamburguesa -->
        <span class="bar"></span>
        <!-- Tercera barra horizontal del icono hamburguesa -->
        <span class="bar"></span>
      <!-- Cierre del botón de menú móvil -->
      </button>

      <!-- Contenedor de enlaces de navegación que agrega dinámicamente la clase 'open' cuando el menú está abierto -->
      <nav class="nav-links" :class="{ 'open': isMenuOpen }">
        <!-- Enlace de navegación hacia la ruta de Inicio que resalta cuando está activa y cierra el menú al hacer clic -->
        <router-link to="/" class="nav-item" active-class="active" @click="closeMenu">
          <!-- Texto del enlace con un ícono representativo de una casa -->
          🏠 Inicio
        <!-- Cierre del enlace hacia Inicio -->
        </router-link>
        <!-- Enlace de navegación hacia la página de Nosotros que se resalta al estar activa y cierra el menú al hacer clic -->
        <router-link to="/nosotros" class="nav-item" active-class="active" @click="closeMenu">
          <!-- Texto del enlace con un ícono representativo de equipo humano -->
          👥 Nosotros
        <!-- Cierre del enlace hacia Nosotros -->
        </router-link>
        <!-- Enlace de navegación hacia el catálogo de Servicios que se resalta y cierra el menú al hacer clic -->
        <router-link to="/servicios" class="nav-item" active-class="active" @click="closeMenu">
          <!-- Texto del enlace con un ícono de maletín de trabajo -->
          💼 Servicios
        <!-- Cierre del enlace hacia Servicios -->
        </router-link>
        <!-- Enlace estilo botón hacia la página de Cotización/Contacto con diseño visual destacado -->
        <router-link to="/contacto" class="nav-item nav-btn" active-class="active" @click="closeMenu">
          <!-- Texto del enlace con un ícono representativo de un sobre de carta -->
          ✉️ Cotizar / Contacto
        <!-- Cierre del enlace destacado hacia Contacto -->
        </router-link>
      <!-- Cierre del bloque de enlaces de navegación -->
      </nav>
    <!-- Cierre del contenedor central -->
    </div>
  <!-- Cierre de la cabecera principal -->
  </header>
<!-- Cierre de la sección visual de plantilla -->
</template>

<!-- Sección de estilos CSS aplicados exclusivamente a los elementos de este componente -->
<style scoped>
/* Estilos aplicados al contenedor envoltorio principal de la barra de navegación */
.navbar-wrapper {
  /* Establece un color de fondo azul petróleo muy oscuro casi opaco al 95% */
  background: rgba(15, 23, 42, 0.95);
  /* Aplica un efecto visual de vidrio esmerilado que difumina lo que pase por detrás */
  backdrop-filter: blur(12px);
  /* Fija la barra en la parte superior para que acompañe el desplazamiento del usuario */
  position: sticky;
  /* Posición cero píxeles respecto al borde superior de la ventana del navegador */
  top: 0;
  /* Índice de apilamiento alto para que la barra siempre quede por encima de otros contenidos */
  z-index: 1000;
  /* Línea divisoria muy delgada y semitransparente en la parte inferior */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  /* Sombra sutil oscura hacia abajo para dar sensación de profundidad y elevación */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
/* Finaliza la regla de estilos de navbar-wrapper */
}

/* Estilos para el contenedor central que alinea y agrupa el contenido interior */
.nav-container {
  /* Ancho máximo de 1200 píxeles para evitar que el contenido se estire de forma exagerada */
  max-width: 1200px;
  /* Centra horizontalmente el contenedor en la pantalla */
  margin: 0 auto;
  /* Espaciado interno de 14 píxeles arriba y abajo, y 20 píxeles a los lados */
  padding: 14px 20px;
  /* Activa el sistema de caja flexible (Flexbox) para distribuir los elementos en una fila */
  display: flex;
  /* Centra verticalmente todos los elementos que se encuentren dentro del contenedor */
  align-items: center;
  /* Distribuye los elementos separando el logo al extremo izquierdo y los enlaces al derecho */
  justify-content: space-between;
/* Finaliza la regla de estilos de nav-container */
}

/* Estilos aplicados al enlace que compone el logotipo y nombre de la empresa */
.brand-logo {
  /* Activa la caja flexible para poner el ícono y el texto en la misma línea */
  display: flex;
  /* Centra verticalmente el ícono con el texto */
  align-items: center;
  /* Espacio de separación de 12 píxeles entre el icono y el texto */
  gap: 12px;
  /* Quita la línea de subrayado predeterminada de los enlaces de internet */
  text-decoration: none;
  /* Establece el color de las letras en blanco */
  color: white;
/* Finaliza la regla de estilos de brand-logo */
}

/* Estilos de la caja que enmarca el icono gráfico del logotipo */
.logo-icon {
  /* Ancho fijo de 42 píxeles */
  width: 42px;
  /* Alto fijo de 42 píxeles para mantener una forma cuadrada */
  height: 42px;
  /* Fondo degradado moderno en ángulo que va de azul brillante a morado */
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  /* Curvatura de 10 píxeles en las cuatro esquinas */
  border-radius: 10px;
  /* Activa Flexbox para centrar el símbolo dentro del recuadro */
  display: flex;
  /* Alinea el símbolo verticalmente en el centro del cuadrado */
  align-items: center;
  /* Alinea el símbolo horizontalmente en el centro del cuadrado */
  justify-content: center;
  /* Tamaño de fuente más grande para que el emoji del rayo destaque */
  font-size: 1.4rem;
  /* Sombra azul suave alrededor del recuadro para darle un efecto luminoso */
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
/* Finaliza la regla de estilos de logo-icon */
}

/* Estilos del contenedor que agrupa el título y subtítulo de la marca */
.logo-text {
  /* Activa Flexbox para organizar los textos */
  display: flex;
  /* Coloca los textos en formato vertical, uno debajo del otro */
  flex-direction: column;
/* Finaliza la regla de estilos de logo-text */
}

/* Estilos aplicados al texto del título del logotipo */
.brand-title {
  /* Tamaño de fuente mediano-grande de 1.25rem */
  font-size: 1.25rem;
  /* Grosor de letra extra negrita para darle máxima presencia */
  font-weight: 800;
  /* Espaciado extra entre las letras para un estilo refinado */
  letter-spacing: 0.08em;
  /* Degradado horizontal de color blanco a azul celeste */
  background: linear-gradient(90deg, #ffffff, #93c5fd);
  /* Recorta el degradado del fondo para que tome la forma de las letras */
  -webkit-background-clip: text;
  /* Hace transparente el relleno del texto para mostrar el degradado de fondo */
  -webkit-text-fill-color: transparent;
/* Finaliza la regla de estilos de brand-title */
}

/* Estilos del texto secundario que acompaña al logotipo */
.brand-sub {
  /* Tamaño de letra pequeño y discreto de 0.68rem */
  font-size: 0.68rem;
  /* Espaciado amplio entre letras para un aspecto técnico y limpio */
  letter-spacing: 0.2em;
  /* Color gris azulado suave */
  color: #94a3b8;
  /* Grosor de texto semi-negrita para asegurar legibilidad */
  font-weight: 600;
/* Finaliza la regla de estilos de brand-sub */
}

/* Estilos de la barra de enlaces que agrupa los botones de navegación */
.nav-links {
  /* Activa Flexbox para acomodar todos los enlaces en fila horizontal */
  display: flex;
  /* Centra verticalmente todos los enlaces */
  align-items: center;
  /* Deja una separación uniforme de 16 píxeles entre cada opción */
  gap: 16px;
/* Finaliza la regla de estilos de nav-links */
}

/* Estilos compartidos por cada uno de los enlaces individuales de navegación */
.nav-item {
  /* Color de texto gris claro para contraste con el fondo oscuro */
  color: #cbd5e1;
  /* Remueve el subrayado típico de los hipervínculos */
  text-decoration: none;
  /* Grosor de letra intermedio (medio) */
  font-weight: 500;
  /* Tamaño de texto cómodo para lectura (0.95rem) */
  font-size: 0.95rem;
  /* Espaciado interior de 8 píxeles vertical y 16 píxeles horizontal para crear área cliqueable */
  padding: 8px 16px;
  /* Esquinas redondeadas a 8 píxeles */
  border-radius: 8px;
  /* Transición fluida de 0.25 segundos para efectos visuales */
  transition: all 0.25s ease;
/* Finaliza la regla de estilos de nav-item */
}

/* Estilos que se activan cuando el usuario pasa el cursor del ratón sobre un enlace */
.nav-item:hover {
  /* Cambia el color del texto a blanco brillante */
  color: #ffffff;
  /* Agrega un fondo blanco tenue semitransparente como realce */
  background: rgba(255, 255, 255, 0.08);
/* Finaliza la regla de estilos hover de nav-item */
}

/* Estilos aplicados automáticamente a la opción del menú que corresponde a la página actual */
.nav-item.active {
  /* Color de texto blanco sólido */
  color: #ffffff;
  /* Fondo azul vibrante para destacar la página en la que nos encontramos */
  background: #2563eb;
  /* Letra en negrita marcada */
  font-weight: 600;
  /* Sombra azul suave que hace resaltar el botón activo */
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
/* Finaliza la regla de estilos active de nav-item */
}

/* Estilos especiales para el botón de llamada a la acción (Cotizar / Contacto) */
.nav-btn {
  /* Fondo degradado llamativo en diagonal de azul a morado */
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  /* Fuerza el color del texto a blanco ignorando otras reglas */
  color: white !important;
  /* Grosor de letra en negrita */
  font-weight: 600;
  /* Redondeo de bordes a 8 píxeles */
  border-radius: 8px;
  /* Sombra de relieve en color azul morado */
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
/* Finaliza la regla de estilos de nav-btn */
}

/* Efecto al pasar el cursor sobre el botón de llamada a la acción */
.nav-btn:hover {
  /* Desplaza ligeramente el botón hacia arriba en 1 píxel simulando un relieve dinámico */
  transform: translateY(-1px);
  /* Intensifica la sombra para acentuar el efecto de flotación */
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45);
/* Finaliza la regla de estilos hover de nav-btn */
}

/* Estilos para el botón hamburguesa en computadoras de escritorio */
.menu-toggle {
  /* Se oculta por defecto en pantallas grandes de computadoras */
  display: none;
  /* Fondo completamente transparente */
  background: transparent;
  /* Sin bordes decorativos */
  border: none;
  /* Cambia el cursor del ratón a una mano con dedo índice indicando interactividad */
  cursor: pointer;
  /* Coloca las tres barritas del icono en disposición vertical */
  flex-direction: column;
  /* Separación de 5 píxeles entre cada barrita */
  gap: 5px;
  /* Espaciado interno de 6 píxeles */
  padding: 6px;
/* Finaliza la regla de estilos de menu-toggle */
}

/* Estilos para las tres barritas horizontales dentro del botón hamburguesa */
.menu-toggle .bar {
  /* Ancho de 24 píxeles para cada barrita */
  width: 24px;
  /* Alto o grosor de 2 píxeles */
  height: 2px;
  /* Color blanco para contrastar sobre el fondo oscuro */
  background: white;
  /* Bordes redondeados en los extremos */
  border-radius: 2px;
  /* Transición suave de 0.3 segundos para cualquier animación */
  transition: all 0.3s ease;
/* Finaliza la regla de estilos de menu-toggle .bar */
}

/* Reglas de diseño adaptable para pantallas de celulares y tablets de hasta 768 píxeles de ancho */
@media (max-width: 768px) {
  /* Estilos para activar el botón hamburguesa en dispositivos móviles */
  .menu-toggle {
    /* Muestra el botón usando el sistema Flexbox */
    display: flex;
  /* Finaliza las reglas móviles para menu-toggle */
  }

  /* Modifica la apariencia del menú de enlaces para convertirse en panel desplegable */
  .nav-links {
    /* Posiciona el menú de forma fija debajo de la barra de navegación */
    position: absolute;
    /* Se ubica al 100% de la altura, justo debajo de la cabecera */
    top: 100%;
    /* Se pega al borde izquierdo de la pantalla */
    left: 0;
    /* Se extiende hasta el borde derecho de la pantalla */
    right: 0;
    /* Fondo azul oscuro opaco para cubrir el contenido que quede debajo */
    background: #0f172a;
    /* Cambia la orientación de los enlaces a vertical en columna */
    flex-direction: column;
    /* Relleno interno generoso de 20 píxeles */
    padding: 20px;
    /* Separación de 12 píxeles entre opciones del menú */
    gap: 12px;
    /* Borde inferior sutil para delimitar el final del menú */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    /* Desplaza el menú hacia arriba fuera de la pantalla cuando está cerrado */
    transform: translateY(-150%);
    /* Hace el menú invisible cuando no está desplegado */
    opacity: 0;
    /* Desactiva la interacción con clics mientras esté oculto */
    pointer-events: none;
    /* Animación fluida de 0.3 segundos al abrir o cerrar */
    transition: all 0.3s ease;
  /* Finaliza las reglas móviles para nav-links */
  }

  /* Estilos cuando el menú móvil recibe la clase 'open' al ser abierto por el usuario */
  .nav-links.open {
    /* Regresa el menú a su posición normal visible en pantalla */
    transform: translateY(0);
    /* Hace el menú 100% visible */
    opacity: 1;
    /* Habilita la interacción con clics en los enlaces */
    pointer-events: auto;
  /* Finaliza las reglas para nav-links.open */
  }

  /* Estilos aplicados a cada enlace dentro de la vista móvil */
  .nav-item {
    /* Hace que cada enlace ocupe todo el ancho disponible del contenedor */
    width: 100%;
    /* Centra el texto horizontalmente dentro del botón */
    text-align: center;
  /* Finaliza las reglas móviles para nav-item */
  }
/* Finaliza el bloque de reglas responsive para pantallas pequeñas */
}
/* Finaliza el bloque de estilos del componente */
</style>
