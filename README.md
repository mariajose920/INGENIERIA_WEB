# Actividad 11 - Feria Artesanal de Ñuble

## Objetivo
Construir un catálogo interactivo con Vue.js integrando todo lo aprendido en la unidad.

## Conceptos aplicados
- **v-model**: Sincroniza en tiempo real lo que el usuario ingresa en el buscador y el selector de categorías con el estado de Vue.
- **v-if / v-else**: Permite alternar entre mostrar la grilla de productos o un estado vacío cuando la búsqueda no coincide con nada. Además, controla la existencia del modal de detalles.
- **v-show**: Oculta el catálogo completo en la pantalla, pero mantiene su renderizado en el DOM oculto mediante CSS.
- **v-for**: Recorre dinámicamente nuestra lista de productos para crear cada tarjeta `ProductoCard`.
- **computed**: Recalcula la lista final de productos automáticamente filtrando por el texto de búsqueda y la categoría cada vez que el usuario los cambia.
- **props y eventos**: Las propiedades (`props`) permiten enviar el objeto del producto desde `App.vue` hacia los componentes hijos (`ProductoCard` y `ProductoModal`), y los eventos (`emit`) permiten que el hijo avise al padre cuándo abrir o cerrar el modal.

## Ejecutar
```bash
npm install
npm run dev
```

## Estructura
- `App.vue`: Es el componente raíz. Mantiene el estado global, la lógica del filtrado y orquesta todo el diseño, incluyendo el buscador y la grilla.
- `ProductoCard.vue`: Componente reutilizable que representa un solo producto en forma de tarjeta.
- `ProductoModal.vue`: Ventana sobrepuesta para mostrar el detalle completo de un producto seleccionado.
- `productos.js`: Archivo fuente de datos de donde se alimenta el catálogo simulando una API externa.

## Cambios realizados (Desafío de aplicación)
Se han realizado las siguientes mejoras con base en las instrucciones del desafío:
1. Se agregó un **cuarto producto** (`Cántaro de Quinchamalí`) en el archivo `productos.js`, asociado a una nueva categoría (`Cerámica`). El filtro computed lo reconoce perfectamente de forma automática.
2. Se modificó el título principal en `App.vue` de "Feria Artesanal" a **"Mercadito Artesanal de Ñuble"**, e igualmente se personalizó el texto descriptivo manteniendo el foco en la región.
3. Se integró un mensaje visual `v-if="!mostrarCatalogo"` en `App.vue` para informar al usuario de manera clara que el catálogo está oculto cuando presiona el botón "Ocultar catálogo".
4. Se generaron marcadores temporales (archivos vacíos) para las imágenes para prevenir errores de importación local.
