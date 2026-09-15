<!-- Etiqueta de inicio de la plantilla visual: define la interfaz y todo lo que el usuario ve en la pantalla -->
<template>
  <!-- Contenedor principal: una caja invisible que agrupa y organiza todos los elementos visuales de la aplicación -->
  <div>
    <!-- Campo de texto de entrada: permite al usuario escribir; v-model lo vincula en tiempo real con la variable 'nuevaTarea' y placeholder muestra un texto de sugerencia -->
    <input v-model="nuevaTarea" placeholder="Escribe una nueva tarea" />
    <!-- Botón de acción: al hacer clic (@click), llama y ejecuta la función 'agregarTarea' para guardar la tarea escrita -->
    <button @click="agregarTarea">Agregar</button>
    <!-- Botón interactivo: al hacer clic (@click), alterna el valor de 'mostrar' a su opuesto (de visible a oculto o viceversa) -->
    <button @click="mostrar = !mostrar">
      <!-- Muestra dinámicamente la palabra 'Ocultar' si la lista está visible o 'Mostrar' si está oculta, seguido de la palabra 'tareas' -->
      {{ mostrar ? 'Ocultar' : 'Mostrar' }} tareas
    <!-- Cierre del botón para alternar la visibilidad de las tareas -->
    </button>
    
    <!-- Lista desordenada (con viñetas): v-show hace que solo sea visible en pantalla si 'mostrar' es verdadero -->
    <ul v-show="mostrar">
      <!-- Elemento de la lista: v-for recorre y repite esta fila por cada tarea 't' en la lista 'tareas', identificándola por su posición única 'index' y mostrando su texto {{ t }} -->
      <li v-for="(t, index) in tareas" :key="index">{{ t }}</li>
    <!-- Cierre de la lista desordenada de tareas -->
    </ul>

    <!-- Mensaje informativo en párrafo: v-if comprueba si la lista de tareas está vacía (longitud 0) para mostrar el texto avisando que no hay tareas -->
    <p v-if="tareas.length === 0">No hay tareas registradas</p>
  <!-- Cierre del contenedor principal -->
  </div>
<!-- Cierre de la plantilla visual -->
</template>

<!-- Etiqueta que abre la sección de lógica y programación en JavaScript -->
<script>
// Exporta la configuración de este componente para que pueda ser utilizado por toda la aplicación
export default {
  // Función especial de Vue que declara y almacena las variables y datos que usará la pantalla
  data() {
    // Retorna el conjunto de variables con sus valores iniciales
    return {
      // Variable de texto vacía que guarda lo que el usuario escribe en el campo de entrada
      nuevaTarea: '',
      // Lista o arreglo inicialmente vacío donde se guardarán todas las tareas añadidas por el usuario
      tareas: [],
      // Variable de verdadero o falso (booleano) que controla si la lista de tareas se muestra visible inicialmente
      mostrar: true
    // Cierre del objeto con las variables de datos
    }
  // Cierre de la función de datos
  },
  // Bloque donde se definen las funciones o acciones que este componente puede realizar
  methods: {
    // Función que se encarga de guardar una nueva tarea dentro de la lista
    agregarTarea() {
      // Condicional: comprueba que el texto no esté vacío ni contenga solo espacios en blanco antes de agregarlo
      if (this.nuevaTarea.trim()) {
        // Agrega el texto de la nueva tarea al final de la lista de tareas
        this.tareas.push(this.nuevaTarea)
        // Limpia el campo de entrada dejándolo vacío y listo para escribir otra tarea
        this.nuevaTarea = ''
      // Cierre del bloque condicional if
      }
    // Cierre de la función agregarTarea
    }
  // Cierre del bloque de métodos
  }
// Cierre del objeto principal de configuración del componente
}
</script>
<!-- Etiqueta de cierre de la sección de lógica en JavaScript -->