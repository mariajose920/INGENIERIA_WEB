# Repositorio Consolidado: Ingeniería Web

Este repositorio es una consolidación del historial completo y los proyectos realizados a lo largo del curso. Todas las actividades están unificadas en la misma línea de tiempo de Git, manteniendo su historial de commits original de principio a fin, organizadas en carpetas temáticas correspondientes al paso a paso que solicitaste.

## 📂 Estructura del repositorio

### `Actividades_1_a_3/` (Antes: PROYECTOWEB1)
- Contiene los inicios del proyecto utilizando componentes en Vue (Padre e Hijo), validaciones de los primeros formularios e interacción básica usando `emits` y propiedades.

### `Actividades_4_a_6/` (Antes: PROYECTOWEB2)
- Desarrollo y aplicación de hojas de estilos (`style.css`).
- Formularios interactivos más complejos con validación.
- Implementación de estado global (store) para la recepción y manejo de inventario básico (Libros, Totales, Recepciones).
- Exploración profunda del renderizado dinámico mediante listas y el manejo del estado reactivo global.

### `Actividad_7_8_9/` (Antes: PROYECTOWEB3)
- **Actividades 7 y 8**: Desarrollo progresivo del Frontend moderno y visual. Integración de Layouts, Navbar, Footer, componentes (SPA con Router), adaptándose al giro del negocio de "Servicios Tecnológicos".
- **Actividad 9**: Se incorporó el **Backend** inicial (subcarpeta `/backend`) con el primer servidor Express, el archivo de datos local (`servicios.js`) y la lógica de endpoints GET y filtros para conectar con el frontend.

### `Actividad_10/` (Migración Backend con NestJS)
- Refactorización de la API original (hecha en Express) hacia la arquitectura robusta de **NestJS**.
- Integración de persistencia de base de datos con **TypeORM** y **SQLite** (`better-sqlite3`).
- Creación de DTOs con validadores estrictos y Pipes globales.
- Documentación automatizada de los endpoints (CRUD completo) gracias a **Swagger**.
- Semillas automáticas (`seed.ts`) para poblar la DB con los emprendedores locales.

### `Actividad_11/` (Feria Artesanal de Ñuble - Vue 3)
- Construcción integral del catálogo "Mercadito Artesanal de Ñuble" (Front).
- Integración de todas las directivas aprendidas (`v-if`, `v-else`, `v-show`, `v-for`, `v-model`) aplicadas sobre tarjetas de productos.
- Propiedades computadas (`computed`) para los filtros y las búsquedas en tiempo real.
- Ventana Modal emergente reutilizable para el detalle del producto, y eventos combinados.

---
*Cada carpeta posee sus propios archivos y configuración (`package.json`, etc.). Todo el historial de commits desde la primera actividad ("Initial commit", "componentes Padre e Hijo") hasta la Actividad 11 se ha integrado exitosamente en el `git log` de este único repositorio raíz.*
