// Importa la función especial 'defineConfig' desde la herramienta Vite para facilitar la configuración del proyecto
import { defineConfig } from 'vite'
// Importa el complemento (plugin) de Vue para permitir que el proyecto entienda y compile archivos de Vue
import vue from '@vitejs/plugin-vue'

// Enlace de referencia a la documentación oficial para consultar todas las opciones de configuración de Vite
// https://vite.dev/config/
// Exporta la configuración principal para que la herramienta sepa cómo construir y ejecutar la aplicación web
export default defineConfig({
  // Lista de complementos (plugins) activos en el proyecto; aquí se activa e integra el soporte para Vue
  plugins: [vue()],
// Cierre de las opciones y final de la función de configuración general
})
