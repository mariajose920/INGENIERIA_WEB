// Importamos las herramientas 'reactive' (para que los datos se actualicen en pantalla automáticamente al cambiar) y 'computed' (para calcular valores automáticos basados en otros datos) desde la librería Vue
import { reactive, computed } from 'vue'

// Creamos un objeto de estado reactivo global llamado 'state' que almacenará los datos compartidos de toda la aplicación
const state = reactive({
  // Sección que agrupa toda la información de contacto y descripción de la empresa
  empresa: {
    // Nombre oficial de la empresa o negocio
    nombre: 'Nexora Soluciones Digitales & TI',
    // Lema o eslogan que resume la propuesta de valor de la empresa
    slogan: 'Innovación tecnológica y soporte integral para impulsar su negocio',
    // Área de especialización o rubro comercial de la empresa
    rubro: 'Servicios Tecnológicos, Consultoría TI y Desarrollo de Software',
    // Dirección física donde operan las oficinas centrales de la empresa
    ubicacion: 'Av. Libertad 450, Chillán, Región de Ñuble',
    // Correo electrónico principal para recibir consultas y mensajes de clientes
    email: 'contacto@nexora.cl',
    // Número de teléfono de contacto y atención telefónica
    telefono: '+56 9 8765 4321',
    // Días hábiles y rango de horario en que atienden a los clientes
    horario: 'Lunes a Viernes de 09:00 a 18:30 hrs'
  // Cierre del grupo de información de la empresa
  },
  // Lista (catálogo) que contiene todos los servicios que la empresa ofrece a sus clientes
  servicios: [
    // Datos del primer servicio del catálogo
    {
      // Número de identificación único asignado a este servicio
      id: 1,
      // Título o nombre público del servicio
      nombre: 'Desarrollo Web & Aplicaciones a Medida',
      // Clasificación o categoría a la que pertenece el servicio
      categoria: 'Desarrollo de Software',
      // Explicación detallada de qué consiste y qué incluye este servicio
      descripcion: 'Diseño y desarrollo de sitios web corporativos, plataformas SPA y sistemas de gestión a medida con alta velocidad y diseño responsivo.',
      // Precio estimado de referencia en pesos chilenos y modalidad de cobro
      precio: '$450.000 CLP / proyecto',
      // Estado actual que indica si el servicio se puede contratar ahora mismo
      disponibilidad: 'Disponible',
      // Emoticono o símbolo visual representativo del servicio
      icono: '💻',
      // Indica con valor verdadero (true) que este servicio debe destacarse en la portada
      destacado: true,
      // Lista de elementos, tecnologías y beneficios destacados que incluye el servicio
      caracteristicas: ['Vue 3 / React / Node.js', 'Diseño UX/UI responsivo', 'Optimización SEO y hosting']
    // Cierre del primer servicio
    },
    // Datos del segundo servicio del catálogo
    {
      // Número de identificación único asignado a este servicio
      id: 2,
      // Título o nombre público del servicio
      nombre: 'Ciberseguridad & Auditoría de Vulnerabilidades',
      // Clasificación o categoría a la que pertenece el servicio
      categoria: 'Ciberseguridad',
      // Explicación detallada de qué consiste y qué incluye este servicio
      descripcion: 'Análisis integral de riesgos informáticos, protección perimetral, planes de contingencia y respaldo blindado de información crítica.',
      // Precio estimado de referencia en pesos chilenos con cobro mensual
      precio: '$280.000 CLP / mensual',
      // Estado actual que indica si el servicio se puede contratar ahora mismo
      disponibilidad: 'Disponible',
      // Emoticono o símbolo visual representativo del servicio
      icono: '🛡️',
      // Indica con valor verdadero (true) que este servicio debe destacarse en la portada
      destacado: true,
      // Lista de elementos, tecnologías y beneficios destacados que incluye el servicio
      caracteristicas: ['Escaneo de vulnerabilidades', 'Auditoría de firewalls', 'Copias de seguridad automáticas']
    // Cierre del segundo servicio
    },
    // Datos del tercer servicio del catálogo
    {
      // Número de identificación único asignado a este servicio
      id: 3,
      // Título o nombre público del servicio
      nombre: 'Infraestructura Cloud & Migración de Servidores',
      // Clasificación o categoría a la que pertenece el servicio
      categoria: 'Cloud & Redes',
      // Explicación detallada de qué consiste y qué incluye este servicio
      descripcion: 'Configuración, despliegue y migración de aplicaciones hacia nubes públicas o privadas (AWS, Azure, GCP) con alta disponibilidad.',
      // Precio estimado de referencia en pesos chilenos por implementación
      precio: '$320.000 CLP / implementación',
      // Estado de disponibilidad que indica que tiene una gran cantidad de solicitudes
      disponibilidad: 'Alta Demanda',
      // Emoticono o símbolo visual representativo del servicio
      icono: '☁️',
      // Indica con valor falso (false) que este servicio no aparece en la sección principal de destacados
      destacado: false,
      // Lista de elementos, tecnologías y beneficios destacados que incluye el servicio
      caracteristicas: ['Arquitectura de microservicios', 'Balanceo de carga y CDN', 'Monitoreo 24/7']
    // Cierre del tercer servicio
    },
    // Datos del cuarto servicio del catálogo
    {
      // Número de identificación único asignado a este servicio
      id: 4,
      // Título o nombre público del servicio
      nombre: 'Soporte Técnico Especializado & Mantenimiento TI',
      // Clasificación o categoría a la que pertenece el servicio
      categoria: 'Soporte & Mantenimiento',
      // Explicación detallada de qué consiste y qué incluye este servicio
      descripcion: 'Mesa de ayuda presencial y remota, diagnóstico de hardware/software, mantenimiento preventivo de servidores y estaciones de trabajo.',
      // Precio estimado de referencia en pesos chilenos con cobro mensual
      precio: '$190.000 CLP / mensual',
      // Estado actual que indica si el servicio se puede contratar ahora mismo
      disponibilidad: 'Disponible',
      // Emoticono o símbolo visual representativo del servicio
      icono: '🛠️',
      // Indica con valor falso (false) que este servicio no aparece en la sección principal de destacados
      destacado: false,
      // Lista de elementos, tecnologías y beneficios destacados que incluye el servicio
      caracteristicas: ['Mesa de ayuda multicanal', 'Tiempos de respuesta < 2 hrs', 'Mantenimiento mensual preventivo']
    // Cierre del cuarto servicio
    },
    // Datos del quinto servicio del catálogo
    {
      // Número de identificación único asignado a este servicio
      id: 5,
      // Título o nombre público del servicio
      nombre: 'Consultoría Estratégica en Transformación Digital',
      // Clasificación o categoría a la que pertenece el servicio
      categoria: 'Consultoría',
      // Explicación detallada de qué consiste y qué incluye este servicio
      descripcion: 'Asesoría experta para la digitalización de flujos de trabajo, adopción de herramientas ERP/CRM y capacitación técnica de personal.',
      // Precio estimado de referencia en pesos chilenos por sesión o proceso de asesoría
      precio: '$250.000 CLP / asesoría',
      // Estado actual que indica que quedan pocas plazas disponibles para este servicio
      disponibilidad: 'Cupos Limitados',
      // Emoticono o símbolo visual representativo del servicio
      icono: '📊',
      // Indica con valor verdadero (true) que este servicio debe destacarse en la portada
      destacado: true,
      // Lista de elementos, tecnologías y beneficios destacados que incluye el servicio
      caracteristicas: ['Diagnóstico de madurez digital', 'Selección de herramientas clave', 'Capacitación personalizada']
    // Cierre del quinto servicio
    },
    // Datos del sexto servicio del catálogo
    {
      // Número de identificación único asignado a este servicio
      id: 6,
      // Título o nombre público del servicio
      nombre: 'Automatización de Procesos & Chatbots con IA',
      // Clasificación o categoría a la que pertenece el servicio
      categoria: 'Desarrollo de Software',
      // Explicación detallada de qué consiste y qué incluye este servicio
      descripcion: 'Implementación de agentes inteligentes y bots conversacionales con Inteligencia Artificial para atención de clientes y automatización de tareas.',
      // Precio estimado de referencia en pesos chilenos por proyecto
      precio: '$380.000 CLP / proyecto',
      // Estado actual que indica si el servicio se puede contratar ahora mismo
      disponibilidad: 'Disponible',
      // Emoticono o símbolo visual representativo del servicio
      icono: '🤖',
      // Indica con valor falso (false) que este servicio no aparece en la sección principal de destacados
      destacado: false,
      // Lista de elementos, tecnologías y beneficios destacados que incluye el servicio
      caracteristicas: ['Integración WhatsApp / Web', 'Modelos IA entrenados', 'Conexión con CRM y APIs']
    // Cierre del sexto servicio
    }
  // Cierre de la lista de servicios del catálogo
  ],
  // Variable que guarda temporalmente el servicio que el usuario está viendo o ha seleccionado (inicialmente null, es decir, ninguno)
  servicioSeleccionado: null,
  // Lista que almacena todos los formularios de contacto o cotizaciones enviados por los usuarios en la sesión actual
  solicitudesContacto: []
// Cierre del objeto global reactivo de estado
})

// Función exportada que permite a cualquier vista o componente de la aplicación acceder y usar estos datos y funciones
export function useServiciosStore() {
  // Propiedad calculada automáticamente que genera la lista de categorías únicas de servicios para los filtros de búsqueda
  const categorias = computed(() => {
    // Extrae todas las categorías de los servicios y crea un conjunto ('Set') para descartar automáticamente las que se repiten
    const cats = new Set(state.servicios.map(s => s.categoria))
    // Retorna una lista con la opción general 'Todas' al inicio, seguida de las categorías únicas encontradas
    return ['Todas', ...Array.from(cats)]
  // Cierre de la función de cálculo de categorías
  })

  // Función para guardar qué servicio ha elegido el usuario al hacer clic en él
  function seleccionarServicio(servicio) {
    // Guarda el servicio recibido como el servicio activo actualmente seleccionado en el estado global
    state.servicioSeleccionado = servicio
  // Cierre de la función seleccionarServicio
  }

  // Función para deseleccionar el servicio actual y dejar la selección vacía
  function limpiarServicioSeleccionado() {
    // Restablece la variable a null, lo que significa que ya no hay ningún servicio seleccionado
    state.servicioSeleccionado = null
  // Cierre de la función limpiarServicioSeleccionado
  }

  // Función para registrar una nueva solicitud de contacto o cotización enviada desde el formulario
  function registrarSolicitud(solicitud) {
    // Creamos un nuevo objeto para representar la solicitud con datos automáticos de control
    const nueva = {
      // Generamos un identificador numérico único utilizando la marca de tiempo exacta actual en milisegundos
      id: Date.now(),
      // Registramos la fecha y hora exacta del envío formateada según los estándares de Chile
      fecha: new Date().toLocaleString('es-CL'),
      // Incorporamos todos los campos que el usuario completó en el formulario (nombre, email, teléfono, mensaje, etc.)
      ...solicitud
    // Cierre de la definición del objeto de la nueva solicitud
    }
    // Añadimos la nueva solicitud a la lista de solicitudes almacenadas en el estado global
    state.solicitudesContacto.push(nueva)
    // Devolvemos la solicitud recién registrada para que la interfaz pueda confirmar el éxito del registro
    return nueva
  // Cierre de la función registrarSolicitud
  }

  // Retornamos todos los datos y funciones para que queden disponibles para los componentes que utilicen esta tienda
  return {
    // El estado reactivo general con toda la información (empresa, servicios, etc.)
    state,
    // La lista automática de categorías para los filtros
    categorias,
    // La función para marcar un servicio como seleccionado
    seleccionarServicio,
    // La función para quitar la selección de un servicio
    limpiarServicioSeleccionado,
    // La función para guardar una solicitud de contacto
    registrarSolicitud
  // Cierre del objeto con las propiedades y funciones exportadas
  }
// Cierre de la función useServiciosStore
}
