# Gestión de Servicios Tecnológicos (IW600 · Actividad 13)

**Estudiante:** María José Vilches Aranguiz

## Objetivo
CRUD de servicios tecnológicos con Vue 3, Vue Router, Fetch y una API REST local (JSON Server).

## Requisitos
Node.js, npm, Git y un navegador.

## Instalación
```bash
npm install
```

## Ejecución (dos terminales)
```bash
# Terminal 1: API REST en http://localhost:3001/servicios
npm run api

# Terminal 2: aplicación en http://localhost:5173
npm run dev
```

## Funcionalidades
- Listado desde la API, con búsqueda por nombre y filtro por categoría.
- Total de servicios filtrados.
- Crear y editar con validación; botón Guardar bloqueado mientras se envía.
- Eliminar con confirmación; mensajes de éxito y error.
- Diseño adaptable a pantallas pequeñas.

## Solicitudes HTTP
- GET `/servicios` y `/servicios/:id`: consultar.
- POST `/servicios`: crear.
- PUT `/servicios/:id`: actualizar.
- DELETE `/servicios/:id`: eliminar.

## Capturas
Agregar aquí capturas de listado, creación, edición y eliminación.
