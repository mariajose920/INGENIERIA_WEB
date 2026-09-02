<script setup>
const props = defineProps({
  servicio: {
    type: Object,
    required: true
  },
  esSeleccionado: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['seleccionar-servicio'])

function solicitar() {
  emit('seleccionar-servicio', props.servicio)
}
</script>

<template>
  <div class="service-card" :class="{ 'selected-card': esSeleccionado, 'featured': servicio.destacado }">
    <div class="card-header">
      <div class="icon-badge">{{ servicio.icono || '⚡' }}</div>
      <div class="badges">
        <span class="category-badge">{{ servicio.categoria }}</span>
        <span 
          class="availability-badge"
          :class="{
            'avail-inmediata': servicio.disponibilidad === 'Disponible',
            'avail-demanda': servicio.disponibilidad === 'Alta Demanda',
            'avail-limitada': servicio.disponibilidad === 'Cupos Limitados'
          }"
        >
          ● {{ servicio.disponibilidad }}
        </span>
      </div>
    </div>

    <div class="card-body">
      <h3 class="service-title">{{ servicio.nombre }}</h3>
      <p class="service-desc">{{ servicio.descripcion }}</p>

      <ul class="features-list" v-if="servicio.caracteristicas?.length">
        <li v-for="(feat, idx) in servicio.caracteristicas" :key="idx">
          ✓ {{ feat }}
        </li>
      </ul>
    </div>

    <div class="card-footer">
      <div class="price-box">
        <span class="price-label">Valor Referencial</span>
        <span class="price-val">{{ servicio.precio }}</span>
      </div>

      <button 
        class="action-btn" 
        :class="{ 'btn-selected': esSeleccionado }"
        @click="solicitar"
      >
        <span v-if="esSeleccionado">✓ Seleccionado</span>
        <span v-else>📩 Solicitar Información</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  border-color: #93c5fd;
}

.service-card.selected-card {
  border-color: #2563eb;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
  box-shadow: 0 0 0 2px #2563eb, 0 10px 20px rgba(37, 99, 235, 0.15);
}

.service-card.featured::before {
  content: '★ DESTACADO';
  position: absolute;
  top: 14px;
  right: -32px;
  transform: rotate(45deg);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 4px 34px;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.icon-badge {
  font-size: 2.2rem;
  width: 56px;
  height: 56px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
}

.badges {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.category-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #2563eb;
  background: #dbeafe;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.04em;
}

.availability-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
}

.avail-inmediata {
  background: #dcfce7;
  color: #15803d;
}

.avail-demanda {
  background: #fef3c7;
  color: #b45309;
}

.avail-limitada {
  background: #fee2e2;
  color: #b91c1c;
}

.service-title {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
}

.service-desc {
  color: #64748b;
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.features-list li {
  font-size: 0.85rem;
  color: #475569;
  font-weight: 500;
}

.card-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-box {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 600;
}

.price-val {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.action-btn {
  width: 100%;
  padding: 10px 16px;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.action-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-selected {
  background: #16a34a !important;
}

.btn-selected:hover {
  background: #15803d !important;
}
</style>
