<!-- Etiqueta de apertura de la plantilla: define los elementos visuales que se mostrarán en pantalla (HTML) -->
<template>
  <!-- Crea un botón con el texto 'Enviar saludo' que, al recibir un clic (@click), emite una señal o evento llamado 'saludo' al componente padre ($emit) -->
  <button @click="$emit('saludo')">Enviar saludo</button>
<!-- Etiqueta de cierre de la plantilla visual -->
</template>

<!-- Etiqueta que abre la sección de lógica y programación del componente escrita en JavaScript -->
<script>
// Exporta la configuración de este componente para que otros archivos de la aplicación puedan importarlo y utilizarlo
export default {
  // Asigna un nombre identificador a este componente ('HijoBoton') para reconocerlo fácilmente
  name: 'HijoBoton'
// Cierra el objeto que contiene la configuración del componente
}
// Fin de la sección de código JavaScript
</script>