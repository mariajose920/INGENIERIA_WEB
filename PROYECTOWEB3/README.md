# Actividad Semana 8 – Empresa de Servicios Tecnológicos
## Nexora Soluciones Digitales & TI (Región de Ñuble)
Aplicación web SPA desarrollada en **Vue 3 + Vite + Vue Router** adaptada para la presentación de servicios empresariales, catálogo interactivo, filtros y formulario de cotización.

---

## Parte 1 – Reutilización del proyecto

### Nombre y Rubro de la Empresa
- **Nombre:** **Nexora Soluciones Digitales & TI**
- **Rubro:** Servicios Tecnológicos, Consultoría TI, Desarrollo de Software, Ciberseguridad, Infraestructura Cloud y Soporte Especializado.
- **Ubicación:** Chillán, Región de Ñuble (con cobertura en todo Chile).

### Elementos conservados y modificados de la Actividad 7:
1. **Conservados:**
   - **Gestión del estado reactivo:** Se conservó el patrón de store centralizado (`reactive`) para mantener la información de la empresa, el listado de servicios, el servicio seleccionado y las solicitudes de contacto sincronizados entre todos los componentes.
   - **Estructura de componentes y modularidad:** Se mantuvieron los principios de componentes reutilizables, binding con `v-model`, directivas condicionales (`v-if`, `v-else`) y renderizado dinámico con `v-for`.
   - **Metodología de validación:** Se reutilizaron las técnicas de validación de campos obligatorios, formatos y saneamiento de cadenas.

2. **Modificados y Eliminados:**
   - Se eliminaron los módulos de inventario escolar (libros, recepciones escolares, proveedores de textos).
   - Se transformaron las pestañas condicionales en un sistema de enrutamiento SPA real con **Vue Router 4** (`createRouter`, `createWebHashHistory`).
   - Se crearon vistas dedicadas para **Inicio**, **Nosotros**, **Servicios** y **Contacto**.
   - Se diseñó el componente reutilizable `ServicioCard.vue` con comunicación mediante `props` y `emit`.

---

## Parte 2 – Navegación y vistas

La aplicación está estructurada como una **Single Page Application (SPA)** con las siguientes vistas principales:

- **Inicio (`/`):** Presentación de alto impacto de la empresa, métricas de desempeño, propuesta de valor, selección de servicios destacados y accesos directos a cotización.
- **Nosotros (`/nosotros`):** Historia de la empresa en la Región de Ñuble, misión, visión, valores corporativos y alcance territorial.
- **Servicios (`/servicios`):** Catálogo completo de prestaciones tecnológicas con barra de búsqueda reactiva, selector de categorías por chips, badges de disponibilidad y tarjetas interactivas.
- **Contacto (`/contacto`):** Formulario de contacto y cotización con validaciones en tiempo real, preselección automática del servicio elegido en el catálogo y tarjeta con datos directos de la empresa.

### Funcionamiento de la Navegación:
Se utiliza `vue-router` en modo `createWebHashHistory()` para garantizar compatibilidad total en despliegues estáticos y servidores locales. En [App.vue](file:///c:/Users/mjvil/OneDrive/Escritorio/INGENIERIA_WEB/PROYECTOWEB3/App.vue) se utiliza `<router-view>` con transiciones animadas y la barra superior [Navbar.vue](file:///c:/Users/mjvil/OneDrive/Escritorio/INGENIERIA_WEB/PROYECTOWEB3/components/Navbar.vue) resalta automáticamente la ruta activa mediante `active-class="active"`.

---

## Parte 3 – Catálogo de servicios y componentes

El catálogo cuenta con 6 servicios especializados almacenados en [stores/useServiciosStore.js](file:///c:/Users/mjvil/OneDrive/Escritorio/INGENIERIA_WEB/PROYECTOWEB3/stores/useServiciosStore.js):
1. **Desarrollo Web & Aplicaciones a Medida** (Desarrollo de Software) - *$450.000 CLP / proyecto*
2. **Ciberseguridad & Auditoría de Vulnerabilidades** (Ciberseguridad) - *$280.000 CLP / mensual*
3. **Infraestructura Cloud & Migración de Servidores** (Cloud & Redes) - *$320.000 CLP / implementación*
4. **Soporte Técnico Especializado & Mantenimiento TI** (Soporte & Mantenimiento) - *$190.000 CLP / mensual*
5. **Consultoría Estratégica en Transformación Digital** (Consultoría) - *$250.000 CLP / asesoría*
6. **Automatización de Procesos & Chatbots con IA** (Desarrollo de Software) - *$380.000 CLP / proyecto*

### Componente Reutilizable `ServicioCard.vue`:
- **Props recibidas:**
  - `servicio`: Objeto que contiene `id`, `nombre`, `categoria`, `descripcion`, `precio`, `disponibilidad`, `icono`, `destacado` y `caracteristicas`.
  - `esSeleccionado`: Booleano que indica si el servicio está actualmente elegido para cotizar.
- Renderiza dinámicamente cada tarjeta mediante `v-for="s in serviciosFiltrados" :key="s.id"`.

---

## Parte 4 – Filtros, condicionales e interacción

- **Búsqueda por texto:** Campo de texto vinculado con `v-model="busqueda"` que busca coincidencias en el nombre o descripción del servicio.
- **Filtro por Categoría:** Botones de filtro rápido vinculados a `categoriaActiva` generados dinámicamente a partir de las categorías existentes en el catálogo.
- **Propiedad Computada (`computed`):** `serviciosFiltrados` procesa ambas condiciones en tiempo real sin mutar el arreglo original `state.servicios`.
- **Condicionales (`v-if`, `v-else`):**
  - Muestra la grilla de servicios si hay resultados (`serviciosFiltrados.length > 0`).
  - Despliega un estado vacío amigable (`empty-results-box`) con botón para restablecer filtros si no hay coincidencias.
  - Insignia de estado según la disponibilidad (`Disponible`, `Alta Demanda`, `Cupos Limitados`).
- **Comunicación mediante `emit`:**
  - Cada tarjeta cuenta con un botón "Solicitar Información". Al hacer clic, `ServicioCard.vue` emite el evento `emit('seleccionar-servicio', props.servicio)`.
  - El componente padre recibe el evento (`@seleccionar-servicio="onSeleccionarServicio"`), almacena la selección en el estado global y muestra una barra de confirmación con acceso rápido al formulario de contacto.

---

## Parte 5 – Formulario de contacto

Ubicado en [views/ContactoView.vue](file:///c:/Users/mjvil/OneDrive/Escritorio/INGENIERIA_WEB/PROYECTOWEB3/views/ContactoView.vue), permite a los clientes solicitar cotizaciones formales.

- **Campos del formulario vinculados con `v-model`:**
  - **Nombre y Apellido:** Obligatorio (mínimo 3 caracteres).
  - **Correo Electrónico:** Obligatorio con validación de formato mediante expresión regular (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - **Teléfono / WhatsApp:** Obligatorio con validación numérica (mínimo 8 dígitos).
  - **Servicio de Interés:** Select desplegable con todas las opciones del catálogo. Se auto-selecciona si el usuario hizo clic en "Solicitar Información" desde el catálogo de servicios.
  - **Mensaje / Requerimiento:** Obligatorio (mínimo 10 caracteres).

- **Validación y Confirmación:**
  - Si existen campos incompletos, se destacan los bordes en rojo y se despliegan mensajes de error explicativos.
  - Al enviar exitosamente, se oculta el formulario y se despliega una **Tarjeta de Resumen (#ID)** con todos los datos registrados y un botón para realizar una nueva consulta.

---

## Parte 6 – Diseño y revisión final

- **Paleta de Colores:** Basada en tonos azul pizarra (`#0f172a`, `#1e3a8a`, `#2563eb`), acentos violetas y verdes de disponibilidad sobre fondo limpio (`#f8fafc`).
- **Tipografía:** Familia **Inter** de Google Fonts para óptima legibilidad en pantallas de alta densidad.
- **Diseño Responsivo:** Grillas adaptables (`grid-template-columns: repeat(auto-fit, minmax(...))`) y menú de navegación colapsable para dispositivos móviles.
- **Consola del Navegador:** Verificada con 0 advertencias o errores en tiempo de ejecución.
