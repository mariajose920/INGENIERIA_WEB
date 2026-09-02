<script setup>
import { ref } from 'vue'
import { useRecepcionStore } from '../stores/useRecepcionStore.js'

const { state } = useRecepcionStore()

const form = ref({
  isbn: '',
  titulo: '',
  editorial: '',
  nivel: 'Básica',
  anio: new Date().getFullYear()
})

function guardar() {
  const cleanIsbn = form.value.isbn.replace(/[-\s]/g, '')
  if (cleanIsbn.length !== 10 && cleanIsbn.length !== 13) {
    alert('ISBN inválido. Ingrese un ISBN de 10 o 13 dígitos.')
    return
  }

  if (!form.value.titulo.trim()) {
    alert('Ingrese el título del libro.')
    return
  }

  if (!form.value.editorial.trim()) {
    alert('Ingrese la editorial del libro.')
    return
  }

  const id = state._seq.libros++
  state.libros.push({
    id,
    isbn: form.value.isbn.trim(),
    titulo: form.value.titulo.trim(),
    editorial: form.value.editorial.trim(),
    nivel: form.value.nivel,
    anio: Number(form.value.anio)
  })

  form.value = {
    isbn: '',
    titulo: '',
    editorial: '',
    nivel: 'Básica',
    anio: new Date().getFullYear()
  }
}

function eliminar(id) {
  const index = state.libros.findIndex(l => l.id === id)
  if (index !== -1) {
    state.libros.splice(index, 1)
  }
}
</script>

<template>
  <div class="libros-section">
    <h2>📖 Catálogo de Libros</h2>

    <form class="custom-form" @submit.prevent="guardar">
      <div class="form-group">
        <label>ISBN</label>
        <input v-model="form.isbn" placeholder="978-956-123456-0" required />
      </div>

      <div class="form-group">
        <label>Título</label>
        <input v-model="form.titulo" placeholder="Ej: Matemática 5° Básico" required />
      </div>

      <div class="form-group">
        <label>Editorial</label>
        <input v-model="form.editorial" placeholder="Ej: Santillana" required />
      </div>

      <div class="form-group">
        <label>Nivel Educativo</label>
        <select v-model="form.nivel">
          <option value="Básica">Básica</option>
          <option value="Media">Media</option>
          <option value="Prebásica">Prebásica</option>
        </select>
      </div>

      <div class="form-group">
        <label>Año Edición</label>
        <input v-model.number="form.anio" type="number" min="1990" max="2035" placeholder="Año" required />
      </div>

      <button class="btn-primary" type="submit">➕ Registrar Libro</button>
    </form>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ISBN</th>
            <th>Título</th>
            <th>Editorial</th>
            <th>Nivel</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in state?.libros || []" :key="l.id">
            <td><strong>#{{ l.id }}</strong></td>
            <td><code>{{ l.isbn }}</code></td>
            <td class="font-medium">{{ l.titulo }}</td>
            <td>{{ l.editorial }}</td>
            <td><span class="badge">{{ l.nivel }}</span></td>
            <td>{{ l.anio }}</td>
            <td>
              <button class="btn-danger-sm" @click="eliminar(l.id)">Eliminar</button>
            </td>
          </tr>
          <tr v-if="!state?.libros?.length">
            <td colspan="7" class="empty-msg">No hay libros registrados aún.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.libros-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #0f172a;
}

.custom-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) auto;
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

.font-medium {
  font-weight: 600;
  color: #0f172a;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
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
