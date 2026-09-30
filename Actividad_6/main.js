// Importa la función 'createApp' desde la librería Vue, que es la herramienta encargada de iniciar y construir la aplicación web
import { createApp } from 'vue'
// Importa la hoja de estilos visuales ('style.css') para aplicar el diseño, colores y tipografías a toda la aplicación
import './style.css'
// Importa el componente principal ('App.vue'), que sirve como plantilla raíz donde se organiza toda la interfaz de usuario
import App from './App.vue'

// Inicializa la aplicación de Vue con el componente principal y la monta (despliega) dentro del elemento HTML con el identificador '#app' para que el usuario pueda verla e interactuar con ella en pantalla
createApp(App).mount('#app')

