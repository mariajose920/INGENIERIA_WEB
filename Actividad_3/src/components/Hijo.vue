<!-- Bloque de plantilla HTML que define la estructura visual que verá el usuario en pantalla -->
<template>
  <!-- Contenedor general que agrupa los elementos visuales dentro del componente -->
  <div>
    <!-- Párrafo de texto que muestra en pantalla el contenido recibido en la variable 'mensaje' -->
    <p>{{ mensaje }}</p>
  <!-- Cierre de la etiqueta contenedora div -->
  </div>
<!-- Cierre del bloque de plantilla visual -->
</template>

<!-- Bloque de script que contiene la lógica y configuración del componente en JavaScript -->
<script>
// Exporta la configuración del componente para que pueda ser utilizado por otros archivos de la aplicación
export default {
  // Define las propiedades (props) que este componente hijo espera recibir desde un componente padre
  props: ['mensaje']
// Cierre del objeto de configuración del componente
}
// Fin del bloque de código JavaScript
</script>