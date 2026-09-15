// Importa la función 'createApp' desde la librería Vue para iniciar y configurar una aplicación web
import { createApp } from 'vue'

// Importa la hoja de estilos CSS general para aplicar el diseño visual y colores a toda la aplicación
import './style.css'

// Importa el componente raíz principal 'App.vue', que sirve como estructura base de toda la interfaz
import App from './App.vue'

// Importa el sistema de rutas que permite navegar entre las diferentes páginas del sitio web
import router from './router'

// Crea una nueva instancia de la aplicación web utilizando la estructura base definida en App
const app = createApp(App)

// Registra y activa el sistema de rutas en la aplicación para permitir la navegación entre páginas
app.use(router)

// Conecta e inserta la aplicación interactiva dentro del elemento HTML con el identificador 'app' en el navegador
app.mount('#app')
