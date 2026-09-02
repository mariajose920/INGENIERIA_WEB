<script setup>
import { ref, computed } from 'vue'
import { useRecepcionStore } from '../stores/useRecepcionStore.js'

const props = defineProps({
  idRecepcion: { type: Number, required: false }
})

const { state } = useRecepcionStore()

const form = ref({
  id_libro: '',
  cantidad: 1,
  estado: 'correcto',
  observacion: ''
})

const items = computed(() =>
  (state?.items || []).filter(
    it => it.id_recepcion === props.idRecepcion
  )
)

const recepcionActual = computed(() =>
  (state?.recepciones || []).find(r => r.id === props.idRecepcion)
)

function agregar() {
  if (!props.idRecepcion) {
    alert('Seleccione una recepción primero.')
    return
  }
  if (!form.value.id_libro) {
    alert('Seleccione un libro.')
    return
  }
  if (!form.value.cantidad || form.value.cantidad < 1) {
    alert('La cantidad debe ser mayor o igual a 1.')
    return
  }

  const id = state._seq.items++
  state.items.push({
    id,
    id_recepcion: props.idRecepcion,
    id_libro: Number(form.value.id_libro),
    cantidad: Number(form.value.cantidad),
    estado: form.value.estado,
    observacion: form.value.observacion.trim()
  })

  form.value = { id_libro: '', cantidad: 1, estado: 'correcto', observacion: '' }
}

function eliminarItem(id) {
  const index = state.items.findIndex(it => it.id === id)
  if (index !== -1) {
    state.items.splice(index, 1)
  }
}

function getLibro(idLibro) {
  return (state?.libros || []).find(l => l.id === Number(idLibro))
}
</script>

<template>
  <div class="card-items" v-if="idRecepcion">
    <div class="items-header">
      <h3>📦 Detalle de Ítems — Recepción #{{ idRecepcion }} (Guía: {{ recepcionActual?.nro_guia || '—' }})</h3>
    </div>

    <form class="custom-form-inline" @submit.prevent="agregar">
      <div class="form-group">
        <label>Libro</label>
        <select v-model="form.id_libro" required>
          <option value="">— Seleccionar Libro —</option>
          <option v-for="l in state?.libros || []" :key="l.id" :value="l.id">
            {{ l.titulo }} ({{ l.editorial }})
          </option>
        </select>
      </div>

      <div class="form-group sm-input">
        <label>Cantidad</label>
        <input type="number" v-model.number="form.cantidad" min="1" required />
      </div>

      <div class="form-group">
        <label>Estado</label>
        <select v-model="form.estado">
          <option value="correcto">✅ Correcto</option>
          <option value="dañado">❌ Dañado</option>
          <option value="mixto">⚠️ Mixto</option>
        </select>
      </div>

      <div class="form-group lg-input">
        <label>Observación</label>
        <input v-model="form.observacion" placeholder="Ej: Empaque roto, hojas arrugadas..." />
      </div>

      <button class="btn-success" type="submit">➕ Añadir Ítem</button>
    </form>

    <div class="items-list-container">
      <table class="items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Libro</th>
            <th>ISBN</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Observaciones</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="it in items" :key="it.id">
            <td>#{{ it.id }}</td>
            <td><strong>{{ getLibro(it.id_libro)?.titulo || 'Libro #' + it.id_libro }}</strong></td>
            <td><code>{{ getLibro(it.id_libro)?.isbn || '—' }}</code></td>
            <td><span class="qty-pill">{{ it.cantidad }}</span></td>
            <td>
              <span 
                class="state-pill" 
                :class="'state-' + it.estado"
              >
                {{ it.estado === 'correcto' ? 'Correcto' : (it.estado === 'dañado' ? 'Dañado' : 'Mixto') }}
              </span>
            </td>
            <td>{{ it.observacion || '—' }}</td>
            <td>
              <button class="btn-danger-xs" @click="eliminarItem(it.id)">Eliminar</button>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="7" class="empty-msg">No hay ítems cargados en esta recepción.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="no-selection-box">
    <p>👈 Selecciona una recepción en la tabla para ver y cargar sus ítems.</p>
  </div>
</template>

<style scoped>
.card-items {
  margin-top: 30px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
}

.items-header h3 {
  margin: 0 0 16px 0;
  font-size: 1.15rem;
  color: #1e293b;
}

.custom-form-inline {
  display: grid;
  grid-template-columns: 2fr 100px 140px 2fr auto;
  gap: 10px;
  align-items: flex-end;
  background: #ffffff;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .custom-form-inline {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
}

input, select {
  padding: 7px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
}

.btn-success {
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  height: 36px;
  white-space: nowrap;
}

.btn-success:hover {
  background: #15803d;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.items-table th {
  background: #f1f5f9;
  color: #475569;
  padding: 8px 12px;
  font-size: 0.8rem;
  text-align: left;
  text-transform: uppercase;
}

.items-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #334155;
}

.qty-pill {
  font-weight: 700;
  background: #e2e8f0;
  padding: 2px 8px;
  border-radius: 10px;
}

.state-pill {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
}

.state-correcto {
  background: #dcfce7;
  color: #166534;
}

.state-dañado {
  background: #fee2e2;
  color: #991b1b;
}

.state-mixto {
  background: #fef9c3;
  color: #854d0e;
}

.btn-danger-xs {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}

.btn-danger-xs:hover {
  background: #fecaca;
}

.empty-msg {
  text-align: center;
  color: #94a3b8;
  padding: 16px;
}

.no-selection-box {
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  color: #64748b;
}
</style>
