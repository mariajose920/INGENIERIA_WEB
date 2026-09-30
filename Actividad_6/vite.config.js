// Importa la función 'defineConfig' desde Vite, una herramienta que ayuda a definir y validar la configuración del proyecto
import { defineConfig } from 'vite'
// Importa el complemento oficial de Vue para que Vite pueda reconocer, procesar y compilar los componentes de Vue (.vue)
import vue from '@vitejs/plugin-vue'

// Enlace de referencia a la documentación oficial para consultar todas las opciones de configuración de Vite:
// https://vite.dev/config/
// Exporta la configuración principal para que sea utilizada por el servidor de desarrollo y las herramientas de empaquetado
export default defineConfig({
  // Define la lista de complementos (plugins) activos en el proyecto; aquí se inicializa el plugin de Vue
  plugins: [vue()],
// Cierra el objeto de opciones de configuración de Vite
})
