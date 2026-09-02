<script setup>
import { ref } from 'vue'
import Proveedores from './components/Proveedores.vue'
import Libros from './components/Libros.vue'
import Recepciones from './components/Recepciones.vue'

const tab = ref('recepciones')
</script>

<template>
  <div class="container">
    <header class="app-header">
      <h1>📚 Recepción de Textos Escolares</h1>
      <p class="subtitle">Sistema de Control y Gestión de Entregas</p>
    </header>

    <nav class="nav-tabs">
      <button :class="{ active: tab === 'recepciones' }" @click="tab = 'recepciones'">
        📥 Recepciones
      </button>
      <button :class="{ active: tab === 'libros' }" @click="tab = 'libros'">
        📖 Libros
      </button>
      <button :class="{ active: tab === 'proveedores' }" @click="tab = 'proveedores'">
        🏢 Proveedores
      </button>
    </nav>

    <main class="content-panel">
      <Recepciones v-if="tab === 'recepciones'" />
      <Libros v-if="tab === 'libros'" />
      <Proveedores v-if="tab === 'proveedores'" />
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1e293b;
}

.app-header {
  margin-bottom: 24px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 16px;
}

.app-header h1 {
  margin: 0 0 6px 0;
  font-size: 2rem;
  color: #0f172a;
}

.subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.nav-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.nav-tabs button {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-tabs button:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}

.nav-tabs button.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #1d4ed8;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.25);
}

.content-panel {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
  border: 1px solid #e2e8f0;
}
</style>
