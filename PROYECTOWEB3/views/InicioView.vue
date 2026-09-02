<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useServiciosStore } from '../stores/useServiciosStore.js'
import ServicioCard from '../components/ServicioCard.vue'

const router = useRouter()
const { state, seleccionarServicio } = useServiciosStore()

const serviciosDestacados = computed(() =>
  state.servicios.filter(s => s.destacado)
)

function onSeleccionarServicio(servicio) {
  seleccionarServicio(servicio)
  router.push('/contacto')
}
</script>

<template>
  <div class="inicio-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">🚀 Soluciones TI de Nueva Generación en Ñuble</div>
        <h1 class="hero-title">
          Impulsamos la transformación digital de tu empresa con tecnología de vanguardia
        </h1>
        <p class="hero-subtitle">
          En <strong>{{ state.empresa.nombre }}</strong> ofrecemos consultoría, desarrollo de software, ciberseguridad y soporte técnico especializado para garantizar el éxito y la continuidad de sus operaciones.
        </p>
        <div class="hero-actions">
          <router-link to="/servicios" class="btn-hero-primary">
            🔍 Explorar Servicios
          </router-link>
          <router-link to="/contacto" class="btn-hero-secondary">
            💬 Solicitar Cotización
          </router-link>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">+120</span>
            <span class="stat-label">Proyectos Entregados</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">99.8%</span>
            <span class="stat-label">Uptime & Disponibilidad</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Soporte y Monitoreo</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="features-section">
      <div class="section-header">
        <span class="section-tag">¿Por qué elegirnos?</span>
        <h2>Excelencia técnica y compromiso regional</h2>
        <p>Soluciones diseñadas a la medida de los desafíos del ecosistema productivo actual.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feat-icon">⚡</div>
          <h3>Agilidad y Escalabilidad</h3>
          <p>Implementamos metodologías ágiles y arquitecturas modernas para que su plataforma crezca al ritmo de su negocio.</p>
        </div>

        <div class="feature-card">
          <div class="feat-icon">🛡️</div>
          <h3>Seguridad Integral</h3>
          <p>Priorizamos la protección y privacidad de sus datos mediante estándares internacionales de ciberseguridad.</p>
        </div>

        <div class="feature-card">
          <div class="feat-icon">🤝</div>
          <h3>Acompañamiento Continuo</h3>
          <p>No solo desarrollamos software; entregamos soporte técnico continuo, capacitación y asesoría estratégica.</p>
        </div>
      </div>
    </section>

    <!-- Featured Services -->
    <section class="featured-services-section">
      <div class="section-header">
        <span class="section-tag">Nuestra Oferta</span>
        <h2>Servicios Destacados</h2>
        <p>Conozca algunas de nuestras principales soluciones tecnológicas.</p>
      </div>

      <div class="services-grid">
        <ServicioCard
          v-for="s in serviciosDestacados"
          :key="s.id"
          :servicio="s"
          :es-seleccionado="state.servicioSeleccionado?.id === s.id"
          @seleccionar-servicio="onSeleccionarServicio"
        />
      </div>

      <div class="view-all-box">
        <router-link to="/servicios" class="btn-view-all">
          Ver Catálogo Completo de Servicios →
        </router-link>
      </div>
    </section>

    <!-- Banner CTA -->
    <section class="cta-banner">
      <div class="cta-content">
        <h2>¿Listo para digitalizar e innovar en su empresa?</h2>
        <p>Cuéntenos su proyecto o requerimiento técnico y nuestro equipo de ingenieros elaborará una propuesta personalizada.</p>
        <router-link to="/contacto" class="btn-cta">
          Contactar a un Asesor Ahora
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inicio-page {
  display: flex;
  flex-direction: column;
  gap: 70px;
}

/* Hero */
.hero-section {
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent 50%),
              radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.12), transparent 50%),
              #0b132b;
  border-radius: 24px;
  padding: 60px 40px;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-content {
  max-width: 850px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  border: 1px solid rgba(147, 197, 253, 0.3);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px;
  }
  .hero-title {
    font-size: 2rem;
  }
}

.hero-subtitle {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #cbd5e1;
  margin-bottom: 36px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.btn-hero-primary {
  padding: 14px 28px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.25s ease;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.35);
}

.btn-hero-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 14px 24px rgba(37, 99, 235, 0.45);
}

.btn-hero-secondary {
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.25s ease;
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: rgba(255, 255, 255, 0.04);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: #60a5fa;
}

.stat-label {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
}

/* Sections Common */
.section-header {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 40px;
}

.section-tag {
  color: #2563eb;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}

.section-header h2 {
  font-size: 2.2rem;
  color: #0f172a;
  margin: 8px 0 12px;
}

.section-header p {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
}

.feat-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 1.25rem;
  color: #0f172a;
  margin-bottom: 10px;
}

.feature-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

.view-all-box {
  text-align: center;
  margin-top: 40px;
}

.btn-view-all {
  display: inline-block;
  padding: 12px 28px;
  background: #f1f5f9;
  color: #1e293b;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-view-all:hover {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

/* CTA Banner */
.cta-banner {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  border-radius: 20px;
  padding: 50px 30px;
  color: white;
  text-align: center;
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.25);
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-banner h2 {
  font-size: 2rem;
  margin-bottom: 14px;
}

.cta-banner p {
  font-size: 1.05rem;
  color: #dbeafe;
  margin-bottom: 28px;
  line-height: 1.6;
}

.btn-cta {
  display: inline-block;
  padding: 14px 32px;
  background: #ffffff;
  color: #1d4ed8;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
}
</style>
