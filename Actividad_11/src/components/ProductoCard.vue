<!-- Bloque de código con la lógica de funcionamiento del componente usando Vue 3 -->
<script setup>
// Importa la función especial 'computed' de Vue que recalcula datos automáticamente cuando cambian
import { computed } from 'vue'

// Define y valida los datos externos que esta tarjeta necesita recibir desde la página o componente padre
const props = defineProps({
  // Configuración del dato 'producto', que contiene toda la información específica del artículo a mostrar
  producto: {
    // Especifica que este dato debe ser un objeto agrupado (con nombre, precio, foto, etc.)
    type: Object,
    // Marca este dato como estrictamente obligatorio para que la tarjeta se pueda dibujar
    required: true
  // Cierre de la configuración del producto
  }
// Cierre de la definición de datos recibidos (props)
})

// Declara los eventos o avisos que este componente puede enviar a su componente padre, como avisar que se pulsó el botón
const emit = defineEmits(['ver-detalle'])

// Propiedad calculada que toma el número del precio y lo convierte a formato de dinero chileno (con signo $ y separador de miles)
const precioCLP = computed(() =>
  // Crea un formateador de números según los estándares y costumbres oficiales de Chile
  new Intl.NumberFormat('es-CL', {
    // Configura el formato para que se muestre como una divisa o moneda de dinero
    style: 'currency',
    // Establece el código oficial de la moneda de Chile (Pesos Chilenos - CLP)
    currency: 'CLP',
    // Configura 0 decimales para mostrar sólo cifras enteras sin centavos
    maximumFractionDigits: 0
  // Aplica el formato configurado al número de precio que viene en el producto
  }).format(props.producto.precio)
// Cierre de la función de cálculo del precio
)

// Fin del bloque de lógica del componente
</script>

<!-- Bloque de plantilla HTML con los elementos visuales que se mostrarán en la pantalla -->
<template>
  <!-- Contenedor semántico principal con forma de tarjeta para mostrar el producto -->
  <article class="card">
    <!-- Fotografía del producto con su dirección de imagen enlazada dinámicamente, texto alternativo accesible y carga diferida -->
    <img class="card__img" :src="producto.imagen" :alt="producto.nombre" loading="lazy" />
    <!-- Contenedor del cuerpo de la tarjeta donde se agrupan los textos informativos y el botón -->
    <div class="card__body">
      <!-- Etiqueta pequeña que muestra el nombre de la categoría del producto -->
      <span class="card__cat">{{ producto.categoria }}</span>
      <!-- Título de nivel 3 con el nombre principal del producto -->
      <h3 class="card__title">{{ producto.nombre }}</h3>
      <!-- Párrafo que muestra el precio del producto ya formateado en pesos chilenos -->
      <p class="card__price">{{ precioCLP }}</p>
      <!-- Botón interactivo que al ser presionado emite el evento 'ver-detalle' pasando los datos del producto -->
      <button class="card__btn" @click="emit('ver-detalle', producto)">
        <!-- Texto visible dentro del botón que le indica al usuario la acción a realizar -->
        Ver detalle
      <!-- Cierre de la etiqueta del botón -->
      </button>
    <!-- Cierre del contenedor del cuerpo de la tarjeta -->
    </div>
  <!-- Cierre del contenedor semántico de la tarjeta -->
  </article>
<!-- Fin del bloque de plantilla visual -->
</template>

<!-- Bloque de estilos CSS que definen los colores, tamaños, bordes y animaciones de la tarjeta -->
<style scoped>
/* Regla de estilos para el contenedor principal de la tarjeta (.card) */
.card {
  /* Activa el diseño en cuadrícula (CSS Grid) para estructurar el contenido interno */
  display: grid;
  /* Divide la tarjeta en dos filas: 190 píxeles fijos de alto para la imagen y el resto automático para el texto */
  grid-template-rows: 190px 1fr;
  /* Oculta cualquier parte del contenido o imagen que sobrepase las esquinas redondeadas */
  overflow: hidden;
  /* Asigna un color de fondo blanco limpio a la tarjeta */
  background: white;
  /* Dibuja una línea de borde suave de 1 píxel de color gris claro */
  border: 1px solid #e5e7eb;
  /* Redondea las cuatro esquinas de la tarjeta con un radio de 16 píxeles */
  border-radius: 16px;
  /* Proyecta una sombra suave y sutil debajo de la tarjeta para darle efecto de profundidad */
  box-shadow: 0 5px 18px rgba(15, 23, 42, 0.06);
  /* Configura una transición suave de 0.2 segundos al moverse o cambiar la sombra */
  transition: transform .2s ease, box-shadow .2s ease;
/* Cierre de los estilos de la tarjeta */
}

/* Efecto visual que se activa cuando el usuario pasa el puntero del ratón sobre la tarjeta */
.card:hover {
  /* Eleva la tarjeta 4 píxeles hacia arriba generando un efecto de flotación */
  transform: translateY(-4px);
  /* Aumenta la intensidad y tamaño de la sombra para reforzar la sensación de elevación */
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
/* Cierre del efecto al pasar el ratón */
}

/* Regla de estilos para la fotografía del producto (.card__img) */
.card__img {
  /* Hace que la imagen ocupe todo el ancho disponible de la tarjeta (100%) */
  width: 100%;
  /* Fija la altura de la imagen al 100% de la fila asignada (190px) */
  height: 100%;
  /* Ajusta y recorta la foto proporcionalmente para que llene el espacio sin deformarse */
  object-fit: cover;
/* Cierre de los estilos de la imagen */
}

/* Regla de estilos para el contenedor del cuerpo con la información del producto (.card__body) */
.card__body {
  /* Activa el modelo de caja flexible (Flexbox) para distribuir los elementos interiores */
  display: flex;
  /* Organiza todos los elementos internos en una columna vertical de arriba hacia abajo */
  flex-direction: column;
  /* Añade un margen interno de 16 píxeles en todos los lados para que el texto no toque los bordes */
  padding: 16px;
/* Cierre de los estilos del cuerpo de la tarjeta */
}

/* Regla de estilos para la pastilla o etiqueta que muestra la categoría (.card__cat) */
.card__cat {
  /* Alinea la etiqueta a la izquierda para que ocupe solo el ancho de su propio texto */
  align-self: flex-start;
  /* Agrega un relleno interno de 4 píxeles arriba/abajo y 9 píxeles a los lados */
  padding: 4px 9px;
  /* Aplica bordes totalmente redondeados (999px) para darle apariencia de pastilla o cápsula */
  border-radius: 999px;
  /* Asigna un color de fondo celeste o azul muy suave */
  background: #eff6ff;
  /* Establece el color de la letra en azul fuerte */
  color: #1d4ed8;
  /* Ajusta el tamaño de la letra a un tamaño pequeño para que sea información secundaria */
  font-size: .78rem;
  /* Aplica un grosor de letra en negrita (700) para garantizar que se lea con claridad */
  font-weight: 700;
/* Cierre de los estilos de la etiqueta de categoría */
}

/* Regla de estilos para el título o nombre del producto (.card__title) */
.card__title {
  /* Establece los márgenes exteriores: 10 píxeles arriba, 0 a los lados y 6 píxeles abajo */
  margin: 10px 0 6px;
  /* Fija el tamaño de la letra a 1.08rem para que destaque como encabezado principal de la tarjeta */
  font-size: 1.08rem;
/* Cierre de los estilos del título */
}

/* Regla de estilos para el párrafo que muestra el precio del producto (.card__price) */
.card__price {
  /* Empuja el precio automáticamente hacia la parte inferior y deja 14 píxeles de margen inferior */
  margin: auto 0 14px;
  /* Ajusta el tamaño de letra a 1.05rem para una visualización clara del valor */
  font-size: 1.05rem;
  /* Aplica un grosor de letra en negrita muy marcado (800) para resaltar el precio */
  font-weight: 800;
/* Cierre de los estilos del precio */
}

/* Regla de estilos para el botón interactivo de ver detalle (.card__btn) */
.card__btn {
  /* Elimina el borde tosco predeterminado que traen los botones por defecto */
  border: 0;
  /* Redondea las cuatro esquinas del botón con un radio suave de 10 píxeles */
  border-radius: 10px;
  /* Aplica un espacio interno cómodo de 10 píxeles arriba/abajo y 14 píxeles a los costados */
  padding: 10px 14px;
  /* Asigna un fondo azul corporativo llamativo */
  background: #1d4ed8;
  /* Define el color del texto del botón en blanco puro */
  color: white;
  /* Aplica un peso de fuente en negrita (700) para que el texto sea fácil de leer */
  font-weight: 700;
/* Cierre de los estilos del botón */
}

/* Efecto visual cuando el cursor del ratón pasa sobre el botón (.card__btn:hover) */
.card__btn:hover {
  /* Oscurece el color de fondo azul para indicar visualmente que el botón es interactivo */
  background: #1e40af;
/* Cierre del efecto hover del botón */
}

/* Fin del bloque de estilos del componente */
</style>
