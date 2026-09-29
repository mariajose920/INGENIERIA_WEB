// Importa la función 'createApp' desde la librería Vue para inicializar la aplicación
import { createApp } from 'vue' // Extrae el método createApp del módulo 'vue'
// Importa el componente raíz de la aplicación desde el archivo App.vue
import App from './App.vue' // Carga la estructura y lógica del componente principal App
// Importa los estilos globales definidos en el archivo style.css
import './style.css' // Aplica los estilos globales a toda la aplicación

// Crea la instancia de la aplicación con el componente raíz y la monta en el elemento del DOM con el ID 'app'
createApp(App).mount('#app') // Inicializa la app y la renderiza dentro de <div id="app"></div>

