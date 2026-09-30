// Importa la función 'defineConfig' desde la herramienta Vite, la cual permite definir y validar las opciones de configuración del proyecto
import { defineConfig } from 'vite'

// Importa el plugin oficial de Vue, necesario para que Vite pueda entender, compilar y ejecutar los componentes de Vue (.vue)
import vue from '@vitejs/plugin-vue'

// Enlace a la documentación oficial de Vite con información detallada sobre las opciones de configuración:
// https://vite.dev/config/

// Exporta por defecto la configuración del proyecto para que el servidor de desarrollo y el empaquetador de Vite la utilicen
export default defineConfig({
  // Define la lista de complementos (plugins) activos; aquí se incluye el plugin de Vue para habilitar su funcionamiento en la aplicación
  plugins: [vue()],
// Cierra el bloque de opciones y la función de configuración
})
