<!-- Etiqueta de inicio de la plantilla visual: define la interfaz y todos los elementos que el usuario verá en pantalla -->
<template>
  <!-- Formulario de contacto: el modificador @submit.prevent evita que el navegador recargue la página y ejecuta la función 'validarFormulario' -->
  <form @submit.prevent="validarFormulario">
    <!-- Campo de entrada de texto: la directiva v-model lo vincula en tiempo real con la variable reactiva 'nombre' y placeholder muestra el texto de ayuda 'Nombre' -->
    <input v-model="nombre" placeholder="Nombre" />
    <!-- Campo de entrada de texto: la directiva v-model lo vincula en tiempo real con la variable reactiva 'correo' y placeholder muestra 'Correo' -->
    <input v-model="correo" placeholder="Correo" />
    <!-- Campo de entrada de texto: la directiva v-model lo vincula en tiempo real con la variable reactiva 'telefono' y placeholder muestra 'Teléfono' -->
    <input v-model="telefono" placeholder="Teléfono" />
    <!-- Área de texto multilínea: la directiva v-model la conecta con la variable 'mensaje' para redactar consultas extensas y placeholder muestra 'Mensaje' -->
    <textarea v-model="mensaje" placeholder="Mensaje"></textarea>
    <!-- Etiqueta interactiva que agrupa la casilla de verificación: vinculada mediante v-model a 'newsletter' para permitir al usuario suscribirse al boletín informativo -->
    <label><input type="checkbox" v-model="newsletter" /> Suscribirse al boletín</label>
    <!-- Botón de acción con el texto 'Enviar': al hacer clic sobre él dispara el evento de envío del formulario -->
    <button type="submit">Enviar</button>
  <!-- Cierre de la etiqueta del formulario de contacto -->
  </form>


  <!-- Contenedor condicional para mostrar errores: v-if hace que sólo aparezca en pantalla si la variable 'error' contiene un mensaje, mostrándolo en texto de color rojo -->
  <div v-if="error" style="color:red">{{ error }}</div>

  <!-- Contenedor condicional de confirmación: v-if hace que sea visible únicamente después de que el formulario haya sido enviado exitosamente ('enviado' sea verdadero) -->
  <div v-if="enviado">
    <!-- Encabezado de nivel 3 que titula la sección del resumen de los datos enviados -->
    <h3>Datos enviados:</h3>
    <!-- Párrafo que muestra el texto 'Nombre:' en negrita seguido del valor almacenado en la variable reactiva 'nombre' -->
    <p><strong>Nombre:</strong> {{ nombre }}</p>
    <!-- Párrafo que muestra el texto 'Correo:' en negrita seguido del valor almacenado en la variable reactiva 'correo' -->
    <p><strong>Correo:</strong> {{ correo }}</p>
    <!-- Párrafo que muestra el texto 'Teléfono:' en negrita seguido del valor almacenado en la variable reactiva 'telefono' -->
    <p><strong>Teléfono:</strong> {{ telefono }}</p>
    <!-- Párrafo que muestra el texto 'Mensaje:' en negrita seguido del texto redactado en la variable reactiva 'mensaje' -->
    <p><strong>Mensaje:</strong> {{ mensaje }}</p>
    <!-- Párrafo que muestra el texto 'Boletín:' en negrita y utiliza un operador condicional para mostrar 'Sí' si newsletter es verdadero o 'No' si es falso -->
    <p><strong>Boletín:</strong> {{ newsletter ? 'Sí' : 'No' }}</p>
  <!-- Cierre del contenedor condicional de confirmación de datos enviados -->
  </div>
<!-- Cierre de la plantilla visual del componente -->
</template>

<!-- Etiqueta de inicio de la sección de lógica y programación del componente escrita en JavaScript -->
<script>
// Exporta la configuración y lógica del componente para que pueda ser utilizado en cualquier parte de la aplicación
export default {
  // Función 'data' de Vue que declara y administra el estado interno reactivo con las variables del formulario
  data() {
    // Retorna el objeto con todos los valores y variables iniciales del componente
    return {
      // Variable de tipo texto inicialmente vacía que almacena el nombre del usuario
      nombre: '',
      // Variable de tipo texto inicialmente vacía que guarda el correo electrónico ingresado
      correo: '',
      // Variable de tipo texto inicialmente vacía que almacena el número de teléfono
      telefono: '',
      // Variable de tipo texto inicialmente vacía que guarda el cuerpo del mensaje o consulta
      mensaje: '',
      // Variable booleana (verdadero/falso) inicializada en false que indica si el usuario marcó la casilla del boletín
      newsletter: false,
      // Variable booleana inicializada en false que registra si el formulario ya fue enviado satisfactoriamente
      enviado: false,
      // Variable de tipo texto inicialmente vacía que almacena el mensaje de error cuando falla la validación
      error: ''
    // Cierre del objeto que contiene las variables de datos
    }
  // Cierre de la función de datos reactivos data()
  },
  // Bloque 'methods' donde se definen las funciones o acciones que este componente puede realizar
  methods: {
    // Función encargada de validar que los campos del formulario contengan información antes de enviarlo
    validarFormulario() {
      // Condicional: verifica si alguno de los cuatro campos principales (nombre, correo, teléfono o mensaje) se encuentra vacío
      if (!this.nombre || !this.correo || !this.telefono || !this.mensaje) {
        // Asigna el texto de error indicando que todos los campos del formulario son obligatorios
        this.error = 'Todos los campos son obligatorios';
        // Detiene inmediatamente la ejecución de la función para evitar que el formulario se envíe sin los datos completos
        return;
      // Cierre del bloque condicional if de validación
      }
      // Cambia el estado de 'enviado' a verdadero para hacer visible el bloque con los datos ingresados
      this.enviado = true;
      // Restablece y vacía la variable de error para que no se muestre ninguna advertencia en pantalla
      this.error = '';
    // Cierre de la función validarFormulario
    }
  // Cierre del bloque de métodos
  }
// Cierre del objeto principal de configuración del componente
}
// Cierre de la etiqueta de script de JavaScript
</script>


<!--formulario con hoja de estilo :)
<template>
  <div class="contenedor">
    <div class="card">
      <h2>Formulario de contacto</h2>
      <p class="subtitulo">Completa tus datos y envía el mensaje.</p>

      <form @submit.prevent="validarFormulario" class="formulario">
        <div class="grupo">
          <label for="nombre">Nombre</label>
          <input
            id="nombre"
            v-model="nombre"
            type="text"
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div class="grupo">
          <label for="correo">Correo</label>
          <input
            id="correo"
            v-model="correo"
            type="email"
            placeholder="Ingresa tu correo"
          />
        </div>

        <div class="grupo">
          <label for="telefono">Teléfono</label>
          <input
            id="telefono"
            v-model="telefono"
            type="text"
            placeholder="Ingresa tu teléfono"
          />
        </div>

        <div class="grupo">
          <label for="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            v-model="mensaje"
            rows="4"
            placeholder="Escribe tu mensaje"
          ></textarea>
        </div>

        <div class="check">
          <label>
            <input type="checkbox" v-model="newsletter" />
            Suscribirse al boletín
          </label>
        </div>

        <button type="submit">Enviar</button>
      </form>

      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>

    <div v-if="enviado" class="resultado">
      <h3>Datos enviados</h3>
      <p><strong>Nombre:</strong> {{ nombre }}</p>
      <p><strong>Correo:</strong> {{ correo }}</p>
      <p><strong>Teléfono:</strong> {{ telefono }}</p>
      <p><strong>Mensaje:</strong> {{ mensaje }}</p>
      <p><strong>Boletín:</strong> {{ newsletter ? 'Sí' : 'No' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      correo: '',
      telefono: '',
      mensaje: '',
      newsletter: false,
      enviado: false,
      error: ''
    }
  },
  methods: {
    validarFormulario() {
      if (!this.nombre || !this.correo || !this.telefono || !this.mensaje) {
        this.error = 'Todos los campos son obligatorios'
        this.enviado = false
        return
      }

      this.error = ''
      this.enviado = true
    }
  }
}
</script>

<style scoped>
.contenedor {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.card {
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  margin-bottom: 25px;
}

h2 {
  margin-bottom: 8px;
  color: #2c3e50;
  text-align: center;
}

.subtitulo {
  text-align: center;
  color: #666;
  margin-bottom: 25px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.grupo {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: bold;
  color: #34495e;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #ccd1d9;
  border-radius: 10px;
  font-size: 15px;
  transition: 0.3s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
}

.check label {
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #36996f;
}

.error {
  margin-top: 20px;
  padding: 12px;
  background: #ffe5e5;
  color: #c0392b;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
}

.resultado {
  background: #f4fff8;
  border-left: 6px solid #42b983;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.resultado h3 {
  margin-bottom: 12px;
  color: #2c3e50;
}

.resultado p {
  margin: 8px 0;
  color: #333;
}
</style>-->