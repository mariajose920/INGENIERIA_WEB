<!-- Bloque de código JavaScript con sintaxis Setup de Vue 3 Composition API -->
<script setup>
// Importa la función 'computed' de Vue para crear valores calculados automáticos basados en datos reactivos
import { computed } from 'vue'
// Importa 'useRouter' de Vue Router para permitir la navegación programática entre páginas
import { useRouter } from 'vue-router'
// Importa la tienda o almacén de datos (store) de servicios para acceder al estado global de la aplicación
import { useServiciosStore } from '../stores/useServiciosStore.js'
// Importa el componente hijo 'ServicioCard' para mostrar la tarjeta visual de cada servicio
import ServicioCard from '../components/ServicioCard.vue'

// Inicializa la instancia del enrutador para poder redirigir al usuario mediante código
const router = useRouter()
// Obtiene el estado reactivo global 'state' y la acción 'seleccionarServicio' desde la tienda
const { state, seleccionarServicio } = useServiciosStore()

// Crea una propiedad computada que calcula y mantiene la lista de servicios filtrados que están marcados como destacados
const serviciosDestacados = computed(() =>
  // Filtra el arreglo de servicios dejando únicamente aquellos cuya propiedad 'destacado' sea verdadera (true)
  state.servicios.filter(s => s.destacado)
)

// Define la función manejadora que se activa cuando el usuario pulsa para seleccionar un servicio específico
function onSeleccionarServicio(servicio) {
  // Invoca la función de la tienda para guardar el servicio seleccionado en el estado global
  seleccionarServicio(servicio)
  // Redirige al usuario de manera automática hacia la página de contacto (/contacto)
  router.push('/contacto')
}
// Cierre del bloque de script JavaScript
</script>

<!-- Bloque de la plantilla visual (HTML estructurado con Vue) que se muestra en pantalla -->
<template>
  <!-- Contenedor principal que envuelve todos los elementos de la página de inicio -->
  <div class="inicio-page">
    <!-- Sección de presentación destacada inicial de la página (Hero Section) -->
    <section class="hero-section">
      <!-- Contenedor que agrupa y centra el contenido textual y botones del hero -->
      <div class="hero-content">
        <!-- Insignia visual decorativa que resalta la propuesta de valor y ubicación geográfica -->
        <div class="hero-badge">🚀 Soluciones TI de Nueva Generación en Ñuble</div>
        <!-- Encabezado principal de nivel 1 con el mensaje clave de bienvenida -->
        <h1 class="hero-title">
          <!-- Texto del título principal enfocado en la transformación digital -->
          Impulsamos la transformación digital de tu empresa con tecnología de vanguardia
        <!-- Cierre de la etiqueta de encabezado principal h1 -->
        </h1>
        <!-- Párrafo descriptivo con información general de los servicios de la empresa -->
        <p class="hero-subtitle">
          <!-- Texto descriptivo que interpola dinámicamente el nombre de la empresa desde el estado global -->
          En <strong>{{ state.empresa.nombre }}</strong> ofrecemos consultoría, desarrollo de software, ciberseguridad y soporte técnico especializado para garantizar el éxito y la continuidad de sus operaciones.
        <!-- Cierre del párrafo descriptivo -->
        </p>
        <!-- Contenedor de botones de interacción y llamada a la acción -->
        <div class="hero-actions">
          <!-- Enlace de navegación estilizado como botón primario hacia la vista de servicios -->
          <router-link to="/servicios" class="btn-hero-primary">
            <!-- Icono y texto visible del botón para ver el catálogo de servicios -->
            🔍 Explorar Servicios
          <!-- Cierre del enlace hacia servicios -->
          </router-link>
          <!-- Enlace de navegación secundario hacia el formulario de contacto para cotizar -->
          <router-link to="/contacto" class="btn-hero-secondary">
            <!-- Icono y texto visible del botón para pedir cotización -->
            💬 Solicitar Cotización
          <!-- Cierre del enlace hacia contacto -->
          </router-link>
        <!-- Cierre del contenedor de botones de acción -->
        </div>

        <!-- Contenedor horizontal que exhibe las estadísticas y métricas clave de la empresa -->
        <div class="hero-stats">
          <!-- Elemento individual que representa la métrica de proyectos entregados -->
          <div class="stat-item">
            <!-- Número o cifra cuantificable destacada de proyectos completados -->
            <span class="stat-number">+120</span>
            <!-- Etiqueta explicativa que acompaña y describe la cifra numérica -->
            <span class="stat-label">Proyectos Entregados</span>
          <!-- Cierre del elemento de estadística de proyectos -->
          </div>
          <!-- Divisor visual vertical para separar estéticamente los datos estadísticos -->
          <div class="stat-divider"></div>
          <!-- Elemento individual que representa la métrica de disponibilidad operativa -->
          <div class="stat-item">
            <!-- Porcentaje destacado que demuestra alta confiabilidad y tiempo de actividad -->
            <span class="stat-number">99.8%</span>
            <!-- Etiqueta explicativa de disponibilidad del servicio -->
            <span class="stat-label">Uptime & Disponibilidad</span>
          <!-- Cierre del elemento de estadística de disponibilidad -->
          </div>
          <!-- Divisor visual vertical entre la segunda y la tercera estadística -->
          <div class="stat-divider"></div>
          <!-- Elemento individual que representa la métrica de cobertura y atención -->
          <div class="stat-item">
            <!-- Cifra que indica atención continua 24 horas y 7 días a la semana -->
            <span class="stat-number">24/7</span>
            <!-- Etiqueta descriptiva del servicio de monitoreo y soporte continuo -->
            <span class="stat-label">Soporte y Monitoreo</span>
          <!-- Cierre del elemento de estadística de soporte -->
          </div>
        <!-- Cierre del contenedor de estadísticas destacadas -->
        </div>
      <!-- Cierre del contenedor de contenido principal del hero -->
      </div>
    <!-- Cierre de la sección Hero -->
    </section>

    <!-- Sección que expone las razones y beneficios de elegir los servicios de la empresa -->
    <section class="features-section">
      <!-- Encabezado explicativo que introduce la sección de características -->
      <div class="section-header">
        <!-- Pequeño distintivo en texto superior que contextualiza el bloque -->
        <span class="section-tag">¿Por qué elegirnos?</span>
        <!-- Título secundario h2 que resalta el compromiso y la calidad técnica -->
        <h2>Excelencia técnica y compromiso regional</h2>
        <!-- Párrafo resumen que complementa el título del encabezado -->
        <p>Soluciones diseñadas a la medida de los desafíos del ecosistema productivo actual.</p>
      <!-- Cierre del encabezado de la sección -->
      </div>

      <!-- Cuadrícula adaptable para distribuir las tarjetas de ventajas competitivas -->
      <div class="features-grid">
        <!-- Tarjeta individual de beneficio: Agilidad y Escalabilidad -->
        <div class="feature-card">
          <!-- Icono visual representativo de velocidad o energía -->
          <div class="feat-icon">⚡</div>
          <!-- Título que nombra la primera característica clave -->
          <h3>Agilidad y Escalabilidad</h3>
          <!-- Texto explicativo que detalla en qué consiste la agilidad y escalabilidad -->
          <p>Implementamos metodologías ágiles y arquitecturas modernas para que su plataforma crezca al ritmo de su negocio.</p>
        <!-- Cierre de la primera tarjeta de características -->
        </div>

        <!-- Tarjeta individual de beneficio: Seguridad Integral -->
        <div class="feature-card">
          <!-- Icono visual representativo de escudo y protección de datos -->
          <div class="feat-icon">🛡️</div>
          <!-- Título que nombra la segunda característica clave -->
          <h3>Seguridad Integral</h3>
          <!-- Texto explicativo que describe el compromiso con la ciberseguridad -->
          <p>Priorizamos la protección y privacidad de sus datos mediante estándares internacionales de ciberseguridad.</p>
        <!-- Cierre de la segunda tarjeta de características -->
        </div>

        <!-- Tarjeta individual de beneficio: Acompañamiento Continuo -->
        <div class="feature-card">
          <!-- Icono visual representativo de alianza y trabajo colaborativo -->
          <div class="feat-icon">🤝</div>
          <!-- Título que nombra la tercera característica clave -->
          <h3>Acompañamiento Continuo</h3>
          <!-- Texto explicativo sobre el soporte constante y asesoría que se ofrece -->
          <p>No solo desarrollamos software; entregamos soporte técnico continuo, capacitación y asesoría estratégica.</p>
        <!-- Cierre de la tercera tarjeta de características -->
        </div>
      <!-- Cierre de la cuadrícula de características -->
      </div>
    <!-- Cierre de la sección de ventajas -->
    </section>

    <!-- Sección dedicada a exhibir una muestra de los servicios más importantes -->
    <section class="featured-services-section">
      <!-- Encabezado informativo para la sección de servicios destacados -->
      <div class="section-header">
        <!-- Distintivo superior que clasifica la sección como parte de la oferta -->
        <span class="section-tag">Nuestra Oferta</span>
        <!-- Título secundario h2 que anuncia los servicios destacados -->
        <h2>Servicios Destacados</h2>
        <!-- Párrafo que invita a explorar las principales opciones disponibles -->
        <p>Conozca algunas de nuestras principales soluciones tecnológicas.</p>
      <!-- Cierre del encabezado de servicios destacados -->
      </div>

      <!-- Cuadrícula para mostrar las tarjetas de los servicios seleccionados -->
      <div class="services-grid">
        <!-- Componente personalizado ServicioCard que se repite por cada servicio destacado -->
        <!-- Directiva v-for: Recorre la lista de servicios destacados asignando cada uno a la variable temporal 's' -->
        <!-- Atributo reactivo :key: Proporciona a Vue un identificador único para rastrear cada tarjeta eficientemente -->
        <!-- Atributo reactivo :servicio: Pasa los datos del servicio 's' hacia las propiedades del componente hijo -->
        <!-- Atributo reactivo :es-seleccionado: Evalúa si el identificador del servicio coincide con el seleccionado actualmente en el estado -->
        <!-- Escucha de evento @seleccionar-servicio: Llama al método onSeleccionarServicio cuando el usuario hace clic en la tarjeta -->
        <ServicioCard
          v-for="s in serviciosDestacados"
          :key="s.id"
          :servicio="s"
          :es-seleccionado="state.servicioSeleccionado?.id === s.id"
          @seleccionar-servicio="onSeleccionarServicio"
        />
      <!-- Cierre de la cuadrícula de tarjetas de servicios -->
      </div>

      <!-- Contenedor centrado para el enlace que da acceso al catálogo global de servicios -->
      <div class="view-all-box">
        <!-- Enlace con formato de botón para redirigir a la página completa de servicios -->
        <router-link to="/servicios" class="btn-view-all">
          <!-- Texto explicativo con flecha indicativa de continuación -->
          Ver Catálogo Completo de Servicios →
        <!-- Cierre del enlace hacia el catálogo completo -->
        </router-link>
      <!-- Cierre del contenedor del botón de ver catálogo -->
      </div>
    <!-- Cierre de la sección de servicios destacados -->
    </section>

    <!-- Sección de banner promocional con llamada a la acción final (CTA) -->
    <section class="cta-banner">
      <!-- Contenedor que agrupa el texto motivador y el botón de contacto -->
      <div class="cta-content">
        <!-- Encabezado secundario h2 que formula una pregunta de invitación al cliente -->
        <h2>¿Listo para digitalizar e innovar en su empresa?</h2>
        <!-- Párrafo descriptivo que ofrece asesoría personalizada por parte del equipo de ingenieros -->
        <p>Cuéntenos su proyecto o requerimiento técnico y nuestro equipo de ingenieros elaborará una propuesta personalizada.</p>
        <!-- Enlace destacado con estilo de botón para solicitar atención inmediata -->
        <router-link to="/contacto" class="btn-cta">
          <!-- Texto del botón que invita a contactar a un asesor -->
          Contactar a un Asesor Ahora
        <!-- Cierre del enlace del botón de contacto directo -->
        </router-link>
      <!-- Cierre del contenedor del contenido del banner CTA -->
      </div>
    <!-- Cierre de la sección del banner promocional CTA -->
    </section>
  <!-- Cierre del contenedor principal de la vista de inicio -->
  </div>
<!-- Cierre del bloque de plantilla template -->
</template>

<!-- Bloque de estilos CSS con alcance local limitado exclusivamente a este componente (scoped) -->
<style scoped>
/* Regla de diseño para el contenedor principal de la página de inicio */
.inicio-page {
  /* Habilita el modelo de caja flexible (Flexbox) para distribuir sus secciones hijas */
  display: flex;
  /* Ordena los elementos hijos en una columna vertical continua, de arriba a abajo */
  flex-direction: column;
  /* Define una separación vertical uniforme de 70 píxeles entre cada una de las secciones */
  gap: 70px;
/* Cierre de la regla de la página de inicio */
}

/* Regla de estilo para la sección principal de cabecera (Hero Section) */
.hero-section {
  /* Aplica un fondo oscuro complementado con dos degradados circulares de color azul y violeta en esquinas opuestas */
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent 50%),
              radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.12), transparent 50%),
              #0b132b;
  /* Redondea las esquinas del recuadro con un radio suave de 24 píxeles */
  border-radius: 24px;
  /* Agrega un espaciado interno de 60 píxeles arriba/abajo y 40 píxeles a los laterales */
  padding: 60px 40px;
  /* Establece el color de los textos internos en blanco para lograr alto contraste */
  color: white;
  /* Añade una sombra exterior oscura para otorgarle relieve y sensación de elevación */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  /* Coloca un borde tenue semi-transparente de 1 píxel para delimitar sutilmente el contenedor */
  border: 1px solid rgba(255, 255, 255, 0.08);
/* Cierre de la regla de la sección hero */
}

/* Regla de estilo para el contenedor interno del contenido del hero */
.hero-content {
  /* Limita el ancho máximo a 850 píxeles para mantener una lectura óptima y compacta */
  max-width: 850px;
  /* Centra automáticamente el contenedor de forma horizontal en la pantalla */
  margin: 0 auto;
  /* Alinea todo el texto al centro */
  text-align: center;
/* Cierre de la regla del contenido del hero */
}

/* Regla de estilo para la insignia o etiqueta decorativa del hero */
.hero-badge {
  /* Permite que el elemento se comporte como un bloque en línea adaptado a su propio texto */
  display: inline-block;
  /* Asigna un fondo azul translúcido suave con 20% de opacidad */
  background: rgba(59, 130, 246, 0.2);
  /* Define el color del texto en celeste claro */
  color: #93c5fd;
  /* Coloca un borde fino celeste semi-transparente alrededor de la insignia */
  border: 1px solid rgba(147, 197, 253, 0.3);
  /* Añade un relleno interno de 6 píxeles vertical y 16 píxeles horizontal */
  padding: 6px 16px;
  /* Redondea los extremos con 20 píxeles para darle una apariencia ovalada tipo píldora */
  border-radius: 20px;
  /* Establece un tamaño de letra pequeño de 0.85rem */
  font-size: 0.85rem;
  /* Aplica un peso de tipografía seminegrita de 600 */
  font-weight: 600;
  /* Deja un margen inferior de 24 píxeles para separarlo del título principal */
  margin-bottom: 24px;
/* Cierre de la regla de la insignia */
}

/* Regla de estilo para el título principal del hero */
.hero-title {
  /* Define un tamaño de tipografía grande e imponente de 2.8rem */
  font-size: 2.8rem;
  /* Asigna un grosor de letra extra negrita de 800 para máximo protagonismo */
  font-weight: 800;
  /* Ajusta la altura de línea a 1.2 para que el texto de varias líneas quede cohesionado */
  line-height: 1.2;
  /* Deja un espacio inferior de 20 píxeles respecto al subtítulo */
  margin-bottom: 20px;
  /* Aplica un fondo con degradado lineal diagonal que va de blanco a celeste */
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #93c5fd 100%);
  /* Recorta el fondo degradado para que se aplique exclusivamente sobre la silueta del texto */
  -webkit-background-clip: text;
  /* Hace transparente el color de relleno del texto para dejar ver el degradado */
  -webkit-text-fill-color: transparent;
/* Cierre de la regla del título principal */
}

/* Regla de consulta de medios adaptativa para dispositivos móviles y pantallas con ancho menor o igual a 768px */
@media (max-width: 768px) {
  /* Modificaciones específicas para la sección hero en pantallas pequeñas */
  .hero-section {
    /* Reduce el espaciado interior a 40 píxeles arriba/abajo y 20 píxeles laterales */
    padding: 40px 20px;
  /* Cierre de ajustes del hero para móviles */
  }
  /* Modificaciones específicas para el título del hero en pantallas pequeñas */
  .hero-title {
    /* Reduce el tamaño de fuente a 2rem para asegurar que se lea cómodamente sin desbordar */
    font-size: 2rem;
  /* Cierre de ajustes del título para móviles */
  }
/* Cierre de la regla adaptativa @media */
}

/* Regla de estilo para el subtítulo explicativo de la sección hero */
.hero-subtitle {
  /* Ajusta el tamaño de fuente a 1.1rem para que sea cómodo de leer */
  font-size: 1.1rem;
  /* Incrementa la altura entre líneas a 1.7 para darle respiro y legibilidad al párrafo */
  line-height: 1.7;
  /* Aplica un tono gris suave azulado para contrastar con el fondo oscuro */
  color: #cbd5e1;
  /* Añade un margen de 36 píxeles en la parte inferior para distanciarlo de los botones */
  margin-bottom: 36px;
/* Cierre de la regla del subtítulo */
}

/* Regla de estilo para el contenedor de los botones de llamada a la acción */
.hero-actions {
  /* Habilita Flexbox para distribuir los botones en línea */
  display: flex;
  /* Centra horizontalmente los botones en la pantalla */
  justify-content: center;
  /* Define una separación de 16 píxeles entre ambos botones */
  gap: 16px;
  /* Agrega un margen de 50 píxeles por debajo hacia las estadísticas */
  margin-bottom: 50px;
  /* Permite que los botones pasen a una nueva línea si no caben en pantallas estrechas */
  flex-wrap: wrap;
/* Cierre de la regla del contenedor de botones */
}

/* Regla de estilo para el botón de acción principal */
.btn-hero-primary {
  /* Proporciona un relleno interior generoso de 14 píxeles vertical y 28 píxeles horizontal */
  padding: 14px 28px;
  /* Aplica un fondo de color azul vibrante */
  background: #2563eb;
  /* Define el color del texto en blanco */
  color: white;
  /* Quita el subrayado predeterminado del enlace */
  text-decoration: none;
  /* Redondea las esquinas del botón con un radio de 12 píxeles */
  border-radius: 12px;
  /* Hace que el texto del botón esté en negrita (peso 700) */
  font-weight: 700;
  /* Establece el tamaño de fuente estándar en 1rem */
  font-size: 1rem;
  /* Configura una animación suave de 0.25 segundos para cualquier cambio de estado */
  transition: all 0.25s ease;
  /* Añade una sombra difuminada azulada que proyecta luz y relieve */
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.35);
/* Cierre de la regla del botón primario */
}

/* Efecto que se activa cuando el usuario coloca el puntero del ratón sobre el botón primario */
.btn-hero-primary:hover {
  /* Oscurece sutilmente el fondo azul */
  background: #1d4ed8;
  /* Eleva el botón 2 píxeles hacia arriba para dar efecto de elevación interactiva */
  transform: translateY(-2px);
  /* Aumenta la intensidad y difusión de la sombra para reforzar el efecto de elevación */
  box-shadow: 0 14px 24px rgba(37, 99, 235, 0.45);
/* Cierre de la regla del estado hover del botón primario */
}

/* Regla de estilo para el botón secundario del hero */
.btn-hero-secondary {
  /* Define un relleno interno de 14 píxeles vertical y 28 píxeles horizontal */
  padding: 14px 28px;
  /* Establece un fondo blanco translúcido con un 8% de opacidad */
  background: rgba(255, 255, 255, 0.08);
  /* Asigna color blanco a las letras */
  color: white;
  /* Elimina el subrayado de enlace */
  text-decoration: none;
  /* Redondea las esquinas con un radio de 12 píxeles */
  border-radius: 12px;
  /* Aplica un peso de fuente seminegrita de 600 */
  font-weight: 600;
  /* Tamaño de texto de 1rem */
  font-size: 1rem;
  /* Coloca un borde fino blanco translúcido de 1 píxel */
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* Transición fluida de 0.25 segundos para cambios visuales */
  transition: all 0.25s ease;
/* Cierre de la regla del botón secundario */
}

/* Efecto visual al pasar el cursor sobre el botón secundario */
.btn-hero-secondary:hover {
  /* Incrementa la opacidad del fondo blanco translúcido al 15% */
  background: rgba(255, 255, 255, 0.15);
  /* Eleva suavemente el botón 2 píxeles hacia arriba */
  transform: translateY(-2px);
/* Cierre de la regla del estado hover del botón secundario */
}

/* Regla de estilo para la barra de estadísticas destacadas */
.hero-stats {
  /* Organiza los elementos estadísticos con Flexbox */
  display: flex;
  /* Centra las estadísticas horizontalmente */
  justify-content: center;
  /* Alinea las estadísticas verticalmente en el centro */
  align-items: center;
  /* Separa cada estadística por 30 píxeles */
  gap: 30px;
  /* Aplica un fondo sutil semitransparente con 4% de opacidad */
  background: rgba(255, 255, 255, 0.04);
  /* Espaciado interno de 20 píxeles en todos los lados */
  padding: 20px;
  /* Redondea las esquinas del contenedor con 16 píxeles */
  border-radius: 16px;
  /* Borde tenue de 1 píxel con color blanco casi transparente */
  border: 1px solid rgba(255, 255, 255, 0.06);
  /* Permite que las estadísticas se reorganicen en varias líneas si la pantalla es angosta */
  flex-wrap: wrap;
/* Cierre de la regla de estadísticas */
}

/* Regla para cada bloque o ítem individual de estadística */
.stat-item {
  /* Dispone el número y su etiqueta usando Flexbox */
  display: flex;
  /* Coloca el número arriba y la etiqueta debajo en una columna vertical */
  flex-direction: column;
  /* Separa el número de la etiqueta por 4 píxeles */
  gap: 4px;
/* Cierre de la regla del ítem estadístico */
}

/* Regla de estilo para el número de la estadística */
.stat-number {
  /* Tamaño de fuente grande y visible de 1.8rem */
  font-size: 1.8rem;
  /* Peso de tipografía muy grueso de 800 para acentuar el dato */
  font-weight: 800;
  /* Color celeste llamativo */
  color: #60a5fa;
/* Cierre de la regla del número estadístico */
}

/* Regla de estilo para la etiqueta explicativa de la estadística */
.stat-label {
  /* Tamaño de fuente pequeño de 0.8rem para texto descriptivo secundario */
  font-size: 0.8rem;
  /* Color gris azulado para no competir con el número */
  color: #94a3b8;
  /* Peso de fuente mediano de 500 */
  font-weight: 500;
/* Cierre de la regla de la etiqueta estadística */
}

/* Regla para la línea divisoria vertical entre estadísticas */
.stat-divider {
  /* Ancho de línea muy delgado de 1 píxel */
  width: 1px;
  /* Altura fija de 36 píxeles para coincidir con la altura del texto */
  height: 36px;
  /* Fondo blanco translúcido con 10% de opacidad */
  background: rgba(255, 255, 255, 0.1);
/* Cierre de la regla del divisor */
}

/* Estilos comunes compartidos para los encabezados de las diferentes secciones */
.section-header {
  /* Centra el texto del encabezado */
  text-align: center;
  /* Limita el ancho máximo del encabezado a 650 píxeles para mantener la proporción */
  max-width: 650px;
  /* Centra horizontalmente el bloque y deja 40 píxeles de margen inferior */
  margin: 0 auto 40px;
/* Cierre de la regla del encabezado común */
}

/* Regla para las etiquetas o subtítulos superiores en cada encabezado de sección */
.section-tag {
  /* Color azul corporativo de la marca */
  color: #2563eb;
  /* Peso de tipografía en negrita (700) */
  font-weight: 700;
  /* Convierte todo el texto de la etiqueta a mayúsculas */
  text-transform: uppercase;
  /* Tamaño de letra pequeño y refinado de 0.8rem */
  font-size: 0.8rem;
  /* Añade un espacio extra de 0.1em entre cada letra para un aspecto moderno */
  letter-spacing: 0.1em;
/* Cierre de la regla de la etiqueta de sección */
}

/* Regla para los títulos h2 dentro de los encabezados de sección */
.section-header h2 {
  /* Tamaño destacado de 2.2rem */
  font-size: 2.2rem;
  /* Color de texto azul oscuro casi negro para máxima legibilidad sobre fondo blanco */
  color: #0f172a;
  /* Márgenes: 8 píxeles arriba, 0 a los lados y 12 píxeles abajo */
  margin: 8px 0 12px;
/* Cierre de la regla del título h2 del encabezado */
}

/* Regla para el párrafo descriptivo de los encabezados de sección */
.section-header p {
  /* Color gris neutro suave para el texto secundario */
  color: #64748b;
  /* Tamaño de letra legible de 1rem */
  font-size: 1rem;
  /* Altura de línea de 1.6 para una lectura fluida */
  line-height: 1.6;
/* Cierre de la regla del párrafo del encabezado */
}

/* Regla para la cuadrícula contenedora de las tarjetas de características */
.features-grid {
  /* Activa el diseño de cuadrícula bidimensional (CSS Grid) */
  display: grid;
  /* Crea columnas dinámicas que se adaptan automáticamente con un mínimo de 280 píxeles de ancho por columna */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  /* Espaciado de 24 píxeles entre filas y columnas de la cuadrícula */
  gap: 24px;
/* Cierre de la regla de la cuadrícula de características */
}

/* Regla de diseño para cada tarjeta individual de características */
.feature-card {
  /* Fondo blanco sólido y limpio */
  background: white;
  /* Espaciado interno generoso de 30 píxeles */
  padding: 30px;
  /* Bordes redondeados con un radio de 16 píxeles */
  border-radius: 16px;
  /* Borde delgado gris claro para separar la tarjeta del fondo */
  border: 1px solid #e2e8f0;
  /* Sombra sutil que proporciona sensación de tarjeta flotante */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  /* Transición fluida de 0.25 segundos para la transformación al pasar el cursor */
  transition: transform 0.25s ease;
/* Cierre de la regla de la tarjeta de características */
}

/* Efecto que se activa al pasar el puntero sobre una tarjeta de características */
.feature-card:hover {
  /* Eleva la tarjeta 4 píxeles hacia arriba */
  transform: translateY(-4px);
  /* Cambia el color del borde a un tono celeste para dar retroalimentación visual */
  border-color: #93c5fd;
/* Cierre de la regla del estado hover de la tarjeta */
}

/* Regla para el icono emoji dentro de cada tarjeta de características */
.feat-icon {
  /* Tamaño de icono grande de 2.5rem para que sea el foco visual inicial */
  font-size: 2.5rem;
  /* Margen inferior de 16 píxeles para separarlo del título */
  margin-bottom: 16px;
/* Cierre de la regla del icono de característica */
}

/* Regla para el título h3 de cada tarjeta de características */
.feature-card h3 {
  /* Tamaño de tipografía de 1.25rem */
  font-size: 1.25rem;
  /* Color azul oscuro elegante */
  color: #0f172a;
  /* Margen inferior de 10 píxeles respecto al párrafo explicativo */
  margin-bottom: 10px;
/* Cierre de la regla del título h3 de la tarjeta */
}

/* Regla para el párrafo descriptivo de cada tarjeta de características */
.feature-card p {
  /* Color gris neutro */
  color: #64748b;
  /* Tamaño de letra equilibrado de 0.95rem */
  font-size: 0.95rem;
  /* Altura entre líneas de 1.6 */
  line-height: 1.6;
/* Cierre de la regla del párrafo de la tarjeta */
}

/* Regla para la cuadrícula de tarjetas de servicios destacados */
.services-grid {
  /* Activa el diseño de cuadrícula CSS Grid */
  display: grid;
  /* Crea columnas automáticas que se adaptan con un ancho mínimo de 320 píxeles cada una */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  /* Espacio de separación de 28 píxeles entre tarjetas */
  gap: 28px;
/* Cierre de la regla de la cuadrícula de servicios */
}

/* Regla para el contenedor del botón de ver catálogo completo */
.view-all-box {
  /* Alinea el botón al centro horizontalmente */
  text-align: center;
  /* Añade un margen superior de 40 píxeles para distanciarlo de las tarjetas */
  margin-top: 40px;
/* Cierre de la regla del contenedor del botón de catálogo */
}

/* Regla de diseño para el botón de ver catálogo completo */
.btn-view-all {
  /* Se presenta como bloque en línea para admitir padding y márgenes */
  display: inline-block;
  /* Relleno interno de 12 píxeles vertical y 28 píxeles horizontal */
  padding: 12px 28px;
  /* Color de fondo gris muy claro */
  background: #f1f5f9;
  /* Color de texto gris azulado oscuro */
  color: #1e293b;
  /* Borde delgado gris claro */
  border: 1px solid #cbd5e1;
  /* Esquinas suavemente redondeadas con radio de 10 píxeles */
  border-radius: 10px;
  /* Texto en negrita con peso 700 */
  font-weight: 700;
  /* Quita el subrayado predeterminado del enlace */
  text-decoration: none;
  /* Animación suave de 0.2 segundos al cambiar de estado */
  transition: all 0.2s;
/* Cierre de la regla del botón de catálogo */
}

/* Efecto hover al pasar el cursor sobre el botón de ver catálogo */
.btn-view-all:hover {
  /* Cambia el fondo a color azul corporativo */
  background: #2563eb;
  /* Cambia el color del texto a blanco para buen contraste */
  color: white;
  /* Ajusta el color del borde a azul para que coincida con el fondo */
  border-color: #2563eb;
/* Cierre de la regla del estado hover del botón de catálogo */
}

/* Regla de estilo para el banner promocional de llamada a la acción (CTA) */
.cta-banner {
  /* Aplica un degradado lineal en ángulo de 135 grados que va de azul marino a azul brillante */
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  /* Bordes redondeados pronunciados de 20 píxeles */
  border-radius: 20px;
  /* Relleno interno de 50 píxeles vertical y 30 píxeles horizontal */
  padding: 50px 30px;
  /* Color de texto blanco */
  color: white;
  /* Centra los textos contenidos dentro del banner */
  text-align: center;
  /* Sombra difusa azulada que le da volumen sobre el fondo */
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.25);
/* Cierre de la regla del banner CTA */
}

/* Regla para centrar y dimensionar el contenido interno del banner CTA */
.cta-content {
  /* Restringe el ancho máximo a 700 píxeles para que no sea excesivamente ancho */
  max-width: 700px;
  /* Centra automáticamente el bloque horizontalmente */
  margin: 0 auto;
/* Cierre de la regla del contenido del banner CTA */
}

/* Regla para el título h2 dentro del banner CTA */
.cta-banner h2 {
  /* Tamaño de fuente de 2rem */
  font-size: 2rem;
  /* Margen inferior de 14 píxeles respecto al párrafo */
  margin-bottom: 14px;
/* Cierre de la regla del título h2 del banner */
}

/* Regla para el párrafo descriptivo dentro del banner CTA */
.cta-banner p {
  /* Tamaño de texto de 1.05rem para lectura cómoda */
  font-size: 1.05rem;
  /* Color celeste muy claro para un contraste elegante con el azul de fondo */
  color: #dbeafe;
  /* Margen inferior de 28 píxeles antes del botón */
  margin-bottom: 28px;
  /* Altura entre líneas de 1.6 */
  line-height: 1.6;
/* Cierre de la regla del párrafo del banner */
}

/* Regla de estilo para el botón interactivo de contacto dentro del banner CTA */
.btn-cta {
  /* Permite que el enlace se comporte como botón con dimensiones y relleno */
  display: inline-block;
  /* Relleno interno amplio de 14 píxeles vertical y 32 píxeles horizontal */
  padding: 14px 32px;
  /* Fondo blanco brillante que destaca inmediatamente sobre el fondo azul */
  background: #ffffff;
  /* Color de texto azul oscuro para alta legibilidad */
  color: #1d4ed8;
  /* Redondea las esquinas del botón con 12 píxeles */
  border-radius: 12px;
  /* Grosor de texto muy marcado de 800 */
  font-weight: 800;
  /* Tamaño de texto estándar de 1rem */
  font-size: 1rem;
  /* Elimina el subrayado de enlace */
  text-decoration: none;
  /* Transición suave de 0.2 segundos para la transformación y la sombra */
  transition: transform 0.2s, box-shadow 0.2s;
  /* Sombra oscura que le otorga profundidad tridimensional al botón */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
/* Cierre de la regla del botón CTA */
}

/* Efecto que se activa cuando el puntero del ratón se coloca sobre el botón CTA */
.btn-cta:hover {
  /* Eleva el botón 2 píxeles hacia arriba creando dinamismo */
  transform: translateY(-2px);
  /* Intensifica la sombra para reforzar la sensación de flotación */
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
/* Cierre de la regla del estado hover del botón CTA */
}
/* Cierre del bloque de estilos scoped */
</style>
