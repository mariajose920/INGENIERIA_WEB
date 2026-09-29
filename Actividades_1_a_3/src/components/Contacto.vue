<template>
  <form @submit.prevent="validarFormulario">
    <input v-model="nombre" placeholder="Nombre" />
    <input v-model="correo" placeholder="Correo" />
    <input v-model="telefono" placeholder="Teléfono" />
    <textarea v-model="mensaje" placeholder="Mensaje"></textarea>
    <label><input type="checkbox" v-model="newsletter" /> Suscribirse al boletín</label>
    <button type="submit">Enviar</button>
  </form>


  <div v-if="error" style="color:red">{{ error }}</div>

  <div v-if="enviado">
    <h3>Datos enviados:</h3>
    <p><strong>Nombre:</strong> {{ nombre }}</p>
    <p><strong>Correo:</strong> {{ correo }}</p>
    <p><strong>Teléfono:</strong> {{ telefono }}</p>
    <p><strong>Mensaje:</strong> {{ mensaje }}</p>
    <p><strong>Boletín:</strong> {{ newsletter ? 'Sí' : 'No' }}</p>
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
        this.error = 'Todos los campos son obligatorios';
        return;
      }
      this.enviado = true;
      this.error = '';
    }
  }
}
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