// Declaramos una lista (arreglo) que guardará la colección de todos los servicios disponibles
const servicios = [
  // Abre el primer registro de servicio con sus detalles
  {
    // Identificador numérico único para este servicio
    id: 1,
    // Nombre o título del servicio que se muestra al cliente
    nombre: 'Desarrollo Web & Aplicaciones a Medida',
    // Categoría o área a la que pertenece este servicio
    categoria: 'Desarrollo de Software',
    // Descripción sencilla de lo que hace el servicio
    descripcion: 'Creación de sitios web y aplicaciones personalizadas para empresas y emprendimientos.',
    // Costo del servicio en dinero
    precio: 450000,
    // Estado de disponibilidad: true significa que actualmente se puede contratar
    disponible: true
  // Cierre de los datos del primer servicio
  },
  // Abre el segundo registro de servicio
  {
    // Identificador único para el servicio número 2
    id: 2,
    // Nombre del servicio de seguridad informática
    nombre: 'Ciberseguridad & Auditoría de Vulnerabilidades',
    // Área temática: Ciberseguridad
    categoria: 'Ciberseguridad',
    // Descripción de la auditoría y protección que se ofrece
    descripcion: 'Análisis de vulnerabilidades y protección de sistemas de información.',
    // Precio del servicio en dinero
    precio: 280000,
    // Estado de disponibilidad: true significa que se encuentra disponible
    disponible: true
  // Cierre de los datos del segundo servicio
  },
  // Abre el tercer registro de servicio
  {
    // Identificador único para el servicio número 3
    id: 3,
    // Nombre del servicio relacionado con servidores y la nube
    nombre: 'Infraestructura Cloud & Migración de Servidores',
    // Área temática: Cloud & Redes
    categoria: 'Cloud & Redes',
    // Descripción que explica el traspaso de servidores hacia la nube
    descripcion: 'Migración de servicios locales a la nube e implementación de arquitecturas cloud.',
    // Precio del servicio en dinero
    precio: 320000,
    // Estado de disponibilidad: false significa que actualmente no está disponible para contratar
    disponible: false
  // Cierre de los datos del tercer servicio
  },
  // Abre el cuarto registro de servicio
  {
    // Identificador único para el servicio número 4
    id: 4,
    // Nombre del servicio de asistencia técnica
    nombre: 'Soporte Técnico Especializado & Mantenimiento TI',
    // Área temática: Soporte & Mantenimiento
    categoria: 'Soporte & Mantenimiento',
    // Descripción del servicio de ayuda presencial y remota para computadores
    descripcion: 'Soporte remoto y presencial para equipos y sistemas empresariales.',
    // Precio del servicio en dinero
    precio: 190000,
    // Estado de disponibilidad: true indica que está activo y disponible
    disponible: true
  // Cierre de los datos del cuarto servicio
  },
  // Abre el quinto registro de servicio
  {
    // Identificador único para el servicio número 5
    id: 5,
    // Nombre del servicio de consultoría tecnológica
    nombre: 'Consultoría Estratégica en Transformación Digital',
    // Área temática: Consultoría
    categoria: 'Consultoría',
    // Descripción sobre cómo ayuda a modernizar procesos empresariales
    descripcion: 'Asesoramiento para digitalizar procesos y mejorar la eficiencia del negocio.',
    // Precio del servicio en dinero
    precio: 250000,
    // Estado de disponibilidad: true indica que está disponible
    disponible: true
  // Cierre de los datos del quinto servicio
  },
  // Abre el sexto registro de servicio
  {
    // Identificador único para el servicio número 6
    id: 6,
    // Nombre del servicio de automatización e inteligencia artificial
    nombre: 'Automatización de Procesos & Chatbots con IA',
    // Área temática: Desarrollo de Software
    categoria: 'Desarrollo de Software',
    // Descripción de cómo se usa la IA para responder y atender clientes automáticamente
    descripcion: 'Implementación de IA para automatizar atención al cliente y procesos internos.',
    // Precio del servicio en dinero
    precio: 380000,
    // Estado de disponibilidad: false significa que este servicio no está disponible en este momento
    disponible: false
  // Cierre de los datos del sexto servicio
  },
  // Abre el séptimo registro de servicio
  {
    // Identificador único para el servicio número 7
    id: 7,
    // Nombre del servicio de capacitación o cursos para empresas
    nombre: 'Capacitación en Herramientas Digitales',
    // Área temática: Consultoría
    categoria: 'Consultoría',
    // Descripción del entrenamiento en programas informáticos y herramientas de trabajo
    descripcion: 'Cursos de capacitación en herramientas de ofimática, nube y software corporativo.',
    // Precio del servicio en dinero
    precio: 150000,
    // Estado de disponibilidad: true significa que está disponible para impartir
    disponible: true
  // Cierre de los datos del séptimo servicio
  },
  // Abre el octavo registro de servicio
  {
    // Identificador único para el servicio número 8
    id: 8,
    // Nombre del servicio de mantención y cuidado de servidores
    nombre: 'Mantenimiento Preventivo de Servidores',
    // Área temática: Soporte & Mantenimiento
    categoria: 'Soporte & Mantenimiento',
    // Descripción de las tareas para evitar problemas técnicos y mantener buen rendimiento
    descripcion: 'Revisión y optimización de servidores para prevenir fallas y mejorar rendimiento.',
    // Precio del servicio en dinero
    precio: 120000,
    // Estado de disponibilidad: true indica que está disponible
    disponible: true
  // Cierre de los datos del octavo servicio
  }
// Cierre de la lista de servicios
]

// Exportamos la lista de servicios para que otros archivos del servidor puedan consultarla y usarla
module.exports = servicios
