<script setup>
import { ref } from 'vue'
import { useRecepcionStore } from '../stores/useRecepcionStore.js'

const { state } = useRecepcionStore()

const form = ref({
  nombre: '',
  rut: '',
  contacto: ''
})

function guardar() {
  if (!form.value.nombre.trim()) {
    alert('El nombre del proveedor es obligatorio')
    return
  }
  if (!form.value.rut.trim()) {
    alert('El RUT es obligatorio')
    return
  }

  const id = state._seq.proveedores++
  state.proveedores.push({
    id,
    nombre: form.value.nombre.trim(),
    rut: form.value.rut.trim(),
    contacto: form.value.contacto.trim()
  })

  form.value = { nombre: '', rut: '', contacto: '' }
}

function eliminar(id) {
  const index = state.proveedores.findIndex(p => p.id === id)
  if (index !== -1) {
    state.proveedores.splice(index, 1)
  }
}
</script>

<template>
  <div class="proveedores-section">
    <h2>🏢 Proveedores</h2>

    <form class="custom-form" @submit.prevent="guardar">
      <div class="form-group">
        <label>Nombre Empresa / Editorial</label>
        <input v-model="form.nombre" placeholder="Ej: Editorial Santillana" required />
      </div>

      <div class="form-group">
        <label>RUT</label>
        <input v-model="form.rut" placeholder="Ej: 76.123.456-7" required />
      </div>

      <div class="form-group">
        <label>Contacto (Email / Teléfono)</label>
        <input v-model="form.contacto" placeholder="Ej: contacto@editorial.cl" />
      </div>

      <button class="btn-primary" type="submit">➕ Registrar Proveedor</button>
    </form>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in state?.proveedores || []" :key="p.id">
            <td><strong>#{{ p.id }}</strong></td>
            <td>{{ p.nombre }}</td>
            <td><code>{{ p.rut }}</code></td>
            <td>{{ p.contacto || '—' }}</td>
            <td>
              <button class="btn-danger-sm" @click="eliminar(p.id)">Eliminar</button>
            </td>
          </tr>
          <tr v-if="!state?.proveedores?.length">
            <td colspan="5" class="empty-msg">No hay proveedores registrados aún.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.proveedores-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #0f172a;
}

.custom-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) auto;
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

input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
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
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.table-container {
  overflow-x: auto;
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

.data-table tr:hover td {
  background-color: #f8fafc;
}

.btn-danger-sm {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 4px 10px;
  border-radius: 4px;
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
