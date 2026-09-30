<!-- Bloque de lógica y programación del componente usando Vue 3 -->
<script setup>
// Define las propiedades de datos que este componente recibe desde el componente padre
const props = defineProps({
  // Propiedad 'servicio' que contiene el objeto con todos los datos del servicio a desplegar
  servicio: {
    // Tipo de dato requerido: debe ser un objeto con atributos
    type: Object,
    // Indica que este dato es obligatorio para que el componente funcione correctamente
    required: true
  // Cierre de la configuración de la propiedad servicio
  },
  // Propiedad 'esSeleccionado' que indica si la tarjeta está elegida por el usuario
  esSeleccionado: {
    // Tipo de dato esperado: booleano (verdadero o falso)
    type: Boolean,
    // Valor inicial predeterminado: falso (no seleccionado)
    default: false
  // Cierre de la configuración de la propiedad esSeleccionado
  }
// Cierre de la definición de propiedades
})

// Define el evento 'seleccionar-servicio' para notificar al componente padre cuando se elija este servicio
const emit = defineEmits(['seleccionar-servicio'])

// Función que se dispara cuando el usuario presiona el botón de la tarjeta
function solicitar() {
  // Emite el evento hacia el componente padre enviando los datos del servicio seleccionado
  emit('seleccionar-servicio', props.servicio)
// Cierre de la función solicitar
}
// Fin del bloque de lógica del componente
</script>

<!-- Bloque principal de la plantilla visual HTML del componente -->
<template>
  <!-- Contenedor principal de la tarjeta con clases condicionales si está seleccionada o destacada -->
  <div class="service-card" :class="{ 'selected-card': esSeleccionado, 'featured': servicio.destacado }">
    <!-- Encabezado de la tarjeta donde van el icono y las etiquetas -->
    <div class="card-header">
      <!-- Recuadro visual que muestra el emoji o icono del servicio, o un rayo si no tiene uno definido -->
      <div class="icon-badge">{{ servicio.icono || '⚡' }}</div>
      <!-- Contenedor para agrupar las etiquetas de categoría y disponibilidad -->
      <div class="badges">
        <!-- Etiqueta que muestra la categoría a la que pertenece el servicio (ej. Soporte, Redes, etc.) -->
        <span class="category-badge">{{ servicio.categoria }}</span>
        <!-- Etiqueta de disponibilidad con clases de color dinámicas según el estado actual -->
        <span class="availability-badge" :class="{ 'avail-inmediata': servicio.disponibilidad === 'Disponible', 'avail-demanda': servicio.disponibilidad === 'Alta Demanda', 'avail-limitada': servicio.disponibilidad === 'Cupos Limitados' }">
          <!-- Muestra el punto visual y el texto que describe la disponibilidad del servicio -->
          ● {{ servicio.disponibilidad }}
        <!-- Cierre de la etiqueta de disponibilidad -->
        </span>
      <!-- Cierre del contenedor de etiquetas -->
      </div>
    <!-- Cierre del encabezado de la tarjeta -->
    </div>

    <!-- Cuerpo central de la tarjeta donde se muestra el título, descripción y lista de características -->
    <div class="card-body">
      <!-- Título principal con el nombre del servicio -->
      <h3 class="service-title">{{ servicio.nombre }}</h3>
      <!-- Párrafo explicativo con la descripción detallada del servicio -->
      <p class="service-desc">{{ servicio.descripcion }}</p>

      <!-- Lista de características del servicio, que solo se dibuja si existen características en la lista -->
      <ul class="features-list" v-if="servicio.caracteristicas?.length">
        <!-- Elemento de lista que se repite por cada característica encontrada en el arreglo del servicio -->
        <li v-for="(feat, idx) in servicio.caracteristicas" :key="idx">
          <!-- Texto con una tilde de verificación y el nombre de la característica -->
          ✓ {{ feat }}
        <!-- Cierre del elemento individual de la lista -->
        </li>
      <!-- Cierre de la lista de características -->
      </ul>
    <!-- Cierre del cuerpo central de la tarjeta -->
    </div>

    <!-- Pie inferior de la tarjeta donde se ubican el precio referencial y el botón de acción -->
    <div class="card-footer">
      <!-- Caja contenedora de la información del precio del servicio -->
      <div class="price-box">
        <!-- Texto en tamaño pequeño que indica el rótulo 'Valor Referencial' -->
        <span class="price-label">Valor Referencial</span>
        <!-- Texto destacado en negrita con el precio o costo del servicio -->
        <span class="price-val">{{ servicio.precio }}</span>
      <!-- Cierre de la caja del precio -->
      </div>

      <!-- Botón de acción para seleccionar el servicio, con estilo especial si ya está seleccionado y detector de clics -->
      <button class="action-btn" :class="{ 'btn-selected': esSeleccionado }" @click="solicitar">
        <!-- Mensaje de confirmación visible si la tarjeta ya fue seleccionada por el usuario -->
        <span v-if="esSeleccionado">✓ Seleccionado</span>
        <!-- Mensaje de invitación a solicitar información visible si aún no está seleccionada -->
        <span v-else>📩 Solicitar Información</span>
      <!-- Cierre del botón de acción -->
      </button>
    <!-- Cierre del pie inferior de la tarjeta -->
    </div>
  <!-- Cierre del contenedor principal de la tarjeta -->
  </div>
<!-- Cierre del bloque de plantilla visual -->
</template>

<!-- Bloque de estilos visuales CSS exclusivos para este componente -->
<style scoped>
/* Estilos para el contenedor principal de la tarjeta de servicio */
.service-card {
  /* Fondo de color blanco para la tarjeta */
  background: #ffffff;
  /* Bordes redondeados en las cuatro esquinas para darle un aspecto moderno y suave */
  border-radius: 16px;
  /* Borde delgado y sutil de color gris claro alrededor de la tarjeta */
  border: 1px solid #e2e8f0;
  /* Espacio interior de relleno alrededor de todo el contenido de la tarjeta */
  padding: 24px;
  /* Activa el diseño flexible (flexbox) para organizar los elementos internos */
  display: flex;
  /* Alinea los elementos internos uno debajo del otro verticalmente en columna */
  flex-direction: column;
  /* Distribuye los elementos separándolos uniformemente entre la parte superior e inferior */
  justify-content: space-between;
  /* Animación suave de 0.3 segundos para cualquier cambio de propiedad (como al pasar el mouse) */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* Posicionamiento relativo para permitir posicionar elementos hijos de forma absoluta */
  position: relative;
  /* Oculta cualquier elemento que se desborde o salga fuera de los bordes redondeados */
  overflow: hidden;
  /* Sombra sutil debajo de la tarjeta para darle sensación de elevación o profundidad */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
/* Cierre de los estilos de la tarjeta */
}

/* Estilos que se aplican cuando el usuario pasa el cursor del mouse por encima de la tarjeta */
.service-card:hover {
  /* Eleva la tarjeta 6 píxeles hacia arriba para dar efecto interactivo de flotación */
  transform: translateY(-6px);
  /* Incrementa la sombra haciéndola más grande y oscura para simular mayor altura */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  /* Cambia el color del borde a un azul claro para resaltar la tarjeta activa */
  border-color: #93c5fd;
/* Cierre de los estilos para el estado al pasar el mouse */
}

/* Estilos especiales cuando la tarjeta ha sido seleccionada por el usuario */
.service-card.selected-card {
  /* Cambia el color del borde a un azul intenso para destacar la selección */
  border-color: #2563eb;
  /* Fondo degradado suave de blanco grisáceo a azul muy claro */
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
  /* Agrega un contorno azul brillante y sombra azulada para enfatizar que está elegida */
  box-shadow: 0 0 0 2px #2563eb, 0 10px 20px rgba(37, 99, 235, 0.15);
/* Cierre de los estilos para la tarjeta seleccionada */
}

/* Insignia decorativa diagonal en la esquina superior para servicios destacados */
.service-card.featured::before {
  /* Texto que se dibuja automáticamente en la insignia con estrella */
  content: '★ DESTACADO';
  /* Posicionamiento libre exacto dentro de la tarjeta */
  position: absolute;
  /* Distancia de 14 píxeles desde el borde superior */
  top: 14px;
  /* Desplazamiento hacia la derecha para que quede cortada en la esquina */
  right: -32px;
  /* Rota la insignia 45 grados para que quede en diagonal */
  transform: rotate(45deg);
  /* Fondo con degradado de color naranja a ámbar */
  background: linear-gradient(135deg, #f59e0b, #d97706);
  /* Color blanco para las letras del texto */
  color: white;
  /* Tamaño de fuente muy pequeño y compacto */
  font-size: 0.65rem;
  /* Grosor de texto muy grueso (negrita fuerte) */
  font-weight: 800;
  /* Relleno interno: 4 píxeles arriba/abajo y 34 píxeles a los lados */
  padding: 4px 34px;
  /* Separación adicional entre letras para mejorar la legibilidad en mayúsculas */
  letter-spacing: 0.05em;
  /* Sombra sutil detrás de la cinta destacada para darle relieve */
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
/* Cierre de los estilos del elemento destacado */
}

/* Estilos para el encabezado superior de la tarjeta */
.card-header {
  /* Usa caja flexible para alinear sus elementos */
  display: flex;
  /* Separa el icono a la izquierda y las insignias a la derecha */
  justify-content: space-between;
  /* Alinea los elementos al inicio superior */
  align-items: flex-start;
  /* Margen inferior para separarlo del cuerpo del texto */
  margin-bottom: 16px;
/* Cierre de los estilos del encabezado */
}

/* Estilos para la caja que contiene el icono del servicio */
.icon-badge {
  /* Tamaño de fuente grande para el emoji o icono */
  font-size: 2.2rem;
  /* Ancho fijo de 56 píxeles */
  width: 56px;
  /* Alto fijo de 56 píxeles para formar un cuadrado */
  height: 56px;
  /* Color de fondo grisáceo muy claro */
  background: #f1f5f9;
  /* Esquinas redondeadas del recuadro del icono */
  border-radius: 12px;
  /* Activa diseño flexible para centrar el icono en medio */
  display: flex;
  /* Centra verticalmente el icono dentro del recuadro */
  align-items: center;
  /* Centra horizontalmente el icono dentro del recuadro */
  justify-content: center;
  /* Borde fino gris alrededor del recuadro */
  border: 1px solid #e2e8f0;
/* Cierre de los estilos de la caja del icono */
}

/* Estilos para el contenedor de las insignias o etiquetas */
.badges {
  /* Activa diseño flexible */
  display: flex;
  /* Apila las etiquetas una debajo de la otra en columna */
  flex-direction: column;
  /* Alinea las etiquetas hacia el borde derecho */
  align-items: flex-end;
  /* Espacio de 6 píxeles entre cada etiqueta */
  gap: 6px;
/* Cierre de los estilos del contenedor de insignias */
}

/* Estilos para la insignia que indica la categoría del servicio */
.category-badge {
  /* Tamaño de texto pequeño */
  font-size: 0.75rem;
  /* Texto en negrita para resaltar */
  font-weight: 700;
  /* Transforma todas las letras a mayúsculas */
  text-transform: uppercase;
  /* Color de texto azul */
  color: #2563eb;
  /* Fondo azul muy claro en forma de pastilla */
  background: #dbeafe;
  /* Espaciado interno: 4 píxeles vertical y 10 píxeles horizontal */
  padding: 4px 10px;
  /* Bordes totalmente redondeados tipo píldora */
  border-radius: 20px;
  /* Ligero espacio entre cada letra */
  letter-spacing: 0.04em;
/* Cierre de los estilos de la insignia de categoría */
}

/* Estilos base para la etiqueta que indica el estado de disponibilidad */
.availability-badge {
  /* Tamaño de letra pequeño y discreto */
  font-size: 0.72rem;
  /* Grosor de letra seminegrita */
  font-weight: 600;
  /* Espaciado interno: 2 píxeles arriba/abajo y 8 píxeles a los lados */
  padding: 2px 8px;
  /* Esquinas redondeadas suaves */
  border-radius: 12px;
/* Cierre de los estilos base de disponibilidad */
}

/* Variante de color verde cuando el servicio está totalmente disponible */
.avail-inmediata {
  /* Fondo verde claro */
  background: #dcfce7;
  /* Color de texto verde oscuro para buen contraste */
  color: #15803d;
/* Cierre de la variante de disponibilidad inmediata */
}

/* Variante de color amarillo cuando el servicio tiene alta demanda */
.avail-demanda {
  /* Fondo amarillo cálido claro */
  background: #fef3c7;
  /* Color de texto marrón anaranjado para legibilidad */
  color: #b45309;
/* Cierre de la variante de alta demanda */
}

/* Variante de color rojo cuando quedan pocos cupos disponibles */
.avail-limitada {
  /* Fondo rojo pastel muy claro */
  background: #fee2e2;
  /* Color de texto rojo oscuro para alertar */
  color: #b91c1c;
/* Cierre de la variante de cupos limitados */
}

/* Estilos para el título principal del servicio */
.service-title {
  /* Margen: 0 arriba, 0 a los lados y 10 píxeles abajo para separar del texto */
  margin: 0 0 10px 0;
  /* Tamaño de letra grande y legible */
  font-size: 1.25rem;
  /* Texto en negrita para jerarquía visual */
  font-weight: 700;
  /* Color de texto azul marino muy oscuro casi negro */
  color: #0f172a;
  /* Altura de línea para que los títulos de múltiples líneas no se peguen */
  line-height: 1.35;
/* Cierre de los estilos del título */
}

/* Estilos para el párrafo con la descripción del servicio */
.service-desc {
  /* Color de texto gris azulado para no competir con el título */
  color: #64748b;
  /* Tamaño de fuente mediano para lectura cómoda */
  font-size: 0.92rem;
  /* Altura de línea amplia para mejorar la lectura del párrafo */
  line-height: 1.6;
  /* Margen inferior de 16 píxeles antes de la lista */
  margin-bottom: 16px;
/* Cierre de los estilos de la descripción */
}

/* Estilos para la lista de características o beneficios */
.features-list {
  /* Quita los puntos negros por defecto de las listas HTML */
  list-style: none;
  /* Elimina el relleno interior predeterminado de la lista */
  padding: 0;
  /* Margen inferior de 20 píxeles */
  margin: 0 0 20px 0;
  /* Activa diseño flexible para los elementos de la lista */
  display: flex;
  /* Coloca los elementos uno debajo de otro */
  flex-direction: column;
  /* Espacio de 6 píxeles entre cada característica */
  gap: 6px;
/* Cierre de los estilos de la lista */
}

/* Estilos para cada elemento individual de la lista de características */
.features-list li {
  /* Tamaño de letra compacto y adecuado para listas */
  font-size: 0.85rem;
  /* Color gris medio elegante para el texto */
  color: #475569;
  /* Grosor de fuente medio para fácil lectura */
  font-weight: 500;
/* Cierre de los estilos del elemento de lista */
}

/* Estilos para el área inferior (pie) de la tarjeta */
.card-footer {
  /* Margen superior para separarlo del contenido superior */
  margin-top: 16px;
  /* Relleno superior interno */
  padding-top: 16px;
  /* Línea divisoria superior muy sutil y delgada */
  border-top: 1px solid #f1f5f9;
  /* Activa diseño flexible */
  display: flex;
  /* Coloca la caja del precio y el botón verticalmente */
  flex-direction: column;
  /* Espacio de 12 píxeles entre el precio y el botón */
  gap: 12px;
/* Cierre de los estilos del pie de tarjeta */
}

/* Estilos para la caja que agrupa la etiqueta y el valor del precio */
.price-box {
  /* Activa diseño flexible */
  display: flex;
  /* Apila la etiqueta y el número del precio en columna */
  flex-direction: column;
/* Cierre de los estilos de la caja de precio */
}

/* Estilos para el texto de la etiqueta que dice 'VALOR REFERENCIAL' */
.price-label {
  /* Tamaño de letra pequeño */
  font-size: 0.75rem;
  /* Color gris claro tenue */
  color: #94a3b8;
  /* Convierte el texto automáticamente a mayúsculas */
  text-transform: uppercase;
  /* Texto en seminegrita */
  font-weight: 600;
/* Cierre de los estilos de la etiqueta de precio */
}

/* Estilos para el valor numérico o monto del precio */
.price-val {
  /* Tamaño de fuente grande para destacar el valor económico */
  font-size: 1.1rem;
  /* Texto en negrita muy fuerte para que resalte */
  font-weight: 800;
  /* Color oscuro casi negro para alta legibilidad */
  color: #0f172a;
/* Cierre de los estilos del valor del precio */
}

/* Estilos para el botón de acción principal */
.action-btn {
  /* El botón ocupa todo el ancho disponible del 100% de la tarjeta */
  width: 100%;
  /* Relleno interno: 10 píxeles arriba/abajo y 16 píxeles a los lados */
  padding: 10px 16px;
  /* Fondo oscuro azul noche para el botón */
  background: #0f172a;
  /* Color blanco para el texto del botón */
  color: white;
  /* Quita el borde por defecto de los botones HTML */
  border: none;
  /* Esquinas redondeadas del botón */
  border-radius: 10px;
  /* Texto en seminegrita */
  font-weight: 600;
  /* Tamaño de texto adecuado para botones de interfaz */
  font-size: 0.92rem;
  /* Cambia la flecha del mouse a una mano para indicar que se puede cliquear */
  cursor: pointer;
  /* Transición suave de 0.2 segundos al cambiar de color o moverse */
  transition: all 0.2s ease;
  /* Activa diseño flexible para centrar el icono y texto */
  display: flex;
  /* Centra verticalmente el contenido dentro del botón */
  align-items: center;
  /* Centra horizontalmente el contenido dentro del botón */
  justify-content: center;
  /* Separación de 6 píxeles entre el icono y el texto */
  gap: 6px;
/* Cierre de los estilos del botón de acción */
}

/* Estilos cuando el usuario coloca el puntero del mouse sobre el botón */
.action-btn:hover {
  /* Cambia el color de fondo a un azul vibrante */
  background: #2563eb;
  /* Eleva el botón 1 píxel hacia arriba dando sensación de presión */
  transform: translateY(-1px);
/* Cierre de los estilos de hover del botón */
}

/* Estilos especiales para el botón cuando la tarjeta ya está seleccionada */
.btn-selected {
  /* Fondo de color verde para indicar éxito o selección confirmada con máxima prioridad */
  background: #16a34a !important;
/* Cierre de los estilos de botón seleccionado */
}

/* Estilos al pasar el mouse sobre el botón cuando ya está seleccionado */
.btn-selected:hover {
  /* Fondo de color verde más oscuro al pasar el cursor con máxima prioridad */
  background: #15803d !important;
/* Cierre de los estilos de hover de botón seleccionado */
}
/* Cierre del bloque de estilos */
</style>
