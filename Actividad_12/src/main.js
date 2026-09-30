// Importa la función 'createApp' desde la librería Vue para iniciar y configurar la aplicación web
import { createApp } from 'vue'

// Importa el componente principal 'App' que contiene toda la vista y lógica central del sitio
import App from './App.vue'

// Importa la hoja de estilos CSS general para dar diseño, colores y tipografía a la aplicación
import './style.css'

// Crea la aplicación web con el componente principal y la coloca dentro del contenedor HTML que tiene el id "app"
createApp(App).mount('#app')
