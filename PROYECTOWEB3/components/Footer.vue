<script setup>
import { useServiciosStore } from '../stores/useServiciosStore.js'

const { state } = useServiciosStore()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer-wrapper">
    <div class="footer-content">
      <div class="footer-col brand-col">
        <div class="footer-brand">
          <span class="icon">⚡</span>
          <h3>{{ state.empresa.nombre }}</h3>
        </div>
        <p class="brand-desc">{{ state.empresa.slogan }}</p>
        <p class="location-tag">📍 {{ state.empresa.ubicacion }}</p>
      </div>

      <div class="footer-col links-col">
        <h4>Navegación Rápida</h4>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/nosotros">Quiénes Somos</router-link></li>
          <li><router-link to="/servicios">Catálogo de Servicios</router-link></li>
          <li><router-link to="/contacto">Cotizaciones & Contacto</router-link></li>
        </ul>
      </div>

      <div class="footer-col contact-col">
        <h4>Contacto Directo</h4>
        <p><strong>Email:</strong> {{ state.empresa.email }}</p>
        <p><strong>Teléfono:</strong> {{ state.empresa.telefono }}</p>
        <p><strong>Horario:</strong> {{ state.empresa.horario }}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="bottom-container">
        <p>© {{ year }} {{ state.empresa.nombre }} — Todos los derechos reservados.</p>
        <p class="dev-badge">Desarrollado con Vue 3 & Vite</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  background: #0f172a;
  color: #94a3b8;
  margin-top: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px 30px;
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 40px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.footer-brand .icon {
  font-size: 1.5rem;
}

.footer-brand h3 {
  color: white;
  margin: 0;
  font-size: 1.25rem;
}

.brand-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 12px;
}

.location-tag {
  font-size: 0.9rem;
  color: #60a5fa;
}

.footer-col h4 {
  color: white;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.05rem;
  position: relative;
  padding-bottom: 8px;
}

.footer-col h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 36px;
  height: 2px;
  background: #3b82f6;
  border-radius: 2px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col ul li a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.92rem;
  transition: color 0.2s;
}

.footer-col ul li a:hover {
  color: #60a5fa;
}

.contact-col p {
  margin: 8px 0;
  font-size: 0.92rem;
  line-height: 1.5;
}

.contact-col strong {
  color: #e2e8f0;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 0;
}

.bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  flex-wrap: wrap;
  gap: 10px;
}

.dev-badge {
  color: #38bdf8;
  font-weight: 500;
}
</style>
