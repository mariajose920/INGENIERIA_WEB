# Backend NestJS - Emprendedores Ñuble

Este proyecto es el backend de la plataforma de "Emprendedores de Ñuble", migrado a NestJS manteniendo la compatibilidad con el frontend en Vue.

## Requisitos y cómo levantar el proyecto

1.  **Node.js**: Asegúrate de tener Node.js 18+ instalado.
2.  **Instalar dependencias**: Ejecuta `npm install` en la raíz del proyecto.
3.  **Variables de entorno**: Copia `.env.example` a `.env` (este proyecto utiliza SQLite para pruebas locales, por lo que no necesitas configurar credenciales de base de datos adicionalmente).
    ```bash
    cp .env.example .env
    ```
4.  **Ejecutar base de datos seed** (opcional):
    ```bash
    npm run seed
    ```
5.  **Levantar el servidor en desarrollo**:
    ```bash
    npm run start:dev
    ```
    El servidor correrá en `http://localhost:3000`.

## Endpoints

-   `GET /emprendedores`: Retorna la lista completa de emprendedores (200 OK).
-   `GET /emprendedores/:id`: Retorna un emprendedor por su ID (200 OK / 404 Not Found).
-   `GET /emprendedores/buscar?comuna=&rubro=`: Permite buscar emprendedores utilizando los filtros por comuna y rubro. Si no se especifican, devuelve todos. (200 OK).
-   `POST /emprendedores`: Crea un nuevo emprendedor. Requiere validación de DTO (201 Created / 400 Bad Request).
    Ejemplo Request:
    ```json
    {
      "nombre": "Nueva Artesanía",
      "comuna": "Chillán",
      "rubro": "Artesanía",
      "descripcion": "Descripción larga de más de 10 caracteres.",
      "contacto": "hola@ejemplo.cl"
    }
    ```
-   `PUT /emprendedores/:id`: Actualiza un emprendedor existente. (200 OK / 404 Not Found).
-   `DELETE /emprendedores/:id`: Elimina un emprendedor por su ID (200 OK / 404 Not Found).

## Decisiones Técnicas

-   **Pipe global**: Se implementó `ValidationPipe` de forma global para usar `class-validator` y `class-transformer` y asegurar que todos los datos de entrada en las rutas POST/PUT sean validados automáticamente y se remuevan campos no permitidos.
-   **DTOs**: Se crearon `CreateEmprendedorDto` y `UpdateEmprendedorDto` para centralizar las reglas de validación (por ejemplo, mínimo de caracteres, enums para Rubros y validación del campo de contacto).
-   **TypeORM + SQLite**: Elegí utilizar SQLite para mantener la simplicidad del laboratorio local, con sincronización de base de datos (`synchronize: true`) habilitada en desarrollo para la auto-creación de tablas.
-   **Swagger**: La documentación interactiva de la API está habilitada usando `@nestjs/swagger` y puede verse en la ruta `/api`.

## Pruebas y Swagger

Se realizaron pruebas locales usando Postman / Thunder Client para los endpoints indicados, confirmando que la compatibilidad con Vue se mantiene y que se responden correctamente los errores `400` y `404`. Adicionalmente, el documento Swagger está configurado en `http://localhost:3000/api`.
