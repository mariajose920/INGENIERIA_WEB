// Importamos las funciones necesarias de vue-router para gestionar las páginas y el historial de navegación
import { createRouter, createWebHashHistory } from 'vue-router'
// Importamos la vista o pantalla principal de Inicio
import InicioView from '../views/InicioView.vue'
// Importamos la vista que muestra información sobre la empresa (Nosotros)
import NosotrosView from '../views/NosotrosView.vue'
// Importamos la vista encargada de mostrar el catálogo de servicios
import ServiciosView from '../views/ServiciosView.vue'
// Importamos la vista que contiene el formulario de contacto
import ContactoView from '../views/ContactoView.vue'

// Definimos una lista (arreglo) que contendrá la configuración de todas las rutas de la web
const routes = [
  // Abrimos la configuración para la ruta de la página de inicio
  {
    // Ruta URL raíz que se carga al entrar al sitio web
    path: '/',
    // Nombre identificador único de esta ruta para poder referenciarla
    name: 'inicio',
    // Componente de pantalla que se mostrará al visitar esta ruta
    component: InicioView,
    // Datos adicionales asociados a la ruta, como el título de la pestaña del navegador
    meta: { title: 'Inicio - Nexora Soluciones TI' }
  // Cerramos la configuración de la ruta de inicio
  },
  // Abrimos la configuración para la ruta de la página de nosotros
  {
    // Dirección URL en el navegador para ver quiénes somos
    path: '/nosotros',
    // Nombre identificador de la ruta de nosotros
    name: 'nosotros',
    // Componente visual que muestra la información institucional
    component: NosotrosView,
    // Título que se colocará en la pestaña del navegador al estar en esta página
    meta: { title: 'Nosotros - Nexora Soluciones TI' }
  // Cerramos la configuración de la ruta de nosotros
  },
  // Abrimos la configuración para la ruta del catálogo de servicios
  {
    // Dirección URL en el navegador para la sección de servicios
    path: '/servicios',
    // Nombre identificador para la ruta de servicios
    name: 'servicios',
    // Componente visual que lista y filtra los servicios disponibles
    component: ServiciosView,
    // Título que aparecerá en la pestaña del navegador en la sección de servicios
    meta: { title: 'Servicios - Nexora Soluciones TI' }
  // Cerramos la configuración de la ruta de servicios
  },
  // Abrimos la configuración para la ruta de la página de contacto
  {
    // Dirección URL en el navegador para acceder al formulario de contacto
    path: '/contacto',
    // Nombre identificador para la ruta de contacto
    name: 'contacto',
    // Componente visual que contiene el formulario para enviar mensajes y cotizaciones
    component: ContactoView,
    // Título que aparecerá en la pestaña del navegador en la sección de contacto
    meta: { title: 'Contacto - Nexora Soluciones TI' }
  // Cerramos la configuración de la ruta de contacto
  },
  // Abrimos la configuración para capturar cualquier ruta inexistente o no encontrada (error 404)
  {
    // Patrón comodín que detecta cualquier dirección URL que no coincida con las anteriores
    path: '/:pathMatch(.*)*',
    // Redirige automáticamente al usuario hacia la página de inicio
    redirect: '/'
  // Cerramos la configuración de la ruta comodín
  }
// Cerramos la lista de todas las rutas
]

// Creamos y configuramos el objeto del enrutador principal de la aplicación
const router = createRouter({
  // Indicamos que el historial use modo hash con almohadilla (#), asegurando compatibilidad en cualquier servidor
  history: createWebHashHistory(),
  // Asociamos la lista de rutas definidas anteriormente al enrutador
  routes,
  // Función que define el comportamiento del desplazamiento de la página al cambiar de ruta
  scrollBehavior() {
    // Hace que la pantalla se desplace suavemente hacia arriba (posición 0) en cada cambio de página
    return { top: 0, behavior: 'smooth' }
  // Cerramos la función de desplazamiento de pantalla
  }
// Cerramos la configuración de creación del enrutador
})

// Configuramos una acción que se ejecuta automáticamente justo después de navegar a cualquier página
router.afterEach((to) => {
  // Comprobamos si la nueva página a la que se ingresó tiene configurado un título
  if (to.meta && to.meta.title) {
    // Asignamos el título correspondiente al documento para que se actualice la pestaña del navegador
    document.title = to.meta.title
  // Cerramos el bloque condicional
  }
// Cerramos la función que se ejecuta tras cada navegación
})

// Exportamos el enrutador ya configurado para que la aplicación principal pueda utilizarlo
export default router
