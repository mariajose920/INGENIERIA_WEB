<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useServiciosStore } from '../stores/useServiciosStore.js'
import ServicioCard from '../components/ServicioCard.vue'

const router = useRouter()
const { state, categorias, seleccionarServicio, limpiarServicioSeleccionado } = useServiciosStore()

const busqueda = ref('')
const categoriaActiva = ref('Todas')

// Computed filter without mutating the original array
const serviciosFiltrados = computed(() => {
  const query = busqueda.value.toLowerCase().trim()
  return state.servicios.filter(s => {
    const coincideNombre = s.nombre.toLowerCase().includes(query) ||
                           s.descripcion.toLowerCase().includes(query)
    const coincideCategoria = categoriaActiva.value === 'Todas' ||
                              s.categoria === categoriaActiva.value
    return coincideNombre && coincideCategoria
  })
})

const totalServicios = computed(() => state.servicios.length)
const totalFiltrados = computed(() => serviciosFiltrados.value.length)

function onSeleccionarServicio(servicio) {
  seleccionarServicio(servicio)
}

function irAContacto() {
  router.push('/contacto')
}

function resetFiltros() {
  busqueda.value = ''
  categoriaActiva.value = 'Todas'
}
</script>

<template>
  <div class="servicios-page">
    <!-- Header -->
    <section class="servicios-header">
      <span class="badge-tag">Catálogo Especializado</span>
      <h1>Nuestros Servicios Tecnológicos</h1>
      <p class="subtitle">
        Soluciones integrales de software, ciberseguridad, infraestructura y consultoría con estándares de calidad empresarial.
      </p>
    </section>

    <!-- Selected Service Floating Banner -->
    <transition name="fade">
      <div class="selected-service-banner" v-if="state.servicioSeleccionado">
        <div class="banner-info">
          <span class="banner-icon">{{ state.servicioSeleccionado.icono }}</span>
          <div class="banner-text">
            <span class="banner-subtitle">Servicio Seleccionado para Cotizar:</span>
            <strong>{{ state.servicioSeleccionado.nombre }}</strong> ({{ state.servicioSeleccionado.precio }})
          </div>
        </div>
        <div class="banner-actions">
          <button class="btn-clear-selection" @click="limpiarServicioSeleccionado">✕ Deseleccionar</button>
          <button class="btn-go-contact" @click="irAContacto">Ir al Formulario de Contacto →</button>
        </div>
      </div>
    </transition>

    <!-- Filter and Search Bar -->
    <section class="filter-controls-box">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          v-model="busqueda" 
          placeholder="Buscar por nombre, palabra clave o descripción..."
          class="search-input"
        />
        <button v-if="busqueda" class="clear-search-btn" @click="busqueda = ''">✕</button>
      </div>

      <div class="categories-filter">
        <button
          v-for="cat in categorias"
          :key="cat"
          class="cat-pill"
          :class="{ active: categoriaActiva === cat }"
          @click="categoriaActiva = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="results-counter">
        <span>Mostrando <strong>{{ totalFiltrados }}</strong> de <strong>{{ totalServicios }}</strong> servicios</span>
        <button v-if="busqueda || categoriaActiva !== 'Todas'" class="btn-reset" @click="resetFiltros">
          Restablecer filtros
        </button>
      </div>
    </section>

    <!-- Services Grid (v-for) -->
    <section class="catalog-section">
      <div class="services-grid" v-if="serviciosFiltrados.length > 0">
        <ServicioCard
          v-for="servicio in serviciosFiltrados"
          :key="servicio.id"
          :servicio="servicio"
          :es-seleccionado="state.servicioSeleccionado?.id === servicio.id"
          @seleccionar-servicio="onSeleccionarServicio"
        />
      </div>

      <!-- Empty State (v-else) -->
      <div class="empty-results-box" v-else>
        <div class="empty-icon">🔎</div>
        <h3>No se encontraron servicios</h3>
        <p>No hay resultados que coincidan con "{{ busqueda }}" en la categoría "{{ categoriaActiva }}".</p>
        <button class="btn-reset-large" @click="resetFiltros">Ver Todos los Servicios</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.servicios-page {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.servicios-header {
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

.servicios-header h1 {
  font-size: 2.5rem;
  color: #0f172a;
  margin: 0 0 12px 0;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
}

/* Selected banner */
.selected-service-banner {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
  flex-wrap: wrap;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.banner-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.banner-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 8px;
  border-radius: 10px;
}

.banner-text {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
}

.banner-subtitle {
  font-size: 0.78rem;
  color: #93c5fd;
  text-transform: uppercase;
  font-weight: 600;
}

.banner-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-clear-selection {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-clear-selection:hover {
  background: rgba(255, 255, 255, 0.25);
}

.btn-go-contact {
  background: white;
  color: #1d4ed8;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-go-contact:hover {
  transform: translateY(-1px);
}

/* Filter box */
.filter-controls-box {
  background: #ffffff;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  font-size: 1.1rem;
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 14px 44px 14px 48px;
  border-radius: 12px;
  border: 1.5px solid #cbd5e1;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.clear-search-btn {
  position: absolute;
  right: 14px;
  background: #e2e8f0;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 0.8rem;
  color: #475569;
}

.categories-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-pill {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cat-pill:hover {
  background: #e2e8f0;
}

.cat-pill.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
}

.results-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #64748b;
  border-top: 1px solid #f1f5f9;
  padding-top: 14px;
}

.btn-reset {
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.88rem;
  text-decoration: underline;
}

/* Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

/* Empty state */
.empty-results-box {
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 18px;
  padding: 50px 20px;
  text-align: center;
  color: #64748b;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 12px;
}

.empty-results-box h3 {
  color: #0f172a;
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.empty-results-box p {
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.btn-reset-large {
  padding: 10px 22px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
