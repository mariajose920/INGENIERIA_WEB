// Importa la función 'defineConfig' desde la herramienta de pruebas Vitest para definir la configuración del sistema de pruebas
import { defineConfig } from 'vitest/config';
// Importa un complemento que permite reconocer las rutas personalizadas o atajos definidos en TypeScript
import tsconfigPaths from 'vite-tsconfig-paths';

// Exporta la configuración principal para que el ejecutor de pruebas sepa cómo comportarse
export default defineConfig({
  // Activa el complemento de rutas para que las pruebas encuentren los archivos usando los alias del proyecto
  plugins: [tsconfigPaths()],
  // Abre la sección de opciones y ajustes específicos para las pruebas automatizadas
  test: {
    // Habilita el uso global de funciones de prueba (como describe, test, expect) sin necesidad de importarlas en cada archivo
    globals: true,
    // Define la carpeta raíz o punto de partida del proyecto desde donde se buscarán y ejecutarán las pruebas
    root: './',
    // Especifica que solo se deben ejecutar los archivos de pruebas de extremo a extremo que terminen en '.e2e-spec.ts'
    include: ['**/*.e2e-spec.ts'],
    // Cierra el bloque de configuración de las pruebas
  },
  // Cierra la definición de la configuración exportada
});
