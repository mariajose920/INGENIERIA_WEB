// Importa la función 'createApp' desde la librería Vue para inicializar y configurar la aplicación web
import { createApp } from 'vue'
// Importa la hoja de estilos CSS general para darle apariencia visual, colores y diseño a toda la página
import './style.css'
// Importa el componente raíz 'App' que contiene la estructura, vistas y lógica principal de la aplicación
import App from './App.vue'

// Crea la instancia de la aplicación Vue usando el componente App y la inserta o monta en el contenedor HTML con el id "app"
createApp(App).mount('#app')