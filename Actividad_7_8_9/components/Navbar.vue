<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useServiciosStore } from '../stores/useServiciosStore.js'

const { state } = useServiciosStore()
const isMenuOpen = ref(false)
const router = useRouter()

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="navbar-wrapper">
    <div class="nav-container">
      <router-link to="/" class="brand-logo" @click="closeMenu">
        <div class="logo-icon">⚡</div>
        <div class="logo-text">
          <span class="brand-title">NEXORA</span>
          <span class="brand-sub">SERVICIOS TI</span>
        </div>
      </router-link>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Abrir menú">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <nav class="nav-links" :class="{ 'open': isMenuOpen }">
        <router-link to="/" class="nav-item" active-class="active" @click="closeMenu">
          🏠 Inicio
        </router-link>
        <router-link to="/nosotros" class="nav-item" active-class="active" @click="closeMenu">
          👥 Nosotros
        </router-link>
        <router-link to="/servicios" class="nav-item" active-class="active" @click="closeMenu">
          💼 Servicios
        </router-link>
        <router-link to="/contacto" class="nav-item nav-btn" active-class="active" @click="closeMenu">
          ✉️ Cotizar / Contacto
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: linear-gradient(90deg, #ffffff, #93c5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-sub {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  color: #94a3b8;
  font-weight: 600;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-item {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.nav-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.nav-item.active {
  color: #ffffff;
  background: #2563eb;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

.nav-btn {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white !important;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}

.nav-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45);
}

.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 6px;
}

.menu-toggle .bar {
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #0f172a;
    flex-direction: column;
    padding: 20px;
    gap: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateY(-150%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-item {
    width: 100%;
    text-align: center;
  }
}
</style>
