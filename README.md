# Repositorio Consolidado: Ingeniería Web

Este repositorio es una consolidación del historial y los proyectos realizados a lo largo de las distintas actividades, organizadas en carpetas. Se conservó el historial de commits original de cada proyecto (mediante la unión de los historiales).

## 📂 Estructura del repositorio

### `Actividad_1_a_9/`
Contiene la evolución del proyecto base desde las primeras actividades hasta la **Actividad 9**. 
- **Actividades 1 a 8**: Desarrollo progresivo del Frontend en Vue 3 con validaciones, listados, catálogos e interacción de componentes (SPA y stores).
- **Actividad 9**: Se incorporó una subcarpeta `backend` con el primer servidor Express y los datos de servicios (`servicios.js`), junto a la lógica de endpoints GET y filtros.
- Puedes leer el detalle de la evolución en el [README de Frontend](Actividad_1_a_9/README.md) y el [README de Backend Express](Actividad_1_a_9/backend/README.md).

### `Actividad_10/`
Contiene la **Actividad 10** enfocada en **NestJS**.
- Refactorización de la API original hacia una arquitectura NestJS con **TypeORM** y **SQLite** (`better-sqlite3`).
- DTOs, validaciones mediante Pipes globales y documentación generada automáticamente con Swagger.
- Incluye el script de llenado de base de datos (`seed.ts`).
- [Ver el README detallado](Actividad_10/README.md)

### `Actividad_11/`
Contiene el desafío de la Feria (o Mercadito) Artesanal de Ñuble desarrollado íntegramente en **Vue 3**.
- Integración de todas las directivas aprendidas (`v-if`, `v-else`, `v-show`, `v-for`, `v-model`) en una Interfaz interactiva de tarjetas.
- Desarrollo de un catálogo dinámico con ventana modal.
- Propiedades computadas (`computed`) para los filtros y buscador en tiempo real.
- [Ver el README detallado](Actividad_11/README.md)

---
*Todos los commits del paso a paso de cada actividad se encuentran preservados en el log de Git de este repositorio maestro.*
