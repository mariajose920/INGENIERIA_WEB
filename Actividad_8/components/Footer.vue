<!-- Bloque de código JavaScript con Composition API para la lógica del componente -->
<script setup>
// Importa la tienda o almacén de datos de servicios para acceder a la información de la empresa
import { useServiciosStore } from '../stores/useServiciosStore.js'

// Extrae el estado reactivo con los datos globales de la empresa desde la tienda
const { state } = useServiciosStore()
// Obtiene el año actual del sistema dinámicamente para el aviso de derechos de autor
const year = new Date().getFullYear()
// Fin del bloque de lógica en JavaScript
</script>

<!-- Bloque de plantilla HTML que estructura visualmente el pie de página de la aplicación -->
<template>
  <!-- Etiqueta semántica de pie de página con su clase de estilo principal -->
  <footer class="footer-wrapper">
    <!-- Contenedor central que organiza y distribuye las tres columnas del pie de página -->
    <div class="footer-content">
      <!-- Primera columna destinada a la identidad, eslogan y ubicación de la empresa -->
      <div class="footer-col brand-col">
        <!-- Contenedor flexible que alinea el ícono de la marca junto con su nombre -->
        <div class="footer-brand">
          <!-- Ícono representativo de energía o rayo que acompaña a la marca -->
          <span class="icon">⚡</span>
          <!-- Título que muestra dinámicamente el nombre de la empresa obtenido del estado -->
          <h3>{{ state.empresa.nombre }}</h3>
        <!-- Cierre del contenedor de la marca -->
        </div>
        <!-- Párrafo que muestra el lema o descripción corta de la empresa -->
        <p class="brand-desc">{{ state.empresa.slogan }}</p>
        <!-- Párrafo que muestra la ubicación física de la empresa acompañada de un ícono de chincheta -->
        <p class="location-tag">📍 {{ state.empresa.ubicacion }}</p>
      <!-- Cierre de la primera columna de la marca -->
      </div>

      <!-- Segunda columna que agrupa los enlaces de navegación rápida por el sitio web -->
      <div class="footer-col links-col">
        <!-- Título de sección para los enlaces de navegación interna -->
        <h4>Navegación Rápida</h4>
        <!-- Lista desordenada que agrupa los accesos directos del menú -->
        <ul>
          <!-- Elemento de lista con enlace para ir a la página de Inicio -->
          <li><router-link to="/">Inicio</router-link></li>
          <!-- Elemento de lista con enlace para ir a la página Quiénes Somos -->
          <li><router-link to="/nosotros">Quiénes Somos</router-link></li>
          <!-- Elemento de lista con enlace para ir al Catálogo de Servicios -->
          <li><router-link to="/servicios">Catálogo de Servicios</router-link></li>
          <!-- Elemento de lista con enlace para ir al formulario de Cotizaciones y Contacto -->
          <li><router-link to="/contacto">Cotizaciones & Contacto</router-link></li>
        <!-- Cierre de la lista de enlaces -->
        </ul>
      <!-- Cierre de la segunda columna de enlaces -->
      </div>

      <!-- Tercera columna que contiene los canales de atención y contacto directo -->
      <div class="footer-col contact-col">
        <!-- Título de sección para la información de contacto -->
        <h4>Contacto Directo</h4>
        <!-- Párrafo que muestra la dirección de correo electrónico obtenida dinámicamente -->
        <p><strong>Email:</strong> {{ state.empresa.email }}</p>
        <!-- Párrafo que muestra el número telefónico de contacto de la empresa -->
        <p><strong>Teléfono:</strong> {{ state.empresa.telefono }}</p>
        <!-- Párrafo que muestra los horarios de atención al cliente -->
        <p><strong>Horario:</strong> {{ state.empresa.horario }}</p>
      <!-- Cierre de la tercera columna de contacto -->
      </div>
    <!-- Cierre del contenedor principal de columnas del pie de página -->
    </div>

    <!-- Barra inferior separada visualmente para los derechos de autor y créditos -->
    <div class="footer-bottom">
      <!-- Contenedor con ancho delimitado que alinea los textos legales y créditos -->
      <div class="bottom-container">
        <!-- Párrafo con el texto de derechos reservados mostrando dinámicamente el año y nombre de la empresa -->
        <p>© {{ year }} {{ state.empresa.nombre }} — Todos los derechos reservados.</p>
        <!-- Párrafo con distintivo que menciona las tecnologías con las que fue desarrollada la aplicación -->
        <p class="dev-badge">Desarrollado con Vue 3 & Vite</p>
      <!-- Cierre del contenedor alineado -->
      </div>
    <!-- Cierre de la barra inferior del pie de página -->
    </div>
  <!-- Cierre de la etiqueta semántica de pie de página -->
  </footer>
<!-- Cierre de la plantilla HTML -->
</template>

<!-- Bloque de estilos CSS encapsulados con alcance exclusivo para este componente -->
<style scoped>
/* Regla de estilos para el contenedor exterior de todo el pie de página */
.footer-wrapper {
  /* Establece un color de fondo azul muy oscuro */
  background: #0f172a;
  /* Define el color del texto general en tono gris azulado claro */
  color: #94a3b8;
  /* Añade una separación externa de 60 píxeles hacia arriba respecto al contenido anterior */
  margin-top: 60px;
  /* Agrega una línea divisoria sutil en la parte superior con transparencia blanca */
  border-top: 1px solid rgba(255, 255, 255, 0.08);
/* Cierre de estilos para el contenedor exterior */
}

/* Regla de estilos para la cuadrícula que distribuye el contenido de las columnas */
.footer-content {
  /* Limita el ancho máximo del contenido a 1200 píxeles en pantallas grandes */
  max-width: 1200px;
  /* Centra horizontalmente el contenedor en la pantalla */
  margin: 0 auto;
  /* Asigna espaciado interno: 50px arriba, 20px a los lados y 30px abajo */
  padding: 50px 20px 30px;
  /* Activa el diseño en cuadrícula (CSS Grid) para ordenar las columnas */
  display: grid;
  /* Distribuye el espacio en 3 columnas proporcionales: 2 partes, 1 parte y 1.5 partes */
  grid-template-columns: 2fr 1fr 1.5fr;
  /* Deja una separación de 40 píxeles entre cada una de las columnas */
  gap: 40px;
/* Cierre de estilos para el contenido de columnas */
}

/* Regla responsiva para adaptar el diseño en pantallas pequeñas o celulares (hasta 768 píxeles de ancho) */
@media (max-width: 768px) {
  /* Modifica la distribución de las columnas en pantallas móviles */
  .footer-content {
    /* Cambia a una sola columna vertical apilando todos los bloques uno tras otro */
    grid-template-columns: 1fr;
    /* Reduce la separación entre los bloques apilados a 30 píxeles */
    gap: 30px;
  /* Cierre de la regla adaptativa de la cuadrícula */
  }
/* Cierre de la regla de consulta de medios */
}

/* Regla de estilos para el encabezado de la marca con su ícono y nombre */
.footer-brand {
  /* Aplica un diseño flexible en línea para ubicar los elementos lado a lado */
  display: flex;
  /* Alinea verticalmente al centro el ícono y el texto */
  align-items: center;
  /* Establece una distancia de 10 píxeles entre el ícono y el nombre */
  gap: 10px;
  /* Añade un margen de 12 píxeles hacia abajo */
  margin-bottom: 12px;
/* Cierre de estilos para la marca */
}

/* Regla de estilos para el ícono gráfico de la marca */
.footer-brand .icon {
  /* Aumenta el tamaño del ícono a 1.5 veces el tamaño de texto base */
  font-size: 1.5rem;
/* Cierre de estilos del ícono */
}

/* Regla de estilos para el título h3 que contiene el nombre de la empresa */
.footer-brand h3 {
  /* Establece el color del texto en blanco puro para darle máxima visibilidad */
  color: white;
  /* Elimina los márgenes predeterminados del título para un mejor ajuste */
  margin: 0;
  /* Configura el tamaño del texto a 1.25 veces el tamaño de texto base */
  font-size: 1.25rem;
/* Cierre de estilos del título del nombre de empresa */
}

/* Regla de estilos para el párrafo con la descripción o lema de la empresa */
.brand-desc {
  /* Configura un tamaño de fuente de 0.95 rem para lectura cómoda */
  font-size: 0.95rem;
  /* Establece la altura entre líneas en 1.6 para mejorar la legibilidad del texto */
  line-height: 1.6;
  /* Define el color del texto en gris azulado suave */
  color: #94a3b8;
  /* Añade una separación hacia abajo de 12 píxeles */
  margin-bottom: 12px;
/* Cierre de estilos de la descripción de la marca */
}

/* Regla de estilos para la etiqueta que muestra la ubicación geográfica */
.location-tag {
  /* Aplica un tamaño de texto ligeramente menor de 0.9 rem */
  font-size: 0.9rem;
  /* Utiliza un tono azul claro para destacar la información de ubicación */
  color: #60a5fa;
/* Cierre de estilos de la etiqueta de ubicación */
}

/* Regla de estilos para los títulos de cada columna del pie de página */
.footer-col h4 {
  /* Asigna color blanco al texto para resaltarlo como encabezado */
  color: white;
  /* Quita el margen superior predeterminado del encabezado */
  margin-top: 0;
  /* Añade un margen inferior de 16 píxeles para separar del contenido siguiente */
  margin-bottom: 16px;
  /* Ajusta el tamaño de la fuente a 1.05 rem */
  font-size: 1.05rem;
  /* Habilita el posicionamiento relativo para anclar la línea decorativa inferior */
  position: relative;
  /* Deja un espacio interno de 8 píxeles en la parte inferior para la línea decorativa */
  padding-bottom: 8px;
/* Cierre de estilos de los títulos de columna */
}

/* Regla de pseudoelemento que genera una barra decorativa azul debajo del título de columna */
.footer-col h4::after {
  /* Requerido para crear el pseudoelemento visual sin contenido textual */
  content: '';
  /* Posiciona la barrita decorativa en relación exacta con el encabezado */
  position: absolute;
  /* La alinea al borde inferior del título */
  bottom: 0;
  /* La alinea al borde izquierdo del título */
  left: 0;
  /* Establece el ancho fijo de la barrita decorativa en 36 píxeles */
  width: 36px;
  /* Define el grosor o altura de la barrita en 2 píxeles */
  height: 2px;
  /* Asigna un color de fondo azul vibrante a la línea decorativa */
  background: #3b82f6;
  /* Redondea los extremos de la barrita decorativa con un radio de 2 píxeles */
  border-radius: 2px;
/* Cierre de estilos de la línea decorativa */
}

/* Regla de estilos para la lista de enlaces dentro de las columnas */
.footer-col ul {
  /* Elimina los puntos o viñetas predeterminadas de la lista */
  list-style: none;
  /* Quita el espaciado interior por defecto del navegador */
  padding: 0;
  /* Quita el margen exterior por defecto del navegador */
  margin: 0;
  /* Aplica diseño flexible para organizar los enlaces verticalmente */
  display: flex;
  /* Orienta los elementos en una sola columna vertical */
  flex-direction: column;
  /* Añade una separación uniforme de 10 píxeles entre cada enlace */
  gap: 10px;
/* Cierre de estilos de la lista */
}

/* Regla de estilos para los enlaces de texto dentro de la lista */
.footer-col ul li a {
  /* Aplica un color gris claro al texto del enlace */
  color: #cbd5e1;
  /* Elimina el subrayado predeterminado de los hipervínculos */
  text-decoration: none;
  /* Establece un tamaño de letra adecuado de 0.92 rem */
  font-size: 0.92rem;
  /* Suaviza la transición de color durante 0.2 segundos al pasar el cursor */
  transition: color 0.2s;
/* Cierre de estilos de los enlaces */
}

/* Regla para el efecto interactivo al pasar el cursor sobre los enlaces de la lista */
.footer-col ul li a:hover {
  /* Cambia el color del texto a azul claro cuando el usuario pasa el mouse por encima */
  color: #60a5fa;
/* Cierre del efecto interactivo de los enlaces */
}

/* Regla de estilos para los párrafos dentro de la columna de contacto */
.contact-col p {
  /* Añade margen vertical de 8 píxeles y elimina el margen lateral */
  margin: 8px 0;
  /* Configura el tamaño de texto en 0.92 rem */
  font-size: 0.92rem;
  /* Establece la separación entre líneas de texto en 1.5 para una lectura clara */
  line-height: 1.5;
/* Cierre de estilos de los párrafos de contacto */
}

/* Regla de estilos para las etiquetas en negrita dentro de la columna de contacto */
.contact-col strong {
  /* Destaca el texto en negrita con un tono gris casi blanco */
  color: #e2e8f0;
/* Cierre de estilos del texto en negrita */
}

/* Regla de estilos para la barra inferior del pie de página */
.footer-bottom {
  /* Añade una línea horizontal divisoria muy tenue en la parte superior */
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  /* Agrega un espaciado interno vertical de 20 píxeles arriba y abajo */
  padding: 20px 0;
/* Cierre de estilos de la barra inferior */
}

/* Regla de estilos para el contenedor que agrupa los textos de la barra inferior */
.bottom-container {
  /* Limita el ancho máximo del contenedor a 1200 píxeles */
  max-width: 1200px;
  /* Centra horizontalmente el contenedor en la pantalla */
  margin: 0 auto;
  /* Aplica un relleno interior lateral de 20 píxeles */
  padding: 0 20px;
  /* Aplica el modelo de caja flexible para posicionar sus elementos internos */
  display: flex;
  /* Separa los elementos a los extremos opuestos: izquierda y derecha */
  justify-content: space-between;
  /* Alinea verticalmente los elementos al centro */
  align-items: center;
  /* Establece un tamaño de fuente compacto de 0.85 rem */
  font-size: 0.85rem;
  /* Permite que los elementos se acomoden en una nueva línea si la pantalla es angosta */
  flex-wrap: wrap;
  /* Define una separación de 10 píxeles en caso de que los elementos queden juntos */
  gap: 10px;
/* Cierre de estilos del contenedor inferior */
}

/* Regla de estilos para la insignia o distintivo de desarrollo */
.dev-badge {
  /* Asigna un color celeste distintivo al texto informativo de tecnologías */
  color: #38bdf8;
  /* Configura un grosor de tipografía semi-negrita (500) */
  font-weight: 500;
/* Cierre de estilos del distintivo */
}
/* Fin del bloque de estilos */
</style>
