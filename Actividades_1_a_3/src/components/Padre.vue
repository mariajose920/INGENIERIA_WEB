<!-- Etiqueta de apertura de la plantilla: define los elementos visuales que se mostrarán en pantalla (HTML) -->
<template>
  <!-- Contenedor general en HTML (div) que agrupa todos los elementos visuales del componente -->
  <div>
    <!-- Inserta el componente hijo (HijoBoton) y escucha el evento 'saludo'; al recibirlo ejecuta la función 'mostrarSaludo' -->
    <HijoBoton @saludo="mostrarSaludo" />
    <!-- Párrafo que se muestra en pantalla sólo si la variable 'mensaje' contiene texto (v-if) y muestra dicho texto -->
    <p v-if="mensaje">{{ mensaje }}</p>
  <!-- Cierre del contenedor general div -->
  </div>
<!-- Cierre de la plantilla visual -->
</template>

<!-- Etiqueta que abre la sección de lógica y programación del componente escrita en JavaScript -->
<script>
// Importa el componente hijo 'HijoBoton' desde el archivo './HijoBoton.vue' para poder utilizarlo dentro de este componente
import HijoBoton from './HijoBoton.vue'
// Exporta la configuración de este componente para que pueda ser utilizado por el resto de la aplicación
export default {
  // Registra el componente 'HijoBoton' para que pueda usarse como etiqueta en la plantilla visual
  components: { HijoBoton },
  // Función 'data' que define las variables y el estado interno reactivo del componente
  data() {
    // Retorna el objeto con los datos iniciales; aquí 'mensaje' empieza con una cadena de texto vacía
    return { mensaje: '' }
  // Cierre de la función data
  },
  // Sección 'methods' donde se definen las funciones o acciones que puede realizar este componente
  methods: {
    // Función que se ejecuta cuando el botón del componente hijo emite el evento de saludo
    mostrarSaludo() {
      // Asigna el texto 'Hola desde el hijo' a la variable reactiva 'mensaje' para que se actualice en la pantalla
      this.mensaje = 'Hola desde el hijo';
    // Cierre de la función mostrarSaludo
    }
  // Cierre de la sección de métodos
  }
// Cierre del objeto principal de configuración del componente
}
// Fin de la sección de programación en JavaScript
</script>
