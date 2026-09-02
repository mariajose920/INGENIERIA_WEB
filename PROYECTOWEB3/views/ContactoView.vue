<script setup>
import { ref, computed, onMounted } from 'vue'
import { useServiciosStore } from '../stores/useServiciosStore.js'

const { state, registrarSolicitud, limpiarServicioSeleccionado } = useServiciosStore()

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  servicioId: '',
  mensaje: ''
})

const errores = ref({})
const enviadoConExito = ref(false)
const resumenSolicitud = ref(null)

onMounted(() => {
  // If user selected a service in catalog, prefill it
  if (state.servicioSeleccionado) {
    form.value.servicioId = state.servicioSeleccionado.id
  }
})

const servicioSeleccionadoObj = computed(() => {
  if (!form.value.servicioId) return null
  return state.servicios.find(s => s.id === Number(form.value.servicioId))
})

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validarTelefono(tel) {
  const clean = tel.replace(/[\s\-\+\(\)]/g, '')
  return clean.length >= 8 && /^\d+$/.test(clean)
}

function validarFormulario() {
  errores.value = {}

  if (!form.value.nombre.trim()) {
    errores.value.nombre = 'El nombre completo es obligatorio.'
  } else if (form.value.nombre.trim().length < 3) {
    errores.value.nombre = 'Ingrese un nombre de al menos 3 caracteres.'
  }

  if (!form.value.email.trim()) {
    errores.value.email = 'El correo electrónico es obligatorio.'
  } else if (!validarEmail(form.value.email.trim())) {
    errores.value.email = 'Ingrese un correo electrónico válido (ej: contacto@empresa.cl).'
  }

  if (!form.value.telefono.trim()) {
    errores.value.telefono = 'El teléfono de contacto es obligatorio.'
  } else if (!validarTelefono(form.value.telefono.trim())) {
    errores.value.telefono = 'Ingrese un número telefónico válido (mínimo 8 dígitos).'
  }

  if (!form.value.servicioId) {
    errores.value.servicioId = 'Debe seleccionar el servicio de su interés.'
  }

  if (!form.value.mensaje.trim()) {
    errores.value.mensaje = 'Por favor detalle su requerimiento o consulta.'
  } else if (form.value.mensaje.trim().length < 10) {
    errores.value.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  }

  return Object.keys(errores.value).length === 0
}

function enviarFormulario() {
  if (!validarFormulario()) {
    return
  }

  const servicio = state.servicios.find(s => s.id === Number(form.value.servicioId))

  const solicitudData = {
    nombre: form.value.nombre.trim(),
    email: form.value.email.trim(),
    telefono: form.value.telefono.trim(),
    servicioNombre: servicio ? servicio.nombre : 'Consulta General',
    servicioPrecio: servicio ? servicio.precio : '—',
    mensaje: form.value.mensaje.trim()
  }

  const guardada = registrarSolicitud(solicitudData)
  resumenSolicitud.value = guardada
  enviadoConExito.value = true

  // Reset form
  form.value = {
    nombre: '',
    email: '',
    telefono: '',
    servicioId: '',
    mensaje: ''
  }
  limpiarServicioSeleccionado()
}

function nuevaConsulta() {
  enviadoConExito.value = false
  resumenSolicitud.value = null
  errores.value = {}
}
</script>

<template>
  <div class="contacto-page">
    <!-- Header -->
    <section class="contacto-header">
      <span class="badge-tag">Atención Personalizada</span>
      <h1>Solicitud de Información & Cotizaciones</h1>
      <p class="subtitle">
        Complete el siguiente formulario y uno de nuestros ingenieros especialistas se pondrá en contacto con usted en menos de 24 horas.
      </p>
    </section>

    <!-- Main grid -->
    <div class="contacto-grid">
      <!-- Form Panel -->
      <div class="form-card">
        <!-- Success State -->
        <div v-if="enviadoConExito && resumenSolicitud" class="success-box">
          <div class="success-icon">🎉</div>
          <h2>¡Solicitud Recibida con Éxito!</h2>
          <p class="success-msg">
            Gracias <strong>{{ resumenSolicitud.nombre }}</strong>, hemos registrado su requerimiento. Nos comunicaremos a su correo (<strong>{{ resumenSolicitud.email }}</strong>) o vía telefónica al <strong>{{ resumenSolicitud.telefono }}</strong>.
          </p>

          <div class="summary-card">
            <h3>📋 Resumen de la Consulta #{{ resumenSolicitud.id }}</h3>
            <div class="summary-item">
              <span class="label">Fecha / Hora:</span>
              <span class="val">{{ resumenSolicitud.fecha }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Servicio de Interés:</span>
              <span class="val highlight">{{ resumenSolicitud.servicioNombre }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Valor Referencial:</span>
              <span class="val">{{ resumenSolicitud.servicioPrecio }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Detalle del Requerimiento:</span>
              <p class="msg-box">"{{ resumenSolicitud.mensaje }}"</p>
            </div>
          </div>

          <button class="btn-nueva-consulta" @click="nuevaConsulta">
            ➕ Realizar Otra Consulta
          </button>
        </div>

        <!-- Form -->
        <form v-else class="contact-form" @submit.prevent="enviarFormulario" novalidate>
          <div class="form-group" :class="{ 'has-error': errores.nombre }">
            <label for="nombre">Nombre y Apellido <span class="req">*</span></label>
            <input 
              id="nombre"
              type="text" 
              v-model="form.nombre" 
              placeholder="Ej: María José Vilches" 
            />
            <span class="error-text" v-if="errores.nombre">{{ errores.nombre }}</span>
          </div>

          <div class="form-row">
            <div class="form-group" :class="{ 'has-error': errores.email }">
              <label for="email">Correo Electrónico <span class="req">*</span></label>
              <input 
                id="email"
                type="email" 
                v-model="form.email" 
                placeholder="ejemplo@empresa.cl" 
              />
              <span class="error-text" v-if="errores.email">{{ errores.email }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': errores.telefono }">
              <label for="telefono">Teléfono / WhatsApp <span class="req">*</span></label>
              <input 
                id="telefono"
                type="tel" 
                v-model="form.telefono" 
                placeholder="+56 9 1234 5678" 
              />
              <span class="error-text" v-if="errores.telefono">{{ errores.telefono }}</span>
            </div>
          </div>

          <div class="form-group" :class="{ 'has-error': errores.servicioId }">
            <label for="servicioId">Servicio de Interés <span class="req">*</span></label>
            <select id="servicioId" v-model="form.servicioId">
              <option value="" disabled>-- Seleccione un servicio del catálogo --</option>
              <option v-for="s in state.servicios" :key="s.id" :value="s.id">
                {{ s.nombre }} — ({{ s.precio }})
              </option>
            </select>
            <span class="error-text" v-if="errores.servicioId">{{ errores.servicioId }}</span>
            
            <div class="service-preview" v-if="servicioSeleccionadoObj">
              <span class="preview-badge">Categoría: {{ servicioSeleccionadoObj.categoria }}</span>
              <span class="preview-badge">Disponibilidad: {{ servicioSeleccionadoObj.disponibilidad }}</span>
            </div>
          </div>

          <div class="form-group" :class="{ 'has-error': errores.mensaje }">
            <label for="mensaje">Mensaje / Detalle de la Necesidad <span class="req">*</span></label>
            <textarea 
              id="mensaje"
              v-model="form.mensaje" 
              rows="4"
              placeholder="Describa brevemente el proyecto, cantidad de usuarios, plazos esperados o consultas técnicas..."
            ></textarea>
            <span class="error-text" v-if="errores.mensaje">{{ errores.mensaje }}</span>
          </div>

          <button type="submit" class="btn-submit">
            🚀 Enviar Solicitud de Información
          </button>
        </form>
      </div>

      <!-- Company Info Panel -->
      <aside class="info-sidebar">
        <div class="info-card">
          <h3>📍 Información de la Empresa</h3>
          <p class="company-desc">{{ state.empresa.slogan }}</p>

          <div class="info-items-list">
            <div class="info-row">
              <span class="info-icon">🏢</span>
              <div>
                <strong>Dirección Central</strong>
                <p>{{ state.empresa.ubicacion }}</p>
              </div>
            </div>

            <div class="info-row">
              <span class="info-icon">✉️</span>
              <div>
                <strong>Correo Oficial</strong>
                <p>{{ state.empresa.email }}</p>
              </div>
            </div>

            <div class="info-row">
              <span class="info-icon">📞</span>
              <div>
                <strong>Atención Telefónica</strong>
                <p>{{ state.empresa.telefono }}</p>
              </div>
            </div>

            <div class="info-row">
              <span class="info-icon">⏱️</span>
              <div>
                <strong>Horario de Operación</strong>
                <p>{{ state.empresa.horario }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="guarantee-card">
          <div class="g-icon">🛡️</div>
          <div>
            <h4>Compromiso de Confidencialidad</h4>
            <p>Todos los datos proporcionados son tratados bajo estricta confidencialidad y utilizados únicamente para emitir su propuesta.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.contacto-page {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.contacto-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto;
}

.badge-tag {
  display: inline-block;
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #dbeafe;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.contacto-header h1 {
  font-size: 2.5rem;
  color: #0f172a;
  margin: 0 0 12px 0;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
}

.contacto-grid {
  display: grid;
  grid-template-columns: 1.8fr 1.2fr;
  gap: 32px;
}

@media (max-width: 860px) {
  .contacto-grid {
    grid-template-columns: 1fr;
  }
}

/* Form Card */
.form-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 36px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}

.req {
  color: #dc2626;
}

input, select, textarea {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid #cbd5e1;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, select:focus, textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.has-error input, .has-error select, .has-error textarea {
  border-color: #ef4444;
  background: #fffcfc;
}

.error-text {
  color: #dc2626;
  font-size: 0.82rem;
  font-weight: 500;
}

.service-preview {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.preview-badge {
  font-size: 0.75rem;
  background: #f1f5f9;
  color: #475569;
  padding: 3px 8px;
  border-radius: 6px;
}

.btn-submit {
  padding: 14px 24px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  margin-top: 10px;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.4);
}

/* Success Card */
.success-box {
  text-align: center;
  padding: 10px;
}

.success-icon {
  font-size: 3.5rem;
  margin-bottom: 12px;
}

.success-box h2 {
  color: #15803d;
  font-size: 1.6rem;
  margin-bottom: 10px;
}

.success-msg {
  color: #475569;
  font-size: 0.98rem;
  line-height: 1.6;
  margin-bottom: 24px;
}

.summary-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
  text-align: left;
  margin-bottom: 24px;
}

.summary-card h3 {
  font-size: 1.05rem;
  color: #0f172a;
  margin-top: 0;
  margin-bottom: 14px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 8px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 2px;
}

.summary-item .label {
  font-size: 0.78rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
}

.summary-item .val {
  font-size: 0.95rem;
  color: #1e293b;
  font-weight: 500;
}

.summary-item .val.highlight {
  color: #2563eb;
  font-weight: 700;
}

.msg-box {
  background: white;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 0.9rem;
  font-style: italic;
  margin: 4px 0 0 0;
}

.btn-nueva-consulta {
  padding: 12px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-nueva-consulta:hover {
  background: #1d4ed8;
}

/* Sidebar */
.info-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.info-card h3 {
  font-size: 1.25rem;
  color: #0f172a;
  margin-top: 0;
  margin-bottom: 6px;
}

.company-desc {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 24px;
  line-height: 1.5;
}

.info-items-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.info-row {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.info-icon {
  font-size: 1.4rem;
  background: #eff6ff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-row strong {
  display: block;
  font-size: 0.9rem;
  color: #0f172a;
  margin-bottom: 2px;
}

.info-row p {
  margin: 0;
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.4;
}

.guarantee-card {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: center;
}

.g-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.guarantee-card h4 {
  margin: 0 0 4px 0;
  color: #166534;
  font-size: 0.95rem;
}

.guarantee-card p {
  margin: 0;
  font-size: 0.82rem;
  color: #15803d;
  line-height: 1.45;
}
</style>
