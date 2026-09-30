// Importa el complemento oficial de Vue para que la herramienta Vite sepa procesar y compilar archivos con formato .vue
import vue from '@vitejs/plugin-vue' // Guarda el plugin de Vue en la variable 'vue' para poder utilizarlo

// Importa la función 'defineConfig' desde Vite, que ayuda a escribir y validar la configuración del proyecto
import { defineConfig } from 'vite' // Trae la utilidad de configuración oficial de Vite

// Enlace de referencia a la documentación oficial para consultar más opciones: https://vite.dev/config/
// Exporta la configuración principal para que el servidor de desarrollo y empaquetador de la web la lean
export default defineConfig({ // Abre el bloque de configuración del proyecto

  // Lista de complementos (plugins) adicionales que Vite ejecutará en el proyecto
  plugins: [vue()], // Activa el plugin de Vue para que la aplicación reconozca los componentes de Vue

}) // Cierra el bloque y la función de configuración de Vite
