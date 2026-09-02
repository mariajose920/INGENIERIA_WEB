import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import NosotrosView from '../views/NosotrosView.vue'
import ServiciosView from '../views/ServiciosView.vue'
import ContactoView from '../views/ContactoView.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView,
    meta: { title: 'Inicio - Nexora Soluciones TI' }
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    component: NosotrosView,
    meta: { title: 'Nosotros - Nexora Soluciones TI' }
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: ServiciosView,
    meta: { title: 'Servicios - Nexora Soluciones TI' }
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: ContactoView,
    meta: { title: 'Contacto - Nexora Soluciones TI' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
