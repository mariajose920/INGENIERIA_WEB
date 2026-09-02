<script setup>
import { useServiciosStore } from '../stores/useServiciosStore.js'

const { state } = useServiciosStore()
</script>

<template>
  <div class="nosotros-page">
    <!-- Header banner -->
    <section class="nosotros-hero">
      <span class="badge-tag">Conozca Nuestro Equipo</span>
      <h1>Quiénes Somos y Nuestra Visión</h1>
      <p class="hero-desc">
        Somos <strong>{{ state.empresa.nombre }}</strong>, una empresa nacida en la Región de Ñuble con la convicción de que la tecnología de calidad debe estar al alcance de todas las organizaciones que buscan liderar su sector.
      </p>
    </section>

    <!-- Mission & Vision -->
    <section class="mision-vision-grid">
      <div class="card-mv">
        <div class="mv-icon">🎯</div>
        <h2>Nuestra Misión</h2>
        <p>
          Entregar soluciones tecnológicas robustas, accesibles y seguras que optimicen la gestión operativa de nuestros clientes, facilitando su transición digital y potenciando su competitividad a través del desarrollo ágil y el soporte especializado.
        </p>
      </div>

      <div class="card-mv">
        <div class="mv-icon">🔭</div>
        <h2>Nuestra Visión</h2>
        <p>
          Consolidarnos como el referente tecnológico líder en la zona centro-sur de Chile, reconocidos por nuestra excelencia técnica, innovación continua y por establecer relaciones de confianza duraderas con cada empresa con la que colaboramos.
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="valores-section">
      <div class="section-title">
        <span class="badge-tag">Pilares Fundamentales</span>
        <h2>Nuestros Valores Corporativos</h2>
      </div>

      <div class="valores-grid">
        <div class="valor-card">
          <span class="v-num">01</span>
          <h3>Innovación Práctica</h3>
          <p>Adoptamos las tecnologías más modernas y las adaptamos a la realidad concreta de su negocio.</p>
        </div>
        <div class="valor-card">
          <span class="v-num">02</span>
          <h3>Transparencia Total</h3>
          <p>Presupuestos claros, metodologías abiertas y comunicación fluida en cada etapa del servicio.</p>
        </div>
        <div class="valor-card">
          <span class="v-num">03</span>
          <h3>Compromiso y Cercanía</h3>
          <p>Atención directa y personalizada, con soporte local disponible cuando más lo necesita.</p>
        </div>
        <div class="valor-card">
          <span class="v-num">04</span>
          <h3>Calidad y Seguridad</h3>
          <p>Aplicamos estrictos estándares de ciberseguridad y buenas prácticas en cada entrega de código o infraestructura.</p>
        </div>
      </div>
    </section>

    <!-- Identity & Presence in Ñuble -->
    <section class="location-banner">
      <div class="loc-text">
        <h2>Presencia Regional con Alcance Nacional</h2>
        <p>
          Con base en <strong>{{ state.empresa.ubicacion }}</strong>, atendemos clientes en Chillán, San Carlos, Bulnes, Quirihue y todo Chile mediante modalidades remotas e híbridas.
        </p>
        <div class="loc-tags">
          <span class="tag">📍 Chillán</span>
          <span class="tag">🌐 Todo Chile</span>
          <span class="tag">⏱️ Atención Inmediata</span>
        </div>
      </div>
      <div class="loc-action">
        <router-link to="/contacto" class="btn-primary-mv">
          Conversar con Nuestro Equipo
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.nosotros-page {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.nosotros-hero {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px 0;
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

.nosotros-hero h1 {
  font-size: 2.6rem;
  color: #0f172a;
  margin: 0 0 16px 0;
}

.hero-desc {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #64748b;
}

/* MV Grid */
.mision-vision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.card-mv {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.25s ease;
}

.card-mv:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
}

.mv-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.card-mv h2 {
  font-size: 1.5rem;
  color: #0f172a;
  margin-bottom: 12px;
}

.card-mv p {
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
}

/* Values */
.section-title {
  text-align: center;
  margin-bottom: 36px;
}

.section-title h2 {
  font-size: 2rem;
  color: #0f172a;
  margin-top: 8px;
}

.valores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.valor-card {
  background: #f8fafc;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  transition: background-color 0.2s;
}

.valor-card:hover {
  background: #ffffff;
  border-color: #cbd5e1;
}

.v-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
  display: block;
  margin-bottom: 8px;
}

.valor-card h3 {
  font-size: 1.1rem;
  color: #0f172a;
  margin-bottom: 8px;
}

.valor-card p {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.55;
}

/* Location */
.location-banner {
  background: #0f172a;
  border-radius: 20px;
  padding: 40px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.loc-text {
  max-width: 600px;
}

.loc-text h2 {
  font-size: 1.7rem;
  margin-bottom: 10px;
}

.loc-text p {
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 16px;
}

.loc-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.loc-tags .tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.btn-primary-mv {
  padding: 14px 28px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-primary-mv:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}
</style>
