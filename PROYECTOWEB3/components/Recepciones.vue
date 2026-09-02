<script setup>
import { ref, computed } from 'vue'
import { useRecepcionStore } from '../stores/useRecepcionStore.js'
import ItemsRecepcion from './ItemsRecepcion.vue'

const { state } = useRecepcionStore()

const today = new Date().toISOString().split('T')[0]
const form = ref({
  fecha: today,
  nro_guia: '',
  id_proveedor: ''
})

const seleccion = ref(1)

function guardar() {
  if (!form.value.id_proveedor) {
    alert('Seleccione un proveedor.')
    return
  }
  if (!form.value.nro_guia.trim()) {
    alert('Ingrese el N° de Guía o Factura.')
    return
  }

  const id = state._seq.recepciones++
  state.recepciones.push({
    id,
    fecha: form.value.fecha,
    nro_guia: form.value.nro_guia.trim(),
    id_proveedor: Number(form.value.id_proveedor)
  })

  seleccion.value = id
  form.value = { fecha: today, nro_guia: '', id_proveedor: '' }
}

const lista = computed(() => state?.recepciones || [])

function getTotales(recepcionId) {
  const items = (state?.items || []).filter(
    it => it.id_recepcion === recepcionId
  )
  const total = items.reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0)
  const dañados = items
    .filter(it => it.estado === 'dañado' || it.estado === 'mixto')
    .reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0)

  const pct = total > 0 ? ((dañados / total) * 100).toFixed(1) : '0.0'
  return { total, pct }
}

function eliminarRecepcion(id) {
  const index = state.recepciones.findIndex(r => r.id === id)
  if (index !== -1) {
    state.recepciones.splice(index, 1)
    if (seleccion.value === id) {
      seleccion.value = state.recepciones[0]?.id || null
    }
  }
}
</script>

<template>
  <div class="recepciones-section">
    <h2>📥 Recepciones de Guías</h2>

    <form class="custom-form" @submit.prevent="guardar">
      <div class="form-group">
        <label>Fecha de Recepción</label>
        <input type="date" v-model="form.fecha" required />
      </div>

      <div class="form-group">
        <label>N° Guía / Factura</label>
        <input v-model="form.nro_guia" placeholder="Ej: G-55421" required />
      </div>

      <div class="form-group">
        <label>Proveedor</label>
        <select v-model="form.id_proveedor" required>
          <option value="">-- Seleccione Proveedor --</option>
          <option v-for="p in state?.proveedores || []" :key="p.id" :value="p.id">
            {{ p.nombre }}
          </option>
        </select>
      </div>

      <button class="btn-primary" type="submit">➕ Nueva Recepción</button>
    </form>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Proveedor</th>
            <th>N° Guía</th>
            <th>Total Libros</th>
            <th>% Defectuosos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="r in lista" 
            :key="r.id" 
            :class="{ selected: seleccion === r.id }"
          >
            <td><strong>#{{ r.id }}</strong></td>
            <td>{{ r.fecha }}</td>
            <td>
              <span class="provider-tag">
                {{ (state?.proveedores || []).find(p => p.id === Number(r.id_proveedor))?.nombre || '—' }}
              </span>
            </td>
            <td><code>{{ r.nro_guia }}</code></td>
            <td><strong>{{ getTotales(r.id).total }}</strong></td>
            <td>
              <span 
                class="pct-badge" 
                :class="{ 'has-defects': Number(getTotales(r.id).pct) > 0 }"
              >
                {{ getTotales(r.id).pct }}%
              </span>
            </td>
            <td class="actions-cell">
              <button 
                class="btn-detail" 
                :class="{ 'active-btn': seleccion === r.id }" 
                @click="seleccion = r.id"
              >
                {{ seleccion === r.id ? '👁️ Viendo' : 'Ver Detalle' }}
              </button>
              <button class="btn-danger-sm" @click="eliminarRecepcion(r.id)">✕</button>
            </td>
          </tr>
          <tr v-if="!lista.length">
            <td colspan="7" class="empty-msg">No hay recepciones registradas aún.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <ItemsRecepcion :id-recepcion="seleccion" />
  </div>
</template>

<style scoped>
.recepciones-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #0f172a;
}

.custom-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) auto;
  gap: 12px;
  align-items: flex-end;
  background: #f8fafc;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

input, select {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  background: white;
}

input:focus, select:focus {
  border-color: #2563eb;
}

.btn-primary {
  padding: 9px 18px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  height: 38px;
  white-space: nowrap;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 24px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  background: #f1f5f9;
  color: #475569;
  padding: 10px 14px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}

.data-table tr.selected td {
  background-color: #eff6ff;
}

.provider-tag {
  font-weight: 500;
  color: #1e40af;
}

.pct-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #f1f5f9;
  color: #64748b;
}

.pct-badge.has-defects {
  background: #fee2e2;
  color: #dc2626;
}

.actions-cell {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-detail {
  padding: 6px 12px;
  background: #e2e8f0;
  color: #334155;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-detail:hover {
  background: #cbd5e1;
}

.btn-detail.active-btn {
  background: #2563eb;
  color: white;
}

.btn-danger-sm {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 5px 9px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-danger-sm:hover {
  background: #fecaca;
}

.empty-msg {
  text-align: center;
  color: #94a3b8;
  padding: 24px;
}
</style>
