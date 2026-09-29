<!-- Bloque de lógica y programación del componente en Vue 3 utilizando la sintaxis script setup -->
<script setup>
// Importa la función 'ref' de la biblioteca Vue para crear variables reactivas cuyos cambios se reflejan automáticamente en la pantalla
import { ref } from 'vue'
// Importa la imagen gráfica principal (hero) desde los recursos del proyecto para usarla en la vista
import heroImg from '../assets/hero.png'
// Importa el logotipo vectorial de Vite desde los recursos para mostrarlo como icono o imagen
import viteLogo from '../assets/vite.svg'
// Importa el logotipo vectorial del framework Vue desde los recursos para mostrarlo en la interfaz
import vueLogo from '../assets/vue.svg'

// Declara una variable reactiva llamada 'count' con valor inicial 0, que llevará la cuenta de las veces que se presiona el botón
const count = ref(0)
// Cierre del bloque de programación de JavaScript
</script>

<!-- Bloque de plantilla HTML con la estructura visual y los elementos visibles del componente -->
<template>
  <!-- Sección semántica central que agrupa las imágenes decorativas, el mensaje de bienvenida y el botón -->
  <section id="center">
    <!-- Contenedor con estilo 'hero' que agrupa y superpone las imágenes destacadas de la cabecera -->
    <div class="hero">
      <!-- Muestra la imagen base decorativa con su ruta dinámica, dimensiones fijas y descripción accesible -->
      <img :src="heroImg" class="base" width="170" height="179" alt="" />
      <!-- Muestra el logo de Vue vinculado dinámicamente con la variable vueLogo y su texto alternativo -->
      <img :src="vueLogo" class="framework" alt="Vue logo" />
      <!-- Muestra el logo de Vite vinculado dinámicamente con la variable viteLogo y su texto alternativo -->
      <img :src="viteLogo" class="vite" alt="Vite logo" />
    <!-- Cierre del contenedor de imágenes destacadas hero -->
    </div>
    <!-- Contenedor que agrupa los textos de bienvenida e instrucciones de desarrollo -->
    <div>
      <!-- Título de nivel 1 que da la bienvenida e invita a comenzar -->
      <h1>Get started</h1>
      <!-- Párrafo que indica la ruta del archivo que se debe editar, resaltando términos técnicos con la etiqueta code -->
      <p>Edit <code>src/App.vue</code> and save to test <code>HMR</code></p>
    <!-- Cierre del contenedor de textos de bienvenida -->
    </div>
    <!-- Botón interactivo que al recibir un clic suma 1 al valor de la variable reactiva count -->
    <button type="button" class="counter" @click="count++">
      <!-- Muestra en pantalla el texto 'Count is' junto al valor actual de la variable reactiva count -->
      Count is {{ count }}
    <!-- Cierre de la etiqueta del botón interactivo -->
    </button>
  <!-- Cierre de la sección central -->
  </section>

  <!-- Divisor visual decorativo con marcas lineales separadoras -->
  <div class="ticks"></div>

  <!-- Sección semántica que contiene los enlaces a recursos de aprendizaje y comunidades -->
  <section id="next-steps">
    <!-- Bloque informativo dedicado a la documentación técnica y guías oficiales -->
    <div id="docs">
      <!-- Icono vectorial SVG representativo de la documentación, oculto a tecnologías de asistencia para no interferir en la lectura -->
      <svg class="icon" role="presentation" aria-hidden="true">
        <!-- Inserta el símbolo gráfico del icono de documentación referenciando su identificador dentro del archivo de iconos -->
        <use href="/icons.svg#documentation-icon"></use>
      <!-- Cierre de la etiqueta svg del icono de documentación -->
      </svg>
      <!-- Título de nivel 2 para el apartado de documentación -->
      <h2>Documentation</h2>
      <!-- Párrafo introductorio que explica el objetivo de esta sección -->
      <p>Your questions, answered</p>
      <!-- Lista no ordenada que agrupa los enlaces a las diferentes documentaciones -->
      <ul>
        <!-- Elemento de lista correspondiente al enlace hacia la documentación de Vite -->
        <li>
          <!-- Enlace que dirige al sitio web de Vite y se abre en una nueva pestaña del navegador mediante target="_blank" -->
          <a href="https://vite.dev/" target="_blank">
            <!-- Icono pequeño con el logotipo de Vite dentro del enlace -->
            <img class="logo" :src="viteLogo" alt="" />
            <!-- Texto visible que invita a explorar la herramienta Vite -->
            Explore Vite
          <!-- Cierre del enlace hacia el sitio de Vite -->
          </a>
        <!-- Cierre del elemento de lista de Vite -->
        </li>
        <!-- Elemento de lista correspondiente al enlace hacia la documentación de Vue -->
        <li>
          <!-- Enlace que dirige a la página oficial de Vue.js y se abre en una nueva pestaña del navegador -->
          <a href="https://vuejs.org/" target="_blank">
            <!-- Icono pequeño con el logotipo de Vue estilizado como icono de botón -->
            <img class="button-icon" :src="vueLogo" alt="" />
            <!-- Texto visible que invita a aprender más sobre Vue -->
            Learn more
          <!-- Cierre del enlace hacia el sitio de Vue -->
          </a>
        <!-- Cierre del elemento de lista de Vue -->
        </li>
      <!-- Cierre de la lista de enlaces de documentación -->
      </ul>
    <!-- Cierre del bloque de documentación -->
    </div>
    <!-- Bloque informativo dedicado a las redes sociales y canales de la comunidad -->
    <div id="social">
      <!-- Icono vectorial SVG representativo de las redes sociales, marcado como elemento puramente decorativo -->
      <svg class="icon" role="presentation" aria-hidden="true">
        <!-- Inserta el símbolo gráfico del icono de comunidad desde el archivo externo de iconos -->
        <use href="/icons.svg#social-icon"></use>
      <!-- Cierre de la etiqueta svg del icono social -->
      </svg>
      <!-- Título de nivel 2 para la sección de conexión con la comunidad -->
      <h2>Connect with us</h2>
      <!-- Párrafo que invita a unirse a la comunidad de usuarios de Vite -->
      <p>Join the Vite community</p>
      <!-- Lista no ordenada con los enlaces a las plataformas sociales de la comunidad -->
      <ul>
        <!-- Elemento de lista para el enlace al repositorio de código en GitHub -->
        <li>
          <!-- Enlace externo que abre el perfil de Vite en GitHub en una nueva pestaña -->
          <a href="https://github.com/vitejs/vite" target="_blank">
            <!-- Icono vectorial SVG de GitHub decorativo -->
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <!-- Carga el diseño del icono de GitHub referenciado por su identificador en el archivo de iconos -->
              <use href="/icons.svg#github-icon"></use>
            <!-- Cierre de la etiqueta svg del icono de GitHub -->
            </svg>
            <!-- Texto visible que identifica el enlace a GitHub -->
            GitHub
          <!-- Cierre del enlace a GitHub -->
          </a>
        <!-- Cierre del elemento de lista de GitHub -->
        </li>
        <!-- Elemento de lista para el enlace al servidor de chat en Discord -->
        <li>
          <!-- Enlace externo que abre el servidor comunitario de Vite en Discord en una nueva pestaña -->
          <a href="https://chat.vite.dev/" target="_blank">
            <!-- Icono vectorial SVG de Discord decorativo -->
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <!-- Carga el diseño del icono de Discord referenciado por su identificador en el archivo de iconos -->
              <use href="/icons.svg#discord-icon"></use>
            <!-- Cierre de la etiqueta svg del icono de Discord -->
            </svg>
            <!-- Texto visible que identifica el enlace a Discord -->
            Discord
          <!-- Cierre del enlace a Discord -->
          </a>
        <!-- Cierre del elemento de lista de Discord -->
        </li>
        <!-- Elemento de lista para el enlace a la cuenta oficial en la plataforma X -->
        <li>
          <!-- Enlace externo que abre la cuenta oficial en X (antiguo Twitter) en una nueva pestaña -->
          <a href="https://x.com/vite_js" target="_blank">
            <!-- Icono vectorial SVG de la plataforma X decorativo -->
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <!-- Carga el diseño del icono de X referenciado por su identificador en el archivo de iconos -->
              <use href="/icons.svg#x-icon"></use>
            <!-- Cierre de la etiqueta svg del icono de X -->
            </svg>
            <!-- Texto visible que identifica el enlace a la red social X -->
            X.com
          <!-- Cierre del enlace a X.com -->
          </a>
        <!-- Cierre del elemento de lista de X.com -->
        </li>
        <!-- Elemento de lista para el enlace al perfil oficial en Bluesky -->
        <li>
          <!-- Enlace externo que abre la cuenta comunitaria en Bluesky en una nueva pestaña -->
          <a href="https://bsky.app/profile/vite.dev" target="_blank">
            <!-- Icono vectorial SVG de Bluesky decorativo -->
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <!-- Carga el diseño del icono de Bluesky referenciado por su identificador en el archivo de iconos -->
              <use href="/icons.svg#bluesky-icon"></use>
            <!-- Cierre de la etiqueta svg del icono de Bluesky -->
            </svg>
            <!-- Texto visible que identifica el enlace a Bluesky -->
            Bluesky
          <!-- Cierre del enlace a Bluesky -->
          </a>
        <!-- Cierre del elemento de lista de Bluesky -->
        </li>
      <!-- Cierre de la lista de enlaces a redes sociales -->
      </ul>
    <!-- Cierre del bloque de redes sociales -->
    </div>
  <!-- Cierre de la sección de siguientes pasos -->
  </section>

  <!-- Divisor visual decorativo con marcas lineales separadoras -->
  <div class="ticks"></div>
  <!-- Sección vacía que actúa como separador o espaciador inferior en el diseño -->
  <section id="spacer"></section>
<!-- Cierre del bloque de plantilla principal del componente -->
</template>
