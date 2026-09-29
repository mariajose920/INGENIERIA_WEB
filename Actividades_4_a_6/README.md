# Actividad 7 - Recepción de Textos Escolares
Sistema de registro y control de recepción de textos escolares en establecimientos educativos de la Región de Ñuble, desarrollado en **Vue 3 + Vite**.

---

## Diagnóstico inicial

Antes de realizar las correcciones en el código, se levantó el proyecto y se analizaron los diferentes módulos, identificando los siguientes problemas principales:

1. **Problema detectado:** La validación del ISBN en el registro de libros permitía longitudes erróneas (como 11, 12, 14, 15 o 16 caracteres).
   - **Archivo:** `components/Libros.vue`
   - **Posible causa:** La condición utilizaba un rango abierto `< 10 || > 17` en lugar de verificar estrictamente que la longitud fuera exactamente de 10 o 13 caracteres numéricos.

2. **Problema detectado:** Inconsistencia en las propiedades del año de publicación y del identificador de recepción en los diferentes objetos del estado.
   - **Archivo:** `stores/useRecepcionStore.js`, `components/Libros.vue`, `components/Recepciones.vue`, `components/ItemsRecepcion.vue`
   - **Posible causa:** Mezcla de nombres como `anio` vs `anio_publicacion` e `id_recepcion` vs `id_reception`, lo que generaba valores `undefined` o cálculos inconsistentes en las tablas.

3. **Problema detectado:** Pérdida de reactividad y falta de estandarización en el estado compartido de la tienda.
   - **Archivo:** `stores/useRecepcionStore.js`
   - **Posible causa:** El store requería una estructura reactiva única y limpia exportada mediante `reactive` para que las mutaciones en `proveedores`, `libros`, `recepciones` e `items` se reflejaran inmediatamente en todos los componentes consumidores.

4. **Problema detectado:** Manejo inadecuado de tipos de datos en la entrada de cantidades de libros y selección de proveedores.
   - **Archivo:** `components/ItemsRecepcion.vue` y `components/Recepciones.vue`
   - **Posible causa:** Los valores obtenidos de inputs y selects se podían interpretar como `string` si no se parseaban con `Number()`, provocando concatenaciones al sumar cantidades o fallos en comparaciones estrictas (`===`).

5. **Problema detectado:** Desacople y falta de cálculo dinámico para el Total de Libros y el Porcentaje de Defectos en el listado de recepciones.
   - **Archivo:** `components/Recepciones.vue`
   - **Posible causa:** No se utilizaban funciones computadas/helpers reactivos que iteraran directamente sobre la lista de `items` filtrada por `id_recepcion`, o se producían valores `NaN` / `0.0` por falta de control de división por cero.

---

## Estado compartido

- **Qué problema encontró:**
  El almacén central (`stores/useRecepcionStore.js`) presentaba inconsistencias en la estructura de los datos iniciales y en los nombres de las propiedades (`id_recepcion` vs `id_reception`, `anio` vs `anio_publicacion`).
- **Cómo lo corrigió:**
  Se estandarizó el objeto `state` dentro de `useRecepcionStore.js` con una única fuente de verdad reactiva (`reactive({ ... })`), conteniendo arrays consistentes para `proveedores`, `libros`, `recepciones` e `items`, junto con secuencias auto-incrementales `_seq`. La función `useRecepcionStore()` exporta de forma predecible `{ state }`.
- **Por qué el estado debe ser compartido entre los componentes:**
  En una aplicación modular de Vue, diferentes vistas (por ejemplo, el catálogo de libros, el selector en ítems de recepción y el resumen de recepciones) necesitan leer y modificar los mismos datos. Al compartir un estado central reactivo, cualquier cambio (como crear un nuevo libro o añadir un ítem) se sincroniza automáticamente en toda la interfaz sin necesidad de emitir eventos complejos a través de múltiples niveles de componentes.

---

## Gestión de libros

- **Qué error tenía la validación:**
  La validación previa utilizaba `cleanIsbn.length < 10 || cleanIsbn.length > 17`, permitiendo cualquier longitud intermedia (11, 12, 14, 15, 16 dígitos), lo cual es incorrecto para el estándar ISBN.
- **Qué corrección realizó:**
  Se limpiaron los guiones y espacios del input (`replace(/[-\s]/g, '')`) y se aplicó la regla estricta: el ISBN es válido únicamente si su longitud es exactamente **10** o **13** caracteres (`cleanIsbn.length === 10 || cleanIsbn.length === 13`). Además, se validó que contenga formato numérico/alfanumérico válido.
- **Qué problema existía con el año del libro:**
  Existía una discrepancia entre la propiedad `anio` guardada en el formulario y `anio_publicacion` referenciada en la visualización. Se unificó a `anio` como valor numérico (`Number(form.value.anio)`), asegurando que el año se guarde y renderice consistentemente en la tabla.

---

## Gestión de recepciones

- **Qué errores encontró y cómo los corrigió:**
  1. No se garantizaba la selección obligatoria de un proveedor válido antes de enviar el formulario; se añadió validación obligatoria con mensaje al usuario.
  2. El `id_proveedor` se procesaba a veces como `string`; se corrigió guardándolo como `Number(form.value.id_proveedor)`.
  3. Al registrar una nueva recepción, la variable de selección activa (`seleccion`) se actualiza automáticamente con el ID de la nueva recepción, permitiendo cargar ítems de inmediato en el panel de detalle.
  4. La lista de recepciones se procesa de forma reactiva, actualizando la tabla al agregar o eliminar registros.

---

## Detalle de recepción

- **Qué problema existía con el identificador de la recepción:**
  Había ambigüedad entre las propiedades `id_recepcion` e `id_reception` en los ítems, y el paso de la prop `idRecepcion` desde el componente padre `Recepciones.vue` hacia `ItemsRecepcion.vue`.
- **Cómo solucionó el filtrado:**
  Se unificó la propiedad a `id_recepcion` y se creó una propiedad computada `items` que filtra `state.items.filter(it => it.id_recepcion === props.idRecepcion)`.
- **Cómo logró agregar correctamente un nuevo ítem:**
  Se implementó el formulario con selección de libros existentes desde `state.libros`, validando que `cantidad` sea un número entero mayor a 0 (`Number(form.value.cantidad)`), vinculando explícitamente `id_recepcion: props.idRecepcion` y asignando un ID secuencial mediante `state._seq.items++`.

---

## Cálculos de recepción

- **Cómo obtuvo el total:**
  A través de la función `getTotales(recepcionId)`, se filtran todos los ítems asociados a la recepción y se aplica un `reduce` sumando sus cantidades numéricas:
  ```js
  const total = items.reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0)
  ```
- **Cómo determinó los elementos con problemas:**
  Se filtran los ítems cuyo estado sea `'dañado'` o `'mixto'`:
  ```js
  const dañados = items
    .filter(it => it.estado === 'dañado' || it.estado === 'mixto')
    .reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0)
  ```
- **Qué información utilizó para realizar el cálculo:**
  Se utilizaron las cantidades registradas en los ítems asociados a cada recepción y su respectivo `estado`. El porcentaje se calcula de manera segura:
  ```js
  const pct = total > 0 ? ((dañados / total) * 100).toFixed(1) : '0.0'
  ```
  Esto previene divisiones por cero (`0/0` -> `0.0`) y entrega una cifra formateada con un decimal.
