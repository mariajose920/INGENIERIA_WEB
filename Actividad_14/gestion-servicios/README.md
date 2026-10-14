# Panel de administración de servicios tecnológicos (IW600 · Actividad 14)

**Estudiante:** María José Vilches Aranguiz

Continuación de la Actividad 13: CRUD de servicios con búsqueda, filtros, orden, paginación y validaciones.

## Tecnologías
Vue 3, Vue Router, Fetch API y JSON Server.

## Instalación y ejecución (dos terminales)
```bash
npm install

# Terminal 1: API en http://localhost:3000/servicios
npm run api

# Terminal 2: aplicación en http://localhost:5173
npm run dev
```

## Archivos modificados
| Archivo | Cambio |
|---|---|
| `db.json` | 8 servicios y 4 categorías |
| `src/services/serviciosService.js` | Funciones HTTP (antes `serviciosApi.js`), puerto 3000 |
| `src/views/ServiciosView.vue` | Listado con filtros, orden y paginación |
| `src/views/ServicioFormView.vue` | Formulario con validación |
| `src/router/index.js` | Rutas `/servicios`, `/servicios/nuevo`, `/servicios/:id/editar` |
| `src/App.vue`, `src/style.css` | RouterView y estilos |

## Cómo se aplicó cada concepto
- **computed:** `categorias`, `filtrados` (búsqueda + categoría + orden), `totalPaginas`, `visibles` y `precioTotal` se recalculan solos cuando cambian los datos o los filtros.
- **watch:** al cambiar búsqueda, categoría u orden se vuelve a la página 1.
- **fetch:** `serviciosService.js` concentra GET, POST, PUT y DELETE; lanza un `Error` si la respuesta no es `ok`, y cada vista muestra un mensaje comprensible.
- **Validaciones:** antes de enviar se exige nombre de al menos 3 caracteres, categoría válida, precio mayor que cero y descripción de al menos 10 caracteres. Cada error se muestra bajo su campo y Guardar se bloquea mientras se envía.
- **Paginación:** 5 registros por página, con botones Anterior y Siguiente.

## Pruebas
Ver [PRUEBAS.md](PRUEBAS.md): P1 a P10 aprobadas.

## Mejoras personales
- Cuarta categoría "Seguridad" y dos servicios nuevos.
- Botón "Limpiar filtros".
- Precio total de los servicios filtrados.
- Colores propios y tabla adaptada a teléfonos.

## Capturas
Agregar aquí capturas del listado, filtros, segunda página, validación y formulario editado.
