<!-- Bloque de script con Vue 3 Composition API para la lógica reactiva del componente -->
<script setup>
// Importa las funciones reactivas 'ref' para variables mutables, 'computed' para cálculos automáticos y 'onMounted' para ejecutar código al cargar
import { ref, computed, onMounted } from 'vue'
// Importa el almacén central de servicios (store) para compartir datos entre vistas
import { useServiciosStore } from '../stores/useServiciosStore.js'

// Extrae el estado global y las funciones para registrar solicitudes y limpiar la selección actual
const { state, registrarSolicitud, limpiarServicioSeleccionado } = useServiciosStore()

// Objeto reactivo que almacena los valores ingresados en cada campo del formulario
const form = ref({
  // Campo reactivo para almacenar el nombre del cliente
  nombre: '',
  // Campo reactivo para almacenar el correo electrónico de contacto
  email: '',
  // Campo reactivo para almacenar el número telefónico de contacto
  telefono: '',
  // Campo reactivo para almacenar el ID del servicio seleccionado
  servicioId: '',
  // Campo reactivo para almacenar el mensaje o requerimiento del cliente
  mensaje: ''
// Cierre del objeto inicial del formulario reactivo
})

// Variable reactiva que guarda los mensajes de error por cada campo validado
const errores = ref({})
// Variable reactiva booleana que indica si el formulario fue enviado con éxito
const enviadoConExito = ref(false)
// Variable reactiva para almacenar la información de la solicitud recién registrada
const resumenSolicitud = ref(null)

// Gancho que se ejecuta automáticamente cuando el componente se carga y monta en el navegador
onMounted(() => {
  // Verifica si el usuario ya había seleccionado un servicio en la vista del catálogo
  if (state.servicioSeleccionado) {
    // Rellena automáticamente el campo de servicio con el ID del servicio preseleccionado
    form.value.servicioId = state.servicioSeleccionado.id
  // Cierre de la condición if
  }
// Cierre del gancho onMounted
})

// Propiedad computada que busca y devuelve el objeto del servicio correspondiente al ID seleccionado
const servicioSeleccionadoObj = computed(() => {
  // Si no hay un ID de servicio seleccionado en el formulario, retorna valor nulo
  if (!form.value.servicioId) return null
  // Busca en la lista de servicios aquel cuyo identificador coincida con el valor numérico del formulario
  return state.servicios.find(s => s.id === Number(form.value.servicioId))
// Cierre de la propiedad computada
})

// Función que valida si una cadena de texto tiene el formato de un correo electrónico válido
function validarEmail(email) {
  // Patrón de expresión regular que comprueba el formato estándar de una dirección de correo
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // Retorna verdadero si el texto cumple con el patrón del correo o falso en caso contrario
  return re.test(email)
// Cierre de la función validarEmail
}

// Función que valida si el número telefónico tiene al menos 8 dígitos numéricos
function validarTelefono(tel) {
  // Limpia el texto eliminando espacios, guiones, signos más y paréntesis
  const clean = tel.replace(/[\s\-\+\(\)]/g, '')
  // Comprueba que la longitud sea de al menos 8 caracteres y que contenga sólo dígitos
  return clean.length >= 8 && /^\d+$/.test(clean)
// Cierre de la función validarTelefono
}

// Función encargada de validar todas las entradas del formulario antes del envío
function validarFormulario() {
  // Reinicia el objeto de errores vaciando cualquier mensaje anterior
  errores.value = {}

  // Valida que el campo nombre no esté vacío tras quitar espacios en blanco
  if (!form.value.nombre.trim()) {
    // Asigna el mensaje de error de campo obligatorio
    errores.value.nombre = 'El nombre completo es obligatorio.'
  // Si tiene contenido pero es menor a 3 caracteres, exige un nombre más completo
  } else if (form.value.nombre.trim().length < 3) {
    // Asigna el mensaje de error por longitud insuficiente
    errores.value.nombre = 'Ingrese un nombre de al menos 3 caracteres.'
  // Cierre de la validación del nombre
  }

  // Valida que el campo de correo electrónico no esté vacío
  if (!form.value.email.trim()) {
    // Asigna el mensaje de error de correo obligatorio
    errores.value.email = 'El correo electrónico es obligatorio.'
  // Comprueba que el correo tenga una estructura sintáctica válida
  } else if (!validarEmail(form.value.email.trim())) {
    // Asigna el mensaje de error de correo inválido con formato de ejemplo
    errores.value.email = 'Ingrese un correo electrónico válido (ej: contacto@empresa.cl).'
  // Cierre de la validación del correo
  }

  // Valida que el campo de teléfono no esté en blanco
  if (!form.value.telefono.trim()) {
    // Asigna el mensaje de error de teléfono obligatorio
    errores.value.telefono = 'El teléfono de contacto es obligatorio.'
  // Comprueba si el teléfono cumple con la regla de formato y dígitos mínimos
  } else if (!validarTelefono(form.value.telefono.trim())) {
    // Asigna el mensaje de error de teléfono inválido
    errores.value.telefono = 'Ingrese un número telefónico válido (mínimo 8 dígitos).'
  // Cierre de la validación del teléfono
  }

  // Valida que se haya seleccionado un servicio del catálogo
  if (!form.value.servicioId) {
    // Asigna el mensaje de error solicitando elegir un servicio
    errores.value.servicioId = 'Debe seleccionar el servicio de su interés.'
  // Cierre de la validación del servicio
  }

  // Valida que el campo mensaje no se encuentre vacío
  if (!form.value.mensaje.trim()) {
    // Asigna el mensaje de error solicitando detallar el requerimiento
    errores.value.mensaje = 'Por favor detalle su requerimiento o consulta.'
  // Comprueba que el mensaje tenga una longitud descriptiva de al menos 10 caracteres
  } else if (form.value.mensaje.trim().length < 10) {
    // Asigna el mensaje de error de requerimiento de longitud mínima
    errores.value.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  // Cierre de la validación del mensaje
  }

  // Retorna verdadero si no hay ningún error registrado en el objeto de errores
  return Object.keys(errores.value).length === 0
// Cierre de la función validarFormulario
}

// Función que procesa y registra los datos del formulario al enviarlo
function enviarFormulario() {
  // Ejecuta la validación; si detecta errores, cancela la ejecución del envío
  if (!validarFormulario()) {
    // Detiene la función sin realizar el envío
    return
  // Cierre de la condición de comprobación
  }

  // Busca los datos completos del servicio utilizando el ID seleccionado en el formulario
  const servicio = state.servicios.find(s => s.id === Number(form.value.servicioId))

  // Empaqueta los datos ingresados en un objeto preparado para registrarse
  const solicitudData = {
    // Guarda el nombre del usuario sin espacios al inicio o final
    nombre: form.value.nombre.trim(),
    // Guarda el correo electrónico limpio
    email: form.value.email.trim(),
    // Guarda el teléfono de contacto limpio
    telefono: form.value.telefono.trim(),
    // Asigna el nombre del servicio o un texto genérico si no se encontró
    servicioNombre: servicio ? servicio.nombre : 'Consulta General',
    // Asigna el precio referencial del servicio o un guión
    servicioPrecio: servicio ? servicio.precio : '—',
    // Guarda el mensaje con los requerimientos detallados del usuario
    mensaje: form.value.mensaje.trim()
  // Cierre del objeto con los datos de la solicitud
  }

  // Registra la nueva solicitud en el almacén de servicios y recibe el registro guardado
  const guardada = registrarSolicitud(solicitudData)
  // Guarda la solicitud registrada en la variable reactiva para mostrar el resumen
  resumenSolicitud.value = guardada
  // Cambia el estado a verdadero para mostrar la pantalla de confirmación exitosa
  enviadoConExito.value = true

  // Reinicia todos los campos del formulario reactivo a sus valores vacíos originales
  form.value = {
    // Vacía el campo del nombre
    nombre: '',
    // Vacía el campo del correo electrónico
    email: '',
    // Vacía el campo del teléfono
    telefono: '',
    // Vacía el campo de selección de servicio
    servicioId: '',
    // Vacía el campo del mensaje
    mensaje: ''
  // Cierre del objeto de reinicio del formulario
  }
  // Limpia del almacén global la preselección que provenía del catálogo
  limpiarServicioSeleccionado()
// Cierre de la función enviarFormulario
}

// Función para restablecer las variables y permitir que el usuario realice otra consulta
function nuevaConsulta() {
  // Oculta el mensaje de confirmación exitosa para mostrar de nuevo el formulario
  enviadoConExito.value = false
  // Vacía el resumen de la solicitud procesada anteriormente
  resumenSolicitud.value = null
  // Limpia cualquier mensaje de error remanente
  errores.value = {}
// Cierre de la función nuevaConsulta
}
// Cierre del bloque de script
</script>

<!-- Bloque de plantilla HTML que define la estructura visual del componente de contacto -->
<template>
  <!-- Contenedor principal que envuelve todos los elementos de la página de contacto -->
  <div class="contacto-page">
    <!-- Sección de cabecera con el título principal y subtítulo de la página -->
    <section class="contacto-header">
      <!-- Etiqueta distintiva tipo insignia que destaca la atención personalizada -->
      <span class="badge-tag">Atención Personalizada</span>
      <!-- Título principal h1 de la página de cotizaciones y contacto -->
      <h1>Solicitud de Información & Cotizaciones</h1>
      <!-- Párrafo descriptivo con información sobre el compromiso de tiempo de respuesta -->
      <p class="subtitle">
        <!-- Texto explicativo que invita a completar el formulario para ser contactado en menos de 24 horas -->
        Complete el siguiente formulario y uno de nuestros ingenieros especialistas se pondrá en contacto con usted en menos de 24 horas.
      <!-- Cierre del párrafo de subtítulo -->
      </p>
    <!-- Cierre de la sección de cabecera -->
    </section>

    <!-- Contenedor con diseño de cuadrícula que divide el formulario y la barra lateral de información -->
    <div class="contacto-grid">
      <!-- Tarjeta contenedora del panel del formulario o del estado de éxito -->
      <div class="form-card">
        <!-- Bloque condicional que se muestra cuando la solicitud se envió con éxito y existe un resumen -->
        <div v-if="enviadoConExito && resumenSolicitud" class="success-box">
          <!-- Icono festivo que celebra la recepción exitosa de la consulta -->
          <div class="success-icon">🎉</div>
          <!-- Título que confirma la recepción exitosa de la solicitud -->
          <h2>¡Solicitud Recibida con Éxito!</h2>
          <!-- Párrafo con mensaje de agradecimiento e interpolación reactiva de los datos de contacto ingresados -->
          <p class="success-msg">
            <!-- Texto de confirmación con nombre, correo y teléfono del solicitante -->
            Gracias <strong>{{ resumenSolicitud.nombre }}</strong>, hemos registrado su requerimiento. Nos comunicaremos a su correo (<strong>{{ resumenSolicitud.email }}</strong>) o vía telefónica al <strong>{{ resumenSolicitud.telefono }}</strong>.
          <!-- Cierre del párrafo del mensaje de agradecimiento -->
          </p>

          <!-- Tarjeta interna que despliega el resumen y detalles de la consulta enviada -->
          <div class="summary-card">
            <!-- Título de la tarjeta de resumen mostrando dinámicamente el número de identificación de la solicitud -->
            <h3>📋 Resumen de la Consulta #{{ resumenSolicitud.id }}</h3>
            <!-- Fila que muestra la fecha y hora en que se envió la solicitud -->
            <div class="summary-item">
              <!-- Etiqueta del dato de fecha y hora -->
              <span class="label">Fecha / Hora:</span>
              <!-- Valor dinámico con la fecha y hora del registro -->
              <span class="val">{{ resumenSolicitud.fecha }}</span>
            <!-- Cierre de la fila de fecha y hora -->
            </div>
            <!-- Fila que muestra el servicio seleccionado por el usuario -->
            <div class="summary-item">
              <!-- Etiqueta del servicio de interés -->
              <span class="label">Servicio de Interés:</span>
              <!-- Nombre del servicio de interés destacado visualmente -->
              <span class="val highlight">{{ resumenSolicitud.servicioNombre }}</span>
            <!-- Cierre de la fila de servicio de interés -->
            </div>
            <!-- Fila que muestra el valor estimado o precio referencial del servicio -->
            <div class="summary-item">
              <!-- Etiqueta del precio referencial -->
              <span class="label">Valor Referencial:</span>
              <!-- Valor dinámico con el precio referencial del servicio -->
              <span class="val">{{ resumenSolicitud.servicioPrecio }}</span>
            <!-- Cierre de la fila de valor referencial -->
            </div>
            <!-- Fila que muestra el mensaje o requerimiento ingresado por el cliente -->
            <div class="summary-item">
              <!-- Etiqueta del detalle del requerimiento -->
              <span class="label">Detalle del Requerimiento:</span>
              <!-- Caja estilizada que contiene el mensaje textual del cliente entre comillas -->
              <p class="msg-box">"{{ resumenSolicitud.mensaje }}"</p>
            <!-- Cierre de la fila del detalle del requerimiento -->
            </div>
          <!-- Cierre de la tarjeta de resumen de la consulta -->
          </div>

          <!-- Botón que permite reiniciar el formulario para realizar otra consulta -->
          <button class="btn-nueva-consulta" @click="nuevaConsulta">
            <!-- Texto e icono del botón para volver a consultar -->
            ➕ Realizar Otra Consulta
          <!-- Cierre del botón de nueva consulta -->
          </button>
        <!-- Cierre del bloque de confirmación exitosa -->
        </div>

        <!-- Formulario que se muestra cuando la solicitud aún no ha sido enviada -->
        <form v-else class="contact-form" @submit.prevent="enviarFormulario" novalidate>
          <!-- Grupo de formulario para el nombre completo con clase condicional de error -->
          <div class="form-group" :class="{ 'has-error': errores.nombre }">
            <!-- Etiqueta accesible para el campo de nombre con asterisco de obligatoriedad -->
            <label for="nombre">Nombre y Apellido <span class="req">*</span></label>
            <!-- Campo de entrada de texto para el nombre completo enlazado bidireccionalmente a form.nombre -->
            <input id="nombre" type="text" v-model="form.nombre" placeholder="Ej: María José Vilches" />
            <!-- Mensaje de error visible si la validación del nombre falla -->
            <span class="error-text" v-if="errores.nombre">{{ errores.nombre }}</span>
          <!-- Cierre del grupo de formulario para el nombre -->
          </div>

          <!-- Fila que organiza en dos columnas los campos de correo y teléfono -->
          <div class="form-row">
            <!-- Grupo de formulario para el correo electrónico con clase condicional de error -->
            <div class="form-group" :class="{ 'has-error': errores.email }">
              <!-- Etiqueta para el correo electrónico con asterisco de obligatoriedad -->
              <label for="email">Correo Electrónico <span class="req">*</span></label>
              <!-- Campo de entrada para el correo electrónico con enlace reactivo a form.email -->
              <input id="email" type="email" v-model="form.email" placeholder="ejemplo@empresa.cl" />
              <!-- Mensaje de error visible si la validación del correo falla -->
              <span class="error-text" v-if="errores.email">{{ errores.email }}</span>
            <!-- Cierre del grupo de formulario para el correo -->
            </div>

            <!-- Grupo de formulario para el número telefónico con clase condicional de error -->
            <div class="form-group" :class="{ 'has-error': errores.telefono }">
              <!-- Etiqueta para el número telefónico o WhatsApp con asterisco de obligatoriedad -->
              <label for="telefono">Teléfono / WhatsApp <span class="req">*</span></label>
              <!-- Campo de entrada para el teléfono con enlace reactivo a form.telefono -->
              <input id="telefono" type="tel" v-model="form.telefono" placeholder="+56 9 1234 5678" />
              <!-- Mensaje de error visible si la validación del teléfono falla -->
              <span class="error-text" v-if="errores.telefono">{{ errores.telefono }}</span>
            <!-- Cierre del grupo de formulario para el teléfono -->
            </div>
          <!-- Cierre de la fila de correo y teléfono -->
          </div>

          <!-- Grupo de formulario para seleccionar el servicio con clase condicional de error -->
          <div class="form-group" :class="{ 'has-error': errores.servicioId }">
            <!-- Etiqueta para el selector de servicio con asterisco de obligatoriedad -->
            <label for="servicioId">Servicio de Interés <span class="req">*</span></label>
            <!-- Selector desplegable vinculado reactivamente al ID de servicio seleccionado -->
            <select id="servicioId" v-model="form.servicioId">
              <!-- Opción deshabilitada inicial que orienta al usuario para que seleccione un servicio -->
              <option value="" disabled>-- Seleccione un servicio del catálogo --</option>
              <!-- Itera sobre cada servicio del almacén generando las opciones dinámicas del selector -->
              <option v-for="s in state.servicios" :key="s.id" :value="s.id">
                <!-- Nombre y precio formateado que se muestran dentro de cada opción -->
                {{ s.nombre }} — ({{ s.precio }})
              <!-- Cierre de la opción de servicio -->
              </option>
            <!-- Cierre del menú desplegable select -->
            </select>
            <!-- Mensaje de error visible si no se ha seleccionado ningún servicio -->
            <span class="error-text" v-if="errores.servicioId">{{ errores.servicioId }}</span>

            <!-- Contenedor de vista previa que muestra detalles del servicio seleccionado si existe -->
            <div class="service-preview" v-if="servicioSeleccionadoObj">
              <!-- Insignia que muestra la categoría del servicio seleccionado -->
              <span class="preview-badge">Categoría: {{ servicioSeleccionadoObj.categoria }}</span>
              <!-- Insignia que muestra la disponibilidad horaria del servicio seleccionado -->
              <span class="preview-badge">Disponibilidad: {{ servicioSeleccionadoObj.disponibilidad }}</span>
            <!-- Cierre de la vista previa del servicio -->
            </div>
          <!-- Cierre del grupo de formulario para el servicio -->
          </div>

          <!-- Grupo de formulario para el mensaje o detalle del requerimiento con clase condicional de error -->
          <div class="form-group" :class="{ 'has-error': errores.mensaje }">
            <!-- Etiqueta para el área de mensaje con asterisco de obligatoriedad -->
            <label for="mensaje">Mensaje / Detalle de la Necesidad <span class="req">*</span></label>
            <!-- Campo de texto multilínea vinculado a form.mensaje con 4 filas de alto y texto orientativo -->
            <textarea id="mensaje" v-model="form.mensaje" rows="4" placeholder="Describa brevemente el proyecto, cantidad de usuarios, plazos esperados o consultas técnicas..."></textarea>
            <!-- Mensaje de error visible si la validación del mensaje falla -->
            <span class="error-text" v-if="errores.mensaje">{{ errores.mensaje }}</span>
          <!-- Cierre del grupo de formulario para el mensaje -->
          </div>

          <!-- Botón de envío que activa la validación y el registro del formulario al hacer clic -->
          <button type="submit" class="btn-submit">
            <!-- Texto e icono ilustrativo del botón de envío -->
            🚀 Enviar Solicitud de Información
          <!-- Cierre del botón de envío -->
          </button>
        <!-- Cierre de la etiqueta de formulario -->
        </form>
      <!-- Cierre de la tarjeta form-card -->
      </div>

      <!-- Barra lateral informativa con datos de la empresa y garantías -->
      <aside class="info-sidebar">
        <!-- Tarjeta con la información de contacto corporativa -->
        <div class="info-card">
          <!-- Título principal de la tarjeta de información corporativa -->
          <h3>📍 Información de la Empresa</h3>
          <!-- Párrafo que muestra el eslogan corporativo de la empresa obtenido del almacén global -->
          <p class="company-desc">{{ state.empresa.slogan }}</p>

          <!-- Contenedor con la lista de filas con datos de contacto -->
          <div class="info-items-list">
            <!-- Fila que contiene la dirección física central de la empresa -->
            <div class="info-row">
              <!-- Icono ilustrativo de edificio corporativo -->
              <span class="info-icon">🏢</span>
              <!-- Contenedor de texto con el título y la dirección física -->
              <div>
                <!-- Título que indica la dirección central -->
                <strong>Dirección Central</strong>
                <!-- Dirección física institucional obtenida del almacén global -->
                <p>{{ state.empresa.ubicacion }}</p>
              <!-- Cierre del contenedor de textos de la dirección -->
              </div>
            <!-- Cierre de la fila de dirección central -->
            </div>

            <!-- Fila que contiene el correo electrónico oficial -->
            <div class="info-row">
              <!-- Icono ilustrativo de sobre de correo -->
              <span class="info-icon">✉️</span>
              <!-- Contenedor de texto con el título y el correo electrónico -->
              <div>
                <!-- Título que indica el correo oficial -->
                <strong>Correo Oficial</strong>
                <!-- Dirección de correo electrónico obtenida del almacén global -->
                <p>{{ state.empresa.email }}</p>
              <!-- Cierre del contenedor de textos del correo -->
              </div>
            <!-- Cierre de la fila de correo oficial -->
            </div>

            <!-- Fila que contiene el número de atención telefónica -->
            <div class="info-row">
              <!-- Icono ilustrativo de teléfono -->
              <span class="info-icon">📞</span>
              <!-- Contenedor de texto con el título y el número de teléfono -->
              <div>
                <!-- Título que indica la atención telefónica -->
                <strong>Atención Telefónica</strong>
                <!-- Número telefónico de atención obtenido del almacén global -->
                <p>{{ state.empresa.telefono }}</p>
              <!-- Cierre del contenedor de textos del teléfono -->
              </div>
            <!-- Cierre de la fila de atención telefónica -->
            </div>

            <!-- Fila que contiene los días y horarios de atención al público -->
            <div class="info-row">
              <!-- Icono ilustrativo de reloj -->
              <span class="info-icon">⏱️</span>
              <!-- Contenedor de texto con el título y el horario de trabajo -->
              <div>
                <!-- Título que indica el horario de operación -->
                <strong>Horario de Operación</strong>
                <!-- Horario de atención al público obtenido del almacén global -->
                <p>{{ state.empresa.horario }}</p>
              <!-- Cierre del contenedor de textos del horario -->
              </div>
            <!-- Cierre de la fila de horario de operación -->
            </div>
          <!-- Cierre de la lista de filas de contacto -->
          </div>
        <!-- Cierre de la tarjeta de información corporativa -->
        </div>

        <!-- Tarjeta destacada con el compromiso de confidencialidad y privacidad -->
        <div class="guarantee-card">
          <!-- Icono de escudo que representa seguridad y protección -->
          <div class="g-icon">🛡️</div>
          <!-- Contenedor de texto con el título y la descripción del compromiso -->
          <div>
            <!-- Título del compromiso de confidencialidad -->
            <h4>Compromiso de Confidencialidad</h4>
            <!-- Descripción que garantiza el uso seguro y privado de la información suministrada -->
            <p>Todos los datos proporcionados son tratados bajo estricta confidencialidad y utilizados únicamente para emitir su propuesta.</p>
          <!-- Cierre del contenedor de textos de confidencialidad -->
          </div>
        <!-- Cierre de la tarjeta de garantía -->
        </div>
      <!-- Cierre de la barra lateral info-sidebar -->
      </aside>
    <!-- Cierre de la cuadrícula contacto-grid -->
    </div>
  <!-- Cierre del contenedor principal contacto-page -->
  </div>
<!-- Cierre del bloque de plantilla template -->
</template>

<!-- Bloque de estilos CSS scoped con alcance exclusivo para los elementos de este componente -->
<style scoped>
/* Regla de estilos para el contenedor principal de la vista de contacto (.contacto-page) */
.contacto-page {
  /* Establece un esquema de visualización flexible (Flexbox) */
  display: flex;
  /* Organiza los elementos secundarios apilados verticalmente en columna */
  flex-direction: column;
  /* Agrega un espacio de separación de 36 píxeles entre cada bloque hijo */
  gap: 36px;
/* Cierre de la regla .contacto-page */
}

/* Regla de estilos para la cabecera de la página de contacto (.contacto-header) */
.contacto-header {
  /* Centra horizontalmente todos los textos dentro de la cabecera */
  text-align: center;
  /* Establece un ancho máximo de 750 píxeles para mantener una lectura visualmente equilibrada */
  max-width: 750px;
  /* Centra automáticamente el bloque horizontalmente en la página */
  margin: 0 auto;
/* Cierre de la regla .contacto-header */
}

/* Regla de estilos para la etiqueta o insignia decorativa (.badge-tag) */
.badge-tag {
  /* Permite que el elemento se comporte como bloque en línea respetando dimensiones */
  display: inline-block;
  /* Define el color del texto en azul corporativo */
  color: #2563eb;
  /* Asigna un tamaño de tipografía pequeño de 0.8rem */
  font-size: 0.8rem;
  /* Aplica un grosor de fuente en negrita (700) para destacar */
  font-weight: 700;
  /* Transforma todas las letras a mayúsculas sostenidas */
  text-transform: uppercase;
  /* Añade un espaciado entre letras de 0.1em para dar un toque estilizado */
  letter-spacing: 0.1em;
  /* Define un color de fondo azul muy suave para contrastar con el texto */
  background: #dbeafe;
  /* Agrega espaciado interior: 4 píxeles arriba/abajo y 12 píxeles a los laterales */
  padding: 4px 12px;
  /* Redondea completamente los bordes creando una forma de píldora */
  border-radius: 20px;
  /* Añade un margen inferior de 12 píxeles para separar del título siguiente */
  margin-bottom: 12px;
/* Cierre de la regla .badge-tag */
}

/* Regla de estilos para el título principal h1 de la cabecera de contacto */
.contacto-header h1 {
  /* Establece un tamaño de fuente destacado de 2.5rem */
  font-size: 2.5rem;
  /* Asigna un color gris oscuro profundo casi negro para excelente contraste */
  color: #0f172a;
  /* Elimina márgenes superior y laterales, agregando 12 píxeles en la parte inferior */
  margin: 0 0 12px 0;
/* Cierre de la regla .contacto-header h1 */
}

/* Regla de estilos para el subtítulo explicativo (.subtitle) */
.subtitle {
  /* Asigna un tamaño de tipografía cómodo de 1.1rem */
  font-size: 1.1rem;
  /* Define un color gris pizarra medio para jerarquía visual secundaria */
  color: #64748b;
  /* Establece una altura de línea de 1.6 para mejorar la legibilidad del párrafo */
  line-height: 1.6;
/* Cierre de la regla .subtitle */
}

/* Regla de estilos para la cuadrícula principal que divide formulario y barra lateral (.contacto-grid) */
.contacto-grid {
  /* Aplica el sistema de diseño CSS Grid en cuadrícula */
  display: grid;
  /* Configura dos columnas proporcionales: 1.8fr para formulario y 1.2fr para información */
  grid-template-columns: 1.8fr 1.2fr;
  /* Establece un espacio de separación de 32 píxeles entre columnas */
  gap: 32px;
/* Cierre de la regla .contacto-grid */
}

/* Regla de diseño responsivo para pantallas de ancho máximo de 860 píxeles */
@media (max-width: 860px) {
  /* Modifica la cuadrícula de contacto para dispositivos medianos y pequeños */
  .contacto-grid {
    /* Ajusta la cuadrícula a una sola columna para que los paneles se muestren apilados */
    grid-template-columns: 1fr;
  /* Cierre de la regla .contacto-grid dentro de media query */
  }
/* Cierre de la consulta de medios de 860px */
}

/* Regla de estilos para la tarjeta contenedora del formulario (.form-card) */
.form-card {
  /* Asigna un color de fondo blanco puro a la tarjeta */
  background: #ffffff;
  /* Aplica bordes redondeados con un radio moderno de 20 píxeles */
  border-radius: 20px;
  /* Añade un relleno interno generoso de 36 píxeles en todos los costados */
  padding: 36px;
  /* Aplica un borde sólido fino de 1 píxel en gris claro */
  border: 1px solid #e2e8f0;
  /* Agrega una sombra sutil para dar sensación de profundidad y relieve visual */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
/* Cierre de la regla .form-card */
}

/* Regla de estilos para el formulario de contacto (.contact-form) */
.contact-form {
  /* Utiliza Flexbox para ordenar los campos de formulario */
  display: flex;
  /* Alinea todos los campos verticalmente en columna */
  flex-direction: column;
  /* Añade una separación de 20 píxeles entre cada campo o fila del formulario */
  gap: 20px;
/* Cierre de la regla .contact-form */
}

/* Regla de estilos para la fila de campos dobles (.form-row) */
.form-row {
  /* Emplea un sistema CSS Grid para posicionar campos uno al lado del otro */
  display: grid;
  /* Distribuye los campos en dos columnas de igual ancho (1fr cada una) */
  grid-template-columns: 1fr 1fr;
  /* Establece una separación de 16 píxeles entre los campos de la fila */
  gap: 16px;
/* Cierre de la regla .form-row */
}

/* Regla de diseño responsivo para dispositivos móviles con pantallas de hasta 600 píxeles */
@media (max-width: 600px) {
  /* Modifica la disposición de la fila en pantallas angostas */
  .form-row {
    /* Colapsa los dos campos en una sola columna vertical apilada */
    grid-template-columns: 1fr;
  /* Cierre de la regla .form-row dentro de media query */
  }
/* Cierre de la consulta de medios de 600px */
}

/* Regla de estilos para cada grupo de campo del formulario (.form-group) */
.form-group {
  /* Utiliza Flexbox para ordenar etiqueta, control y error */
  display: flex;
  /* Apila la etiqueta y el control de entrada de forma vertical */
  flex-direction: column;
  /* Agrega una separación de 6 píxeles entre la etiqueta y el campo */
  gap: 6px;
/* Cierre de la regla .form-group */
}

/* Regla de estilos para las etiquetas de texto de cada campo (.form-group label) */
.form-group label {
  /* Define un tamaño de tipografía de 0.9rem */
  font-size: 0.9rem;
  /* Aplica un peso de fuente seminegrita (600) para asegurar legibilidad */
  font-weight: 600;
  /* Asigna un color gris azulado oscuro para el texto de la etiqueta */
  color: #334155;
/* Cierre de la regla .form-group label */
}

/* Regla de estilos para el asterisco que denota campos obligatorios (.req) */
.req {
  /* Asigna un color rojo intenso para destacar la obligatoriedad del campo */
  color: #dc2626;
/* Cierre de la regla .req */
}

/* Regla de estilos compartida para todos los controles interactivos: inputs, selects y textareas */
input, select, textarea {
  /* Añade un relleno interno cómodo: 12 píxeles vertical y 14 píxeles horizontal */
  padding: 12px 14px;
  /* Redondea las esquinas del control con un radio de 10 píxeles */
  border-radius: 10px;
  /* Aplica un borde sólido de 1.5 píxeles en tono gris suave */
  border: 1.5px solid #cbd5e1;
  /* Asigna un tamaño de tipografía de 0.95rem para fácil lectura */
  font-size: 0.95rem;
  /* Hereda la tipografía de la aplicación para mantener uniformidad */
  font-family: inherit;
  /* Elimina el contorno predeterminado del navegador al hacer clic */
  outline: none;
  /* Establece un fondo blanco limpio para el área de escritura */
  background: white;
  /* Define transiciones suaves de 0.2 segundos para el cambio de borde y sombra */
  transition: border-color 0.2s, box-shadow 0.2s;
/* Cierre de la regla de estilos compartidos de inputs, selects y textareas */
}

/* Regla de estilos visuales cuando cualquier control recibe el foco de escritura */
input:focus, select:focus, textarea:focus {
  /* Cambia el color del borde a azul corporativo indicando campo activo */
  border-color: #2563eb;
  /* Añade un halo o resplandor exterior azul translúcido de 3 píxeles */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
/* Cierre de la regla de estilos de enfoque activo */
}

/* Regla de estilos para los campos que poseen un error de validación */
.has-error input, .has-error select, .has-error textarea {
  /* Cambia el borde a color rojo de alerta */
  border-color: #ef4444;
  /* Aplica un fondo sutilmente rojizo para resaltar visualmente el error */
  background: #fffcfc;
/* Cierre de la regla de controles con error */
}

/* Regla de estilos para el texto descriptivo del mensaje de error (.error-text) */
.error-text {
  /* Asigna un color rojo intenso de advertencia al texto de error */
  color: #dc2626;
  /* Define un tamaño de tipografía compacto de 0.82rem */
  font-size: 0.82rem;
  /* Aplica un grosor de fuente mediano (500) para legibilidad */
  font-weight: 500;
/* Cierre de la regla .error-text */
}

/* Regla de estilos para el contenedor de vista previa del servicio seleccionado (.service-preview) */
.service-preview {
  /* Utiliza Flexbox para alinear las insignias horizontalmente */
  display: flex;
  /* Añade una separación de 8 píxeles entre insignias informativas */
  gap: 8px;
  /* Agrega un margen superior de 4 píxeles respecto al selector */
  margin-top: 4px;
/* Cierre de la regla .service-preview */
}

/* Regla de estilos para las insignias con datos del servicio seleccionado (.preview-badge) */
.preview-badge {
  /* Asigna un tamaño de tipografía pequeño de 0.75rem */
  font-size: 0.75rem;
  /* Define un fondo gris claro neutro */
  background: #f1f5f9;
  /* Establece un color de texto gris pizarra para buena legibilidad */
  color: #475569;
  /* Agrega espaciado interior: 3 píxeles vertical y 8 píxeles horizontal */
  padding: 3px 8px;
  /* Redondea las esquinas con un radio de 6 píxeles */
  border-radius: 6px;
/* Cierre de la regla .preview-badge */
}

/* Regla de estilos para el botón de envío del formulario (.btn-submit) */
.btn-submit {
  /* Agrega un relleno generoso: 14 píxeles vertical y 24 píxeles horizontal */
  padding: 14px 24px;
  /* Aplica un fondo con degradado diagonal moderno en tonos azules */
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  /* Define el color del texto del botón en blanco */
  color: white;
  /* Elimina el borde predeterminado del botón */
  border: none;
  /* Aplica esquinas redondeadas con un radio de 12 píxeles */
  border-radius: 12px;
  /* Asigna un tamaño de tipografía de 1rem */
  font-size: 1rem;
  /* Aplica un peso de fuente en negrita (700) para destacar la acción */
  font-weight: 700;
  /* Transforma el cursor a puntero tipo mano al posicionarse sobre el botón */
  cursor: pointer;
  /* Configura una transición suave de 0.2 segundos para todas las propiedades visuales */
  transition: all 0.2s;
  /* Añade una sombra azul translúcida para dar efecto de relieve tridimensional */
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  /* Agrega un margen superior de 10 píxeles para separarlo del campo previo */
  margin-top: 10px;
/* Cierre de la regla .btn-submit */
}

/* Regla para el efecto hover interactivo al pasar el cursor sobre el botón de envío */
.btn-submit:hover {
  /* Desplaza ligeramente el botón 2 píxeles hacia arriba simulando elevación */
  transform: translateY(-2px);
  /* Incrementa la intensidad de la sombra para acentuar la elevación */
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.4);
/* Cierre del efecto hover de .btn-submit */
}

/* Regla de estilos para el contenedor del mensaje de confirmación exitosa (.success-box) */
.success-box {
  /* Centra horizontalmente todo el contenido del panel de éxito */
  text-align: center;
  /* Aplica un relleno interno de 10 píxeles */
  padding: 10px;
/* Cierre de la regla .success-box */
}

/* Regla de estilos para el icono celebratorio de confirmación (.success-icon) */
.success-icon {
  /* Asigna un tamaño de fuente de 3.5rem para gran impacto visual */
  font-size: 3.5rem;
  /* Añade un margen inferior de 12 píxeles para separar del título */
  margin-bottom: 12px;
/* Cierre de la regla .success-icon */
}

/* Regla de estilos para el título principal de éxito dentro de success-box */
.success-box h2 {
  /* Asigna un color verde bosque que comunica confirmación y éxito */
  color: #15803d;
  /* Establece un tamaño de fuente de 1.6rem */
  font-size: 1.6rem;
  /* Añade un margen inferior de 10 píxeles hacia el mensaje de confirmación */
  margin-bottom: 10px;
/* Cierre de la regla .success-box h2 */
}

/* Regla de estilos para el texto descriptivo del mensaje de éxito (.success-msg) */
.success-msg {
  /* Asigna un color gris oscuro para buena lectura */
  color: #475569;
  /* Establece un tamaño de tipografía de 0.98rem */
  font-size: 0.98rem;
  /* Define una altura de línea de 1.6 para óptimo espaciado entre renglones */
  line-height: 1.6;
  /* Añade un margen inferior de 24 píxeles para separar de la tarjeta resumen */
  margin-bottom: 24px;
/* Cierre de la regla .success-msg */
}

/* Regla de estilos para la tarjeta de resumen de la solicitud (.summary-card) */
.summary-card {
  /* Asigna un fondo gris azulado suave */
  background: #f8fafc;
  /* Delimita la tarjeta con un borde fino de 1 píxel en gris claro */
  border: 1px solid #e2e8f0;
  /* Aplica esquinas redondeadas con radio de 14 píxeles */
  border-radius: 14px;
  /* Agrega un relleno interior de 20 píxeles en todos los costados */
  padding: 20px;
  /* Alinea el texto a la izquierda para organizar la lista de datos */
  text-align: left;
  /* Añade un margen inferior de 24 píxeles antes del botón */
  margin-bottom: 24px;
/* Cierre de la regla .summary-card */
}

/* Regla de estilos para el encabezado de la tarjeta de resumen (.summary-card h3) */
.summary-card h3 {
  /* Establece un tamaño de tipografía de 1.05rem */
  font-size: 1.05rem;
  /* Define un color gris oscuro casi negro para el título */
  color: #0f172a;
  /* Remueve el margen superior */
  margin-top: 0;
  /* Añade un margen inferior de 14 píxeles hacia los datos */
  margin-bottom: 14px;
  /* Dibuja una línea divisoria inferior de 1 píxel para separar del contenido */
  border-bottom: 1px solid #e2e8f0;
  /* Agrega un espaciado de 8 píxeles sobre la línea divisoria */
  padding-bottom: 8px;
/* Cierre de la regla .summary-card h3 */
}

/* Regla de estilos para cada fila individual de datos del resumen (.summary-item) */
.summary-item {
  /* Aplica Flexbox para estructurar la fila */
  display: flex;
  /* Apila la etiqueta y el valor verticalmente en columna */
  flex-direction: column;
  /* Añade una separación inferior de 10 píxeles entre filas del resumen */
  margin-bottom: 10px;
  /* Establece un espacio mínimo de 2 píxeles entre etiqueta y valor */
  gap: 2px;
/* Cierre de la regla .summary-item */
}

/* Regla de estilos para la etiqueta o nombre del dato en el resumen (.summary-item .label) */
.summary-item .label {
  /* Define un tamaño de tipografía pequeño de 0.78rem */
  font-size: 0.78rem;
  /* Transforma las letras a mayúsculas sostenidas */
  text-transform: uppercase;
  /* Asigna un color gris tenue para no competir con el dato */
  color: #94a3b8;
  /* Aplica un peso de fuente seminegrita (600) */
  font-weight: 600;
/* Cierre de la regla .summary-item .label */
}

/* Regla de estilos para el valor textual del dato en el resumen (.summary-item .val) */
.summary-item .val {
  /* Define un tamaño de fuente de 0.95rem */
  font-size: 0.95rem;
  /* Asigna un color gris azulado oscuro para el texto principal */
  color: #1e293b;
  /* Aplica un grosor de fuente medio (500) */
  font-weight: 500;
/* Cierre de la regla .summary-item .val */
}

/* Regla de estilos para resaltar valores destacados en el resumen (.summary-item .val.highlight) */
.summary-item .val.highlight {
  /* Asigna un color azul corporativo llamativo al valor destacado */
  color: #2563eb;
  /* Aplica peso de tipografía en negrita (700) */
  font-weight: 700;
/* Cierre de la regla .summary-item .val.highlight */
}

/* Regla de estilos para la caja que encierra el mensaje del cliente en el resumen (.msg-box) */
.msg-box {
  /* Define un fondo blanco puro que resalta sobre el fondo del resumen */
  background: white;
  /* Añade un relleno interno: 10 píxeles vertical y 14 píxeles horizontal */
  padding: 10px 14px;
  /* Redondea las esquinas con un radio de 8 píxeles */
  border-radius: 8px;
  /* Aplica un borde gris claro para delimitar la cita del mensaje */
  border: 1px solid #cbd5e1;
  /* Asigna un color de texto gris pizarra */
  color: #334155;
  /* Define un tamaño de fuente de 0.9rem */
  font-size: 0.9rem;
  /* Aplica estilo cursivo para distinguir la cita textual */
  font-style: italic;
  /* Asigna un margen superior de 4 píxeles y elimina los restantes */
  margin: 4px 0 0 0;
/* Cierre de la regla .msg-box */
}

/* Regla de estilos para el botón de realizar otra consulta (.btn-nueva-consulta) */
.btn-nueva-consulta {
  /* Añade un relleno interno: 12 píxeles vertical y 24 píxeles horizontal */
  padding: 12px 24px;
  /* Define un color de fondo azul corporativo */
  background: #2563eb;
  /* Asigna el color del texto en blanco */
  color: white;
  /* Remueve el borde predeterminado del botón */
  border: none;
  /* Redondea las esquinas con un radio de 10 píxeles */
  border-radius: 10px;
  /* Aplica un grosor de tipografía en negrita (700) */
  font-weight: 700;
  /* Cambia el cursor a puntero interactivo tipo mano */
  cursor: pointer;
  /* Establece una transición suave de 0.2 segundos para el cambio de fondo */
  transition: background 0.2s;
/* Cierre de la regla .btn-nueva-consulta */
}

/* Regla para el efecto hover al pasar el cursor sobre el botón de nueva consulta */
.btn-nueva-consulta:hover {
  /* Oscurece el color de fondo a un azul más profundo */
  background: #1d4ed8;
/* Cierre del efecto hover de .btn-nueva-consulta */
}

/* Regla de estilos para la barra lateral de información (.info-sidebar) */
.info-sidebar {
  /* Emplea Flexbox para apilar las tarjetas informativas */
  display: flex;
  /* Alinea las tarjetas lateralmente en orientación de columna */
  flex-direction: column;
  /* Establece un espacio de separación de 20 píxeles entre las tarjetas */
  gap: 20px;
/* Cierre de la regla .info-sidebar */
}

/* Regla de estilos para la tarjeta con información corporativa (.info-card) */
.info-card {
  /* Asigna un fondo blanco puro a la tarjeta */
  background: #ffffff;
  /* Aplica un borde fino de 1 píxel en gris claro */
  border: 1px solid #e2e8f0;
  /* Redondea las esquinas con un radio de 20 píxeles */
  border-radius: 20px;
  /* Añade un relleno interior generoso de 30 píxeles */
  padding: 30px;
  /* Aplica una sombra suave para lograr una sensación sutil de elevación */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
/* Cierre de la regla .info-card */
}

/* Regla de estilos para el título de la tarjeta informativa (.info-card h3) */
.info-card h3 {
  /* Establece un tamaño de tipografía de 1.25rem */
  font-size: 1.25rem;
  /* Asigna un color gris oscuro para el texto del título */
  color: #0f172a;
  /* Remueve el margen superior predeterminado */
  margin-top: 0;
  /* Añade un margen inferior de 6 píxeles hacia la descripción */
  margin-bottom: 6px;
/* Cierre de la regla .info-card h3 */
}

/* Regla de estilos para el eslogan corporativo (.company-desc) */
.company-desc {
  /* Asigna un tamaño de tipografía de 0.9rem */
  font-size: 0.9rem;
  /* Define un color gris pizarra medio */
  color: #64748b;
  /* Añade un margen inferior de 24 píxeles antes de la lista de datos */
  margin-bottom: 24px;
  /* Establece una altura de línea de 1.5 para una lectura cómoda */
  line-height: 1.5;
/* Cierre de la regla .company-desc */
}

/* Regla de estilos para la lista que apila las filas informativas (.info-items-list) */
.info-items-list {
  /* Utiliza Flexbox para estructurar las filas */
  display: flex;
  /* Alinea las filas verticalmente en columna */
  flex-direction: column;
  /* Establece una separación de 18 píxeles entre cada fila informativa */
  gap: 18px;
/* Cierre de la regla .info-items-list */
}

/* Regla de estilos para cada fila individual de información (.info-row) */
.info-row {
  /* Aplica Flexbox para situar el icono al costado del bloque de texto */
  display: flex;
  /* Establece una separación de 14 píxeles entre el icono y los textos */
  gap: 14px;
  /* Alinea los elementos al inicio superior del contenedor */
  align-items: flex-start;
/* Cierre de la regla .info-row */
}

/* Regla de estilos para la caja contenedora del icono informativo (.info-icon) */
.info-icon {
  /* Asigna un tamaño de fuente de 1.4rem para el icono */
  font-size: 1.4rem;
  /* Define un fondo azul muy suave para la caja del icono */
  background: #eff6ff;
  /* Establece un ancho fijo de 40 píxeles */
  width: 40px;
  /* Establece una altura fija de 40 píxeles */
  height: 40px;
  /* Redondea las esquinas de la caja con un radio de 10 píxeles */
  border-radius: 10px;
  /* Utiliza Flexbox para centrar el icono dentro de la caja */
  display: flex;
  /* Centra el icono horizontalmente en el eje principal */
  align-items: center;
  /* Centra el icono verticalmente en el eje secundario */
  justify-content: center;
  /* Evita que el contenedor del icono se encoja si el texto contiguo es largo */
  flex-shrink: 0;
/* Cierre de la regla .info-icon */
}

/* Regla de estilos para el encabezado en negrita de la fila informativa (.info-row strong) */
.info-row strong {
  /* Configura el elemento como bloque para posicionar el párrafo debajo */
  display: block;
  /* Asigna un tamaño de tipografía de 0.9rem */
  font-size: 0.9rem;
  /* Define un color gris oscuro para el título del dato */
  color: #0f172a;
  /* Añade un pequeño margen inferior de 2 píxeles antes del texto */
  margin-bottom: 2px;
/* Cierre de la regla .info-row strong */
}

/* Regla de estilos para el párrafo con el valor del dato informativo (.info-row p) */
.info-row p {
  /* Elimina los márgenes predeterminados del párrafo */
  margin: 0;
  /* Asigna un tamaño de tipografía de 0.88rem */
  font-size: 0.88rem;
  /* Define un color gris pizarra suave para el texto */
  color: #64748b;
  /* Establece una altura de línea de 1.4 para optimizar el espacio vertical */
  line-height: 1.4;
/* Cierre de la regla .info-row p */
}

/* Regla de estilos para la tarjeta de garantía y confidencialidad (.guarantee-card) */
.guarantee-card {
  /* Define un fondo verde menta tenue que transmite confianza y seguridad */
  background: #f0fdf4;
  /* Delimita la tarjeta con un borde verde claro de 1 píxel */
  border: 1px solid #bbf7d0;
  /* Redondea las esquinas con un radio de 16 píxeles */
  border-radius: 16px;
  /* Añade un relleno interno de 20 píxeles en todos los lados */
  padding: 20px;
  /* Utiliza Flexbox para alinear el icono al lado del bloque de texto */
  display: flex;
  /* Añade una separación horizontal de 14 píxeles entre el icono y los textos */
  gap: 14px;
  /* Centra verticalmente los elementos de la fila */
  align-items: center;
/* Cierre de la regla .guarantee-card */
}

/* Regla de estilos para el icono dentro de la tarjeta de garantía (.g-icon) */
.g-icon {
  /* Asigna un tamaño de 2rem para destacar el icono del escudo */
  font-size: 2rem;
  /* Evita que el icono se comprima ante cambios de espacio */
  flex-shrink: 0;
/* Cierre de la regla .g-icon */
}

/* Regla de estilos para el título del compromiso de confidencialidad (.guarantee-card h4) */
.guarantee-card h4 {
  /* Elimina márgenes superior y laterales, dejando 4 píxeles abajo */
  margin: 0 0 4px 0;
  /* Asigna un color verde bosque oscuro para transmitir seriedad */
  color: #166534;
  /* Establece un tamaño de tipografía de 0.95rem */
  font-size: 0.95rem;
/* Cierre de la regla .guarantee-card h4 */
}

/* Regla de estilos para el párrafo descriptivo del compromiso (.guarantee-card p) */
.guarantee-card p {
  /* Elimina los márgenes predeterminados del párrafo */
  margin: 0;
  /* Asigna un tamaño de tipografía de 0.82rem */
  font-size: 0.82rem;
  /* Define un color verde intermedio para el texto de la política */
  color: #15803d;
  /* Establece una altura de línea de 1.45 para lectura fluida */
  line-height: 1.45;
/* Cierre de la regla .guarantee-card p */
}
/* Fin del bloque de estilos scoped */
</style>
