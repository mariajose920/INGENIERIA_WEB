<!-- Etiqueta de apertura que define la plantilla visual (interfaz de usuario) del componente -->
<template>
  <!-- Contenedor principal en formato de bloque que agrupa todos los elementos visuales -->
  <div>
    <!-- Campo de texto donde el usuario escribe; v-model lo vincula en tiempo real con la variable 'nuevaTarea' y placeholder muestra un texto de ayuda -->
    <input v-model="nuevaTarea" placeholder="Escribe una nueva tarea" />
    <!-- Botón que ejecuta la función 'agregarTarea' al hacer clic sobre él -->
    <button @click="agregarTarea">Agregar</button>
    <!-- Botón que invierte el valor de 'mostrar' (de verdadero a falso o viceversa) al hacer clic para alternar visibilidad -->
    <button @click="mostrar = !mostrar">
      <!-- Muestra texto dinámico: si 'mostrar' es verdadero dice 'Ocultar', de lo contrario dice 'Mostrar' seguido de 'tareas' -->
      {{ mostrar ? 'Ocultar' : 'Mostrar' }} tareas
    <!-- Cierre de la etiqueta del botón de alternar visibilidad -->
    </button>

    <!-- Lista no ordenada que se muestra u oculta en pantalla según si 'mostrar' es verdadero o falso (v-show) -->
    <ul v-show="mostrar">
      <!-- Elemento de lista que se repite por cada tarea 't' en la lista 'tareas', usando 'index' como identificador único y mostrando el texto de la tarea -->
      <li v-for="(t, index) in tareas" :key="index">{{ t }}</li>
    <!-- Cierre de la lista no ordenada -->
    </ul>

    <!-- Párrafo que se muestra únicamente si la lista de tareas está vacía (longitud igual a cero) -->
    <p v-if="tareas.length === 0">No hay tareas registradas</p>
  <!-- Cierre del contenedor principal -->
  </div>
<!-- Cierre de la plantilla visual del componente -->
</template>

<!-- Etiqueta de apertura para escribir la lógica y programación en lenguaje JavaScript -->
<script>
// Exporta el componente para que pueda ser importado y utilizado en otras partes de la aplicación
export default {
  // Función que contiene y define los datos reactivos del componente
  data() {
    // Devuelve el objeto con todas las variables iniciales que usará la vista
    return {
      // Variable de texto para almacenar lo que el usuario escribe en el campo de entrada
      nuevaTarea: '',
      // Lista o arreglo inicialmente vacío donde se guardarán las tareas creadas
      tareas: [],
      // Variable booleana (verdadero/falso) para controlar si la lista de tareas está visible u oculta
      mostrar: true
    // Cierre del objeto con las variables de datos
    }
  // Cierre de la función de datos
  },
  // Sección que agrupa las funciones o métodos con las acciones que puede realizar el componente
  methods: {
    // Función que se encarga de agregar una nueva tarea a la lista
    agregarTarea() {
      // Comprueba que el texto escrito no esté vacío ni contenga únicamente espacios en blanco
      if (this.nuevaTarea.trim()) {
        // Agrega el texto de la nueva tarea al final del arreglo de tareas
        this.tareas.push(this.nuevaTarea);
        // Vacía el campo de texto para que quede listo para escribir una nueva tarea
        this.nuevaTarea = '';
      // Cierre del bloque condicional if
      }
    // Cierre de la función agregarTarea
    }
  // Cierre de la sección de métodos
  }
// Cierre del objeto de configuración del componente
}
// Cierre de la etiqueta de script
</script>
