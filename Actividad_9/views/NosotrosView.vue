<!-- Bloque de script con Composition API (setup) para la lógica reactiva del componente -->
<script setup>
// Importa la función del almacén global (store) de servicios para acceder a los datos compartidos de la empresa
import { useServiciosStore } from '../stores/useServiciosStore.js'

// Extrae el objeto reactivo de estado ('state') que contiene la información institucional de la empresa
const { state } = useServiciosStore()
// Cierre del bloque de script de configuración
</script>

<!-- Bloque de plantilla HTML con la estructura visual y de presentación de la vista 'Nosotros' -->
<template>
  <!-- Contenedor principal que envuelve todos los elementos de la página 'Nosotros' -->
  <div class="nosotros-page">
    <!-- Sección de encabezado principal tipo héroe con el título y la presentación de la empresa -->
    <section class="nosotros-hero">
      <!-- Etiqueta decorativa destacada en forma de píldora que introduce la sección del equipo -->
      <span class="badge-tag">Conozca Nuestro Equipo</span>
      <!-- Título principal de nivel 1 que presenta la identidad y visión de la empresa -->
      <h1>Quiénes Somos y Nuestra Visión</h1>
      <!-- Párrafo descriptivo de cabecera con tipografía destacada -->
      <p class="hero-desc">
        <!-- Texto explicativo que muestra en negrita el nombre de la empresa obtenido dinámicamente desde el estado global -->
        Somos <strong>{{ state.empresa.nombre }}</strong>, una empresa nacida en la Región de Ñuble con la convicción de que la tecnología de calidad debe estar al alcance de todas las organizaciones que buscan liderar su sector.
      <!-- Cierre del párrafo de descripción principal -->
      </p>
    <!-- Cierre de la sección de encabezado principal (hero) -->
    </section>

    <!-- Sección en cuadrícula que organiza las tarjetas de Misión y Visión institucional -->
    <section class="mision-vision-grid">
      <!-- Tarjeta contenedora con fondo blanco y sombra para la Misión -->
      <div class="card-mv">
        <!-- Contenedor que muestra un emoticón de diana como ícono representativo de la misión -->
        <div class="mv-icon">🎯</div>
        <!-- Título de nivel 2 para el encabezado de Nuestra Misión -->
        <h2>Nuestra Misión</h2>
        <!-- Párrafo explicativo del propósito operativo y compromiso de la empresa -->
        <p>
          <!-- Texto descriptivo de la misión de la empresa -->
          Entregar soluciones tecnológicas robustas, accesibles y seguras que optimicen la gestión operativa de nuestros clientes, facilitando su transición digital y potenciando su competitividad a través del desarrollo ágil y el soporte especializado.
        <!-- Cierre del párrafo de la misión -->
        </p>
      <!-- Cierre de la tarjeta de misión -->
      </div>

      <!-- Tarjeta contenedora con fondo blanco y sombra para la Visión -->
      <div class="card-mv">
        <!-- Contenedor que muestra un emoticón de telescopio como ícono representativo de la visión a futuro -->
        <div class="mv-icon">🔭</div>
        <!-- Título de nivel 2 para el encabezado de Nuestra Visión -->
        <h2>Nuestra Visión</h2>
        <!-- Párrafo explicativo del objetivo y metas a largo plazo de la organización -->
        <p>
          <!-- Texto descriptivo de la visión corporativa -->
          Consolidarnos como el referente tecnológico líder en la zona centro-sur de Chile, reconocidos por nuestra excelencia técnica, innovación continua y por establecer relaciones de confianza duraderas con cada empresa con la que colaboramos.
        <!-- Cierre del párrafo de la visión -->
        </p>
      <!-- Cierre de la tarjeta de visión -->
      </div>
    <!-- Cierre de la sección de cuadrícula de misión y visión -->
    </section>

    <!-- Sección dedicada a exponer los valores corporativos de la organización -->
    <section class="valores-section">
      <!-- Contenedor centrado para el título y la etiqueta de la sección de valores -->
      <div class="section-title">
        <!-- Etiqueta decorativa destacando los pilares fundamentales de la organización -->
        <span class="badge-tag">Pilares Fundamentales</span>
        <!-- Título de nivel 2 que presenta los valores corporativos -->
        <h2>Nuestros Valores Corporativos</h2>
      <!-- Cierre del contenedor de título de sección -->
      </div>

      <!-- Cuadrícula responsiva que distribuye las tarjetas individuales de valores -->
      <div class="valores-grid">
        <!-- Primera tarjeta de valor: Innovación Práctica -->
        <div class="valor-card">
          <!-- Número identificador estilizado en color azul para el primer valor -->
          <span class="v-num">01</span>
          <!-- Título de nivel 3 con el nombre del valor corporativo -->
          <h3>Innovación Práctica</h3>
          <!-- Párrafo explicativo que describe en qué consiste la innovación práctica -->
          <p>Adoptamos las tecnologías más modernas y las adaptamos a la realidad concreta de su negocio.</p>
        <!-- Cierre de la primera tarjeta de valor -->
        </div>
        <!-- Segunda tarjeta de valor: Transparencia Total -->
        <div class="valor-card">
          <!-- Número identificador estilizado en color azul para el segundo valor -->
          <span class="v-num">02</span>
          <!-- Título de nivel 3 con el nombre del valor corporativo -->
          <h3>Transparencia Total</h3>
          <!-- Párrafo explicativo que describe la claridad en presupuestos y comunicación -->
          <p>Presupuestos claros, metodologías abiertas y comunicación fluida en cada etapa del servicio.</p>
        <!-- Cierre de la segunda tarjeta de valor -->
        </div>
        <!-- Tercera tarjeta de valor: Compromiso y Cercanía -->
        <div class="valor-card">
          <!-- Número identificador estilizado en color azul para el tercer valor -->
          <span class="v-num">03</span>
          <!-- Título de nivel 3 con el nombre del valor corporativo -->
          <h3>Compromiso y Cercanía</h3>
          <!-- Párrafo explicativo que destaca el soporte local y la atención directa -->
          <p>Atención directa y personalizada, con soporte local disponible cuando más lo necesita.</p>
        <!-- Cierre de la tercera tarjeta de valor -->
        </div>
        <!-- Cuarta tarjeta de valor: Calidad y Seguridad -->
        <div class="valor-card">
          <!-- Número identificador estilizado en color azul para el cuarto valor -->
          <span class="v-num">04</span>
          <!-- Título de nivel 3 con el nombre del valor corporativo -->
          <h3>Calidad y Seguridad</h3>
          <!-- Párrafo explicativo que resalta los estándares de ciberseguridad y buenas prácticas -->
          <p>Aplicamos estrictos estándares de ciberseguridad y buenas prácticas en cada entrega de código o infraestructura.</p>
        <!-- Cierre de la cuarta tarjeta de valor -->
        </div>
      <!-- Cierre de la cuadrícula de valores -->
      </div>
    <!-- Cierre de la sección de valores corporativos -->
    </section>

    <!-- Sección de banner oscuro que destaca la presencia física regional y alcance nacional -->
    <section class="location-banner">
      <!-- Contenedor del contenido textual de ubicación -->
      <div class="loc-text">
        <!-- Título de nivel 2 sobre el alcance territorial de la empresa -->
        <h2>Presencia Regional con Alcance Nacional</h2>
        <!-- Párrafo explicativo sobre la base geográfica y modalidades de atención -->
        <p>
          <!-- Muestra de manera reactiva la ubicación de la empresa extraída del estado global -->
          Con base en <strong>{{ state.empresa.ubicacion }}</strong>, atendemos clientes en Chillán, San Carlos, Bulnes, Quirihue y todo Chile mediante modalidades remotas e híbridas.
        <!-- Cierre del párrafo explicativo -->
        </p>
        <!-- Contenedor flexible para mostrar las etiquetas de cobertura y servicio -->
        <div class="loc-tags">
          <!-- Etiqueta que identifica la presencia local en la ciudad de Chillán -->
          <span class="tag">📍 Chillán</span>
          <!-- Etiqueta que destaca la cobertura remota en todo el territorio chileno -->
          <span class="tag">🌐 Todo Chile</span>
          <!-- Etiqueta que destaca el tiempo ágil de respuesta al cliente -->
          <span class="tag">⏱️ Atención Inmediata</span>
        <!-- Cierre del contenedor de etiquetas de ubicación -->
        </div>
      <!-- Cierre del contenedor de texto de ubicación -->
      </div>
      <!-- Contenedor para el botón de llamada a la acción -->
      <div class="loc-action">
        <!-- Enlace de enrutamiento que dirige hacia la vista de contacto sin recargar el navegador -->
        <router-link to="/contacto" class="btn-primary-mv">
          <!-- Texto visible del botón que invita a iniciar comunicación -->
          Conversar con Nuestro Equipo
        <!-- Cierre del enlace del enrutador -->
        </router-link>
      <!-- Cierre del contenedor de llamada a la acción -->
      </div>
    <!-- Cierre de la sección de banner de ubicación -->
    </section>
  <!-- Cierre del contenedor principal de la página -->
  </div>
<!-- Cierre de la plantilla de Vue -->
</template>

<!-- Bloque de estilos CSS encapsulados con alcance exclusivo para este componente (scoped) -->
<style scoped>
/* Regla de estilos para el contenedor principal de la página (.nosotros-page) */
.nosotros-page {
  /* Establece un esquema de diseño flexible (Flexbox) */
  display: flex;
  /* Organiza los elementos internos en una columna vertical */
  flex-direction: column;
  /* Define una separación de 60 píxeles entre cada sección vertical */
  gap: 60px;
/* Fin de estilos del contenedor de la página */
}

/* Regla de estilos para la cabecera principal tipo héroe */
.nosotros-hero {
  /* Centra el texto horizontalmente dentro del contenedor */
  text-align: center;
  /* Establece un ancho máximo de 800 píxeles para mejorar la lectura */
  max-width: 800px;
  /* Centra el contenedor en el eje horizontal automáticamente */
  margin: 0 auto;
  /* Define espaciado interno: 30px arriba, 20px a los lados y 0 abajo */
  padding: 30px 20px 0;
/* Fin de estilos de la cabecera héroe */
}

/* Regla de estilos para la insignia o etiqueta decorativa superior */
.badge-tag {
  /* Permite que el elemento se comporte como bloque en línea */
  display: inline-block;
  /* Aplica un color de texto azul brillante */
  color: #2563eb;
  /* Define un tamaño de texto reducido de 0.8rem */
  font-size: 0.8rem;
  /* Aplica grosor de fuente en negrita (700) */
  font-weight: 700;
  /* Convierte todo el texto en letras mayúsculas */
  text-transform: uppercase;
  /* Agrega espacio entre las letras para un diseño estilizado */
  letter-spacing: 0.1em;
  /* Define un color de fondo azul claro suave */
  background: #dbeafe;
  /* Agrega relleno interno: 4 píxeles arriba/abajo y 12 píxeles a los lados */
  padding: 4px 12px;
  /* Redondea los bordes completamente en forma de píldora */
  border-radius: 20px;
  /* Agrega un margen inferior de 12 píxeles para separar del título siguiente */
  margin-bottom: 12px;
/* Fin de estilos de la insignia */
}

/* Regla de estilos para el título principal (h1) de la sección héroe */
.nosotros-hero h1 {
  /* Establece un tamaño de fuente de 2.6rem de gran impacto visual */
  font-size: 2.6rem;
  /* Define un color de texto azul oscuro para alta legibilidad */
  color: #0f172a;
  /* Aplica márgenes: 0 arriba, 0 a los lados y 16 píxeles abajo */
  margin: 0 0 16px 0;
/* Fin de estilos del título principal */
}

/* Regla de estilos para el párrafo descriptivo de la sección héroe */
.hero-desc {
  /* Tamaño de fuente cómodo de 1.15rem */
  font-size: 1.15rem;
  /* Altura de línea amplia de 1.7 para facilitar la lectura del párrafo */
  line-height: 1.7;
  /* Color de texto gris azulado para contraste equilibrado */
  color: #64748b;
/* Fin de estilos del párrafo descriptivo */
}

/* Regla de estilos para la cuadrícula de Misión y Visión (MV Grid) */
.mision-vision-grid {
  /* Establece un esquema de cuadrícula (CSS Grid) */
  display: grid;
  /* Crea columnas responsivas automáticas con un ancho mínimo de 320 píxeles */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  /* Define un espacio de separación de 30 píxeles entre las tarjetas */
  gap: 30px;
/* Fin de estilos de la cuadrícula de misión y visión */
}

/* Regla de estilos para cada tarjeta de Misión y Visión (.card-mv) */
.card-mv {
  /* Fondo blanco puro para resaltar sobre el fondo de la página */
  background: #ffffff;
  /* Borde sólido delgado de 1 píxel gris claro */
  border: 1px solid #e2e8f0;
  /* Bordes redondeados con radio de 20 píxeles */
  border-radius: 20px;
  /* Relleno interno generoso de 36 píxeles en todos los lados */
  padding: 36px;
  /* Sombra suave para generar efecto de elevación y profundidad */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  /* Posicionamiento relativo para soporte de transformaciones visuales */
  position: relative;
  /* Transición fluida de 0.25 segundos para efectos interactivos */
  transition: transform 0.25s ease;
/* Fin de estilos de la tarjeta de misión y visión */
}

/* Efecto visual al pasar el cursor (hover) sobre la tarjeta de misión o visión */
.card-mv:hover {
  /* Desplaza la tarjeta 4 píxeles hacia arriba generando un efecto flotante */
  transform: translateY(-4px);
  /* Cambia el color del borde a un azul claro sutil */
  border-color: #93c5fd;
/* Fin del efecto hover de la tarjeta */
}

/* Regla de estilos para el ícono emoji de misión y visión (.mv-icon) */
.mv-icon {
  /* Tamaño de fuente grande de 3rem para destacar el emoticón */
  font-size: 3rem;
  /* Margen inferior de 16 píxeles para separar del título */
  margin-bottom: 16px;
/* Fin de estilos del ícono */
}

/* Regla de estilos para el encabezado (h2) de la tarjeta de misión y visión */
.card-mv h2 {
  /* Tamaño de fuente de 1.5rem */
  font-size: 1.5rem;
  /* Color de texto azul oscuro para contraste */
  color: #0f172a;
  /* Margen inferior de 12 píxeles antes del texto descriptivo */
  margin-bottom: 12px;
/* Fin de estilos del encabezado de la tarjeta */
}

/* Regla de estilos para el párrafo explicativo dentro de la tarjeta de misión y visión */
.card-mv p {
  /* Color de texto gris oscuro legible */
  color: #475569;
  /* Tamaño de fuente estándar de 1rem */
  font-size: 1rem;
  /* Altura de línea amplia de 1.7 para lectura fluida */
  line-height: 1.7;
/* Fin de estilos del párrafo de la tarjeta */
}

/* Regla de estilos para el contenedor del título de la sección de valores */
.section-title {
  /* Alinea el texto al centro */
  text-align: center;
  /* Margen inferior de 36 píxeles para separar de las tarjetas de valores */
  margin-bottom: 36px;
/* Fin de estilos del contenedor de título */
}

/* Regla de estilos para el título (h2) de la sección de valores corporativos */
.section-title h2 {
  /* Tamaño de fuente de 2rem */
  font-size: 2rem;
  /* Color de texto azul oscuro */
  color: #0f172a;
  /* Margen superior de 8 píxeles respecto a la etiqueta superior */
  margin-top: 8px;
/* Fin de estilos del título de valores */
}

/* Regla de estilos para la cuadrícula contenedora de valores corporativos */
.valores-grid {
  /* Utiliza esquema de cuadrícula (CSS Grid) */
  display: grid;
  /* Genera columnas responsivas con ancho mínimo de 240 píxeles por tarjeta */
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  /* Espacio de separación de 20 píxeles entre las tarjetas de valores */
  gap: 20px;
/* Fin de estilos de la cuadrícula de valores */
}

/* Regla de estilos para cada tarjeta individual de valor (.valor-card) */
.valor-card {
  /* Fondo gris claro suave */
  background: #f8fafc;
  /* Espaciado interno de 24 píxeles */
  padding: 24px;
  /* Bordes redondeados con radio de 14 píxeles */
  border-radius: 14px;
  /* Borde delgado de 1 píxel gris claro */
  border: 1px solid #e2e8f0;
  /* Transición suave de 0.2 segundos para cambios de color de fondo */
  transition: background-color 0.2s;
/* Fin de estilos de la tarjeta de valor */
}

/* Efecto al pasar el cursor (hover) sobre una tarjeta de valor */
.valor-card:hover {
  /* Cambia el color de fondo a blanco puro */
  background: #ffffff;
  /* Oscurece el borde sutilmente para destacarlo */
  border-color: #cbd5e1;
/* Fin del efecto hover de la tarjeta de valor */
}

/* Regla de estilos para el número distintivo del valor (.v-num) */
.v-num {
  /* Tamaño de fuente destacado de 1.5rem */
  font-size: 1.5rem;
  /* Grosor de texto extra negrita (800) */
  font-weight: 800;
  /* Color azul corporativo llamativo */
  color: #3b82f6;
  /* Se muestra como bloque para ocupar su propia línea completa */
  display: block;
  /* Margen inferior de 8 píxeles para separar del título del valor */
  margin-bottom: 8px;
/* Fin de estilos del número del valor */
}

/* Regla de estilos para el título (h3) dentro de la tarjeta de valor */
.valor-card h3 {
  /* Tamaño de fuente de 1.1rem */
  font-size: 1.1rem;
  /* Color de texto azul oscuro */
  color: #0f172a;
  /* Margen inferior de 8 píxeles */
  margin-bottom: 8px;
/* Fin de estilos del título del valor */
}

/* Regla de estilos para el párrafo explicativo del valor */
.valor-card p {
  /* Color de texto gris intermedio */
  color: #64748b;
  /* Tamaño de texto de 0.9rem */
  font-size: 0.9rem;
  /* Altura de línea de 1.55 para balance visual */
  line-height: 1.55;
/* Fin de estilos del párrafo del valor */
}

/* Regla de estilos para el banner de ubicación y presencia territorial (.location-banner) */
.location-banner {
  /* Fondo azul oscuro profundo tipo noche (#0f172a) */
  background: #0f172a;
  /* Esquinas redondeadas pronunciadas con radio de 20 píxeles */
  border-radius: 20px;
  /* Relleno interno amplio de 40 píxeles */
  padding: 40px;
  /* Color de texto blanco para alto contraste sobre fondo oscuro */
  color: white;
  /* Disposición en esquema flexible (Flexbox) */
  display: flex;
  /* Distribuye los elementos separándolos a los extremos */
  justify-content: space-between;
  /* Alinea los elementos verticalmente al centro */
  align-items: center;
  /* Espacio de separación de 30 píxeles entre texto y botón */
  gap: 30px;
  /* Permite que los elementos se envuelvan a la siguiente línea en pantallas móviles */
  flex-wrap: wrap;
/* Fin de estilos del banner de ubicación */
}

/* Regla de estilos para el bloque de texto del banner de ubicación */
.loc-text {
  /* Ancho máximo de 600 píxeles para mantener líneas de lectura cómodas */
  max-width: 600px;
/* Fin de estilos del bloque de texto de ubicación */
}

/* Regla de estilos para el título (h2) del banner de ubicación */
.loc-text h2 {
  /* Tamaño de fuente de 1.7rem */
  font-size: 1.7rem;
  /* Margen inferior de 10 píxeles */
  margin-bottom: 10px;
/* Fin de estilos del título del banner */
}

/* Regla de estilos para el párrafo dentro del banner de ubicación */
.loc-text p {
  /* Color de texto gris claro legible sobre el fondo oscuro */
  color: #cbd5e1;
  /* Altura de línea de 1.6 */
  line-height: 1.6;
  /* Margen inferior de 16 píxeles antes de las etiquetas */
  margin-bottom: 16px;
/* Fin de estilos del párrafo del banner */
}

/* Regla de estilos para el contenedor de etiquetas de ubicación (.loc-tags) */
.loc-tags {
  /* Disposición flexible en fila */
  display: flex;
  /* Espaciado de 10 píxeles entre cada etiqueta */
  gap: 10px;
  /* Permite que las etiquetas pasen a la siguiente línea si el ancho es reducido */
  flex-wrap: wrap;
/* Fin de estilos del contenedor de etiquetas */
}

/* Regla de estilos para cada etiqueta individual de ubicación (.loc-tags .tag) */
.loc-tags .tag {
  /* Fondo blanco translúcido al 10% de opacidad para estilo moderno */
  background: rgba(255, 255, 255, 0.1);
  /* Relleno interno: 6 píxeles vertical y 14 píxeles horizontal */
  padding: 6px 14px;
  /* Bordes completamente redondeados en forma de pastilla */
  border-radius: 20px;
  /* Tamaño de fuente pequeño de 0.85rem */
  font-size: 0.85rem;
  /* Peso de fuente seminegrita (600) */
  font-weight: 600;
/* Fin de estilos de la etiqueta individual */
}

/* Regla de estilos para el botón de llamada a la acción (.btn-primary-mv) */
.btn-primary-mv {
  /* Espaciado interno: 14 píxeles vertical y 28 píxeles horizontal para un clic accesible */
  padding: 14px 28px;
  /* Color de fondo azul vibrante */
  background: #2563eb;
  /* Color de texto blanco puro */
  color: white;
  /* Remueve el subrayado típico de los hipervínculos */
  text-decoration: none;
  /* Bordes redondeados con radio de 12 píxeles */
  border-radius: 12px;
  /* Peso de fuente en negrita (700) */
  font-weight: 700;
  /* Impide que el texto del botón se divida en varias líneas */
  white-space: nowrap;
  /* Transición fluida de 0.2 segundos para todas las propiedades visuales */
  transition: all 0.2s;
/* Fin de estilos del botón principal */
}

/* Efecto al pasar el cursor (hover) sobre el botón de acción */
.btn-primary-mv:hover {
  /* Oscurece el color de fondo a un tono azul más intenso */
  background: #1d4ed8;
  /* Eleva el botón 2 píxeles hacia arriba generando efecto tridimensional */
  transform: translateY(-2px);
/* Fin del efecto hover del botón principal */
}
/* Fin del bloque de estilos del componente */
</style>
