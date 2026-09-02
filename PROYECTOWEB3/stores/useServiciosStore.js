import { reactive, computed } from 'vue'

const state = reactive({
  empresa: {
    nombre: 'Nexora Soluciones Digitales & TI',
    slogan: 'Innovación tecnológica y soporte integral para impulsar su negocio',
    rubro: 'Servicios Tecnológicos, Consultoría TI y Desarrollo de Software',
    ubicacion: 'Av. Libertad 450, Chillán, Región de Ñuble',
    email: 'contacto@nexora.cl',
    telefono: '+56 9 8765 4321',
    horario: 'Lunes a Viernes de 09:00 a 18:30 hrs'
  },
  servicios: [
    {
      id: 1,
      nombre: 'Desarrollo Web & Aplicaciones a Medida',
      categoria: 'Desarrollo de Software',
      descripcion: 'Diseño y desarrollo de sitios web corporativos, plataformas SPA y sistemas de gestión a medida con alta velocidad y diseño responsivo.',
      precio: '$450.000 CLP / proyecto',
      disponibilidad: 'Disponible',
      icono: '💻',
      destacado: true,
      caracteristicas: ['Vue 3 / React / Node.js', 'Diseño UX/UI responsivo', 'Optimización SEO y hosting']
    },
    {
      id: 2,
      nombre: 'Ciberseguridad & Auditoría de Vulnerabilidades',
      categoria: 'Ciberseguridad',
      descripcion: 'Análisis integral de riesgos informáticos, protección perimetral, planes de contingencia y respaldo blindado de información crítica.',
      precio: '$280.000 CLP / mensual',
      disponibilidad: 'Disponible',
      icono: '🛡️',
      destacado: true,
      caracteristicas: ['Escaneo de vulnerabilidades', 'Auditoría de firewalls', 'Copias de seguridad automáticas']
    },
    {
      id: 3,
      nombre: 'Infraestructura Cloud & Migración de Servidores',
      categoria: 'Cloud & Redes',
      descripcion: 'Configuración, despliegue y migración de aplicaciones hacia nubes públicas o privadas (AWS, Azure, GCP) con alta disponibilidad.',
      precio: '$320.000 CLP / implementación',
      disponibilidad: 'Alta Demanda',
      icono: '☁️',
      destacado: false,
      caracteristicas: ['Arquitectura de microservicios', 'Balanceo de carga y CDN', 'Monitoreo 24/7']
    },
    {
      id: 4,
      nombre: 'Soporte Técnico Especializado & Mantenimiento TI',
      categoria: 'Soporte & Mantenimiento',
      descripcion: 'Mesa de ayuda presencial y remota, diagnóstico de hardware/software, mantenimiento preventivo de servidores y estaciones de trabajo.',
      precio: '$190.000 CLP / mensual',
      disponibilidad: 'Disponible',
      icono: '🛠️',
      destacado: false,
      caracteristicas: ['Mesa de ayuda multicanal', 'Tiempos de respuesta < 2 hrs', 'Mantenimiento mensual preventivo']
    },
    {
      id: 5,
      nombre: 'Consultoría Estratégica en Transformación Digital',
      categoria: 'Consultoría',
      descripcion: 'Asesoría experta para la digitalización de flujos de trabajo, adopción de herramientas ERP/CRM y capacitación técnica de personal.',
      precio: '$250.000 CLP / asesoría',
      disponibilidad: 'Cupos Limitados',
      icono: '📊',
      destacado: true,
      caracteristicas: ['Diagnóstico de madurez digital', 'Selección de herramientas clave', 'Capacitación personalizada']
    },
    {
      id: 6,
      nombre: 'Automatización de Procesos & Chatbots con IA',
      categoria: 'Desarrollo de Software',
      descripcion: 'Implementación de agentes inteligentes y bots conversacionales con Inteligencia Artificial para atención de clientes y automatización de tareas.',
      precio: '$380.000 CLP / proyecto',
      disponibilidad: 'Disponible',
      icono: '🤖',
      destacado: false,
      caracteristicas: ['Integración WhatsApp / Web', 'Modelos IA entrenados', 'Conexión con CRM y APIs']
    }
  ],
  servicioSeleccionado: null,
  solicitudesContacto: []
})

export function useServiciosStore() {
  const categorias = computed(() => {
    const cats = new Set(state.servicios.map(s => s.categoria))
    return ['Todas', ...Array.from(cats)]
  })

  function seleccionarServicio(servicio) {
    state.servicioSeleccionado = servicio
  }

  function limpiarServicioSeleccionado() {
    state.servicioSeleccionado = null
  }

  function registrarSolicitud(solicitud) {
    const nueva = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-CL'),
      ...solicitud
    }
    state.solicitudesContacto.push(nueva)
    return nueva
  }

  return {
    state,
    categorias,
    seleccionarServicio,
    limpiarServicioSeleccionado,
    registrarSolicitud
  }
}
