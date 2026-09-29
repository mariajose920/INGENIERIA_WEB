<!-- Bloque de script con Composition API para la lógica reactiva del componente -->
<script setup>
// Importa la función 'computed' de Vue para declarar propiedades computadas reactivas
import { computed } from 'vue'

// Define y valida las propiedades (props) que recibe el componente desde el componente padre
const props = defineProps({
  // Objeto 'producto' que contiene los detalles del producto a mostrar
  producto: {
    // Especifica que la propiedad debe ser de tipo Object
    type: Object,
    // Marca la propiedad como obligatoria para que el componente funcione correctamente
    required: true
  // Cierre de la configuración de la propiedad 'producto'
  }
// Cierre de la definición de props
})
// Define el evento personalizado 'ver-detalle' que el componente puede emitir hacia su componente padre
const emit = defineEmits(['ver-detalle'])

// Propiedad computada que formatea el precio numérico del producto en moneda chilena (CLP)
const precioCLP = computed(() =>
  // Instancia el formateador de números con la configuración regional de Chile
  new Intl.NumberFormat('es-CL', {
    // Establece el formato en estilo de divisa o moneda
    style: 'currency',
    // Define el código de moneda correspondiente al peso chileno
    currency: 'CLP',
    // Configura 0 dígitos decimales para mostrar cantidades enteras
    maximumFractionDigits: 0
  // Aplica el formato al valor de la propiedad precio del producto
  }).format(props.producto.precio)
// Cierre de la función de la propiedad computada
)
// Fin de la lógica del componente
</script>

<!-- Bloque de plantilla HTML con la estructura visual y de presentación del componente -->
<template>
  <!-- Contenedor semántico principal de la tarjeta de producto -->
  <article class="card">
    <!-- Renderiza la imagen del producto con su clase de estilo, enlace reactivo a la imagen, descripción accesible y carga diferida -->
    <img
      class="card__img"
      :src="producto.imagen"
      :alt="producto.nombre"
      loading="lazy"
    />
    <!-- Contenedor del cuerpo de la tarjeta que agrupa los datos informativos y el botón -->
    <div class="card__body">
      <!-- Elemento que muestra la categoría a la que pertenece el producto -->
      <span class="card__cat">{{ producto.categoria }}</span>
      <!-- Título de nivel 3 que muestra el nombre del producto -->
      <h3 class="card__title">{{ producto.nombre }}</h3>
      <!-- Párrafo que muestra el precio formateado en pesos chilenos -->
      <p class="card__price">{{ precioCLP }}</p>
      <!-- Botón que al recibir clic emite el evento 'ver-detalle' pasando los datos del producto -->
      <button class="card__btn" @click="emit('ver-detalle', producto)">
        <!-- Texto descriptivo visible dentro del botón de acción -->
        Ver detalle
      <!-- Cierre de la etiqueta button -->
      </button>
    <!-- Cierre del contenedor card__body -->
    </div>
  <!-- Cierre del contenedor article -->
  </article>
<!-- Cierre del bloque de plantilla -->
</template>

<!-- Bloque de estilos CSS encapsulados con alcance exclusivo para este componente (scoped) -->
<style scoped>
/* Regla de estilos para el contenedor principal de la tarjeta (.card) */
.card {
  /* Establece un esquema de visualización basado en cuadrícula (CSS Grid) */
  display: grid;
  /* Configura dos filas: 190px de alto para la imagen y 1fr para el contenido restante */
  grid-template-rows: 190px 1fr;
  /* Oculta cualquier desbordamiento de contenido fuera de los bordes redondeados */
  overflow: hidden;
  /* Define el color de fondo de la tarjeta en blanco */
  background: white;
  /* Aplica un borde sólido de 1 píxel en color gris claro */
  border: 1px solid #e5e7eb;
  /* Redondea las esquinas de la tarjeta con un radio de 16 píxeles */
  border-radius: 16px;
  /* Añade una sombra sutil para proporcionar sensación de profundidad y relieve */
  box-shadow: 0 5px 18px rgba(15, 23, 42, 0.06);
  /* Define una transición suave de 0.2 segundos para la transformación y la sombra */
  transition: transform .2s ease, box-shadow .2s ease;
/* Fin de los estilos de la tarjeta */
}
/* Efecto visual al pasar el cursor (hover) sobre la tarjeta */
.card:hover {
  /* Desplaza la tarjeta 4 píxeles hacia arriba generando un efecto de elevación */
  transform: translateY(-4px);
  /* Incrementa la intensidad de la sombra para acentuar la elevación en el hover */
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
/* Fin del efecto hover de la tarjeta */
}
/* Estilos para la imagen: ancho y alto al 100% adaptándose con cover para no distorsionarse */
.card__img { width: 100%; height: 100%; object-fit: cover; }
/* Estilos para el cuerpo: disposición flexbox en columna con un relleno interno de 16 píxeles */
.card__body { display: flex; flex-direction: column; padding: 16px; }
/* Regla de estilos para la insignia o etiqueta de categoría del producto (.card__cat) */
.card__cat {
  /* Alinea la etiqueta al inicio del contenedor en el eje transversal */
  align-self: flex-start;
  /* Agrega espaciado interno: 4 píxeles vertical y 9 píxeles horizontal */
  padding: 4px 9px;
  /* Aplica bordes completamente redondeados simulando una píldora */
  border-radius: 999px;
  /* Define un color de fondo azul suave */
  background: #eff6ff;
  /* Establece el color de la tipografía en azul intenso */
  color: #1d4ed8;
  /* Tamaño de fuente reducido para definir jerarquía visual */
  font-size: .78rem;
  /* Aplica un peso de fuente en negrita (700) */
  font-weight: 700;
/* Fin de los estilos de la categoría */
}
/* Estilos del título: márgenes superior e inferior ajustados con tamaño de fuente destacado */
.card__title { margin: 10px 0 6px; font-size: 1.08rem; }
/* Estilos del precio: margen superior automático para empujar hacia el pie, tamaño de fuente y negrita */
.card__price { margin: auto 0 14px; font-size: 1.05rem; font-weight: 800; }
/* Regla de estilos para el botón de acción (.card__btn) */
.card__btn {
  /* Elimina el borde predeterminado del botón */
  border: 0;
  /* Aplica esquinas redondeadas con radio de 10 píxeles */
  border-radius: 10px;
  /* Agrega relleno interno de 10 píxeles arriba/abajo y 14 píxeles a los laterales */
  padding: 10px 14px;
  /* Asigna el color de fondo azul corporativo */
  background: #1d4ed8;
  /* Define el color del texto en blanco */
  color: white;
  /* Aplica peso de tipografía en negrita (700) */
  font-weight: 700;
/* Fin de los estilos del botón */
}
/* Efecto hover sobre el botón: oscurece el fondo azul al interactuar */
.card__btn:hover { background: #1e40af; }
/* Fin del bloque de estilos */
</style>
