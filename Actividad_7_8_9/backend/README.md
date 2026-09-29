# Backend - Actividad 9: Primer Backend con Express.js

**Nombre del estudiante:** María José
**Nombre de la empresa:** Nexora Soluciones Digitales & TI
**Rubro de la empresa:** Servicios Tecnológicos, Consultoría TI, Desarrollo de Software, Ciberseguridad, Infraestructura Cloud y Soporte Especializado.

## Parte 1 y 2 – Preparación del backend
Para preparar el backend, me ubiqué en la carpeta principal del proyecto Vue y utilicé el comando `mkdir backend` para crear una carpeta independiente. Luego, con `cd backend` ingresé a ella y ejecuté `npm init -y`. 
El comando `npm init -y` creó automáticamente el archivo `package.json`, el cual sirve para llevar un registro de la información del proyecto y sus dependencias.
Posteriormente, instalé Express utilizando `npm install express`. Express es un framework minimalista para Node.js que instalamos para facilitar la creación del servidor web, manejar las rutas y estructurar nuestra API de manera mucho más sencilla.

## Parte 3 y 4 – Primer servidor
En la creación del primer servidor en `server.js` utilizamos diversas funciones:
- `app.get()`: Sirve para definir una ruta GET en nuestro servidor. Le indicamos la URL (en este caso `/`) y la función que se ejecutará cuando un cliente visite esa dirección.
- `req` (request): Es el objeto que representa la petición HTTP que hace el cliente, contiene información sobre lo que el cliente está solicitando.
- `res` (response): Es el objeto que utilizamos para enviar una respuesta de vuelta al cliente.
- `app.listen()`: Le indica a nuestra aplicación de Express que comience a escuchar las conexiones entrantes en un puerto específico (en este caso el 3000).

## Parte 5 – Datos de servicios
El archivo `servicios.js` contiene un arreglo de objetos. Cada objeto representa un servicio ofrecido por Nexora e incluye:
- `id`: Identificador único del servicio.
- `nombre`: Nombre del servicio (ej. 'Desarrollo Web & Aplicaciones a Medida').
- `categoria`: Categoría a la que pertenece (ej. 'Desarrollo de Software', 'Ciberseguridad').
- `descripcion`: Una breve descripción de lo que incluye el servicio.
- `precio`: Valor del servicio en CLP.
- `disponible`: Booleano que indica si se encuentra disponible para su contratación.
Para adaptarlo a la empresa, agregué 8 servicios propios del rubro tecnológico con categorías especializadas y descripciones orientadas a soluciones TI.

## Parte 6 – API de servicios
La diferencia principal entre `res.send()` y `res.json()` es el formato de la respuesta:
- `res.send()`: Puede enviar distintos tipos de datos (texto plano, HTML, buffers). Express determina automáticamente el tipo de contenido según lo que le pasemos.
- `res.json()`: Formatea explícitamente la respuesta como un objeto JSON y configura la cabecera `Content-Type` a `application/json`. Es ideal para construir APIs que serán consumidas por aplicaciones frontend como Vue.

## Parte 7 – Consulta por ID
- `req.params`: Es un objeto que contiene propiedades asignadas a los parámetros de la ruta. En nuestra ruta `/api/servicios/:id`, `req.params.id` captura el valor que el usuario ingresa en la URL en lugar de `:id`.
- Se utiliza `Number()` porque los valores obtenidos de la URL (a través de `req.params`) siempre llegan como cadenas de texto (String). Como nuestros IDs en el arreglo son numéricos, necesitamos convertirlos para que la comparación (`===`) funcione correctamente.
- El estado `404` (Not Found) es un código de estado HTTP que indica que el servidor no pudo encontrar el recurso solicitado. En nuestro caso, lo devolvemos cuando se busca un ID de servicio que no existe en nuestro arreglo.

## Parte 8 – Filtro por categoría
La diferencia entre `req.params` y `req.query` radica en cómo se estructuran en la URL:
- `req.params`: Captura valores dinámicos que son parte de la ruta en sí (ej. `/api/servicios/2`). Son ideales para identificar recursos específicos.
- `req.query`: Captura parámetros que se envían al final de la URL después del signo `?` (ej. `/api/servicios?categoria=Consultoría`). Son opciones clave-valor, muy útiles para operaciones opcionales como filtros, búsquedas o paginación.

## Parte 9 – Middleware JSON
El middleware `express.json()` servirá en las próximas actividades como un traductor entre el cliente y el servidor. Cuando desde el frontend (Vue) enviemos datos en formato JSON para crear o actualizar un servicio (con métodos POST o PUT), este middleware se encargará de interceptar esa petición, leer el texto JSON y convertirlo en un objeto JavaScript accesible a través de `req.body`, para que podamos procesarlo cómodamente en nuestro código.

## Parte 12 – Pruebas finales
Se realizaron las siguientes pruebas en el entorno de desarrollo:
1. **Inicio del servidor:** Al ejecutar `node server.js`, la consola mostró "Servidor ejecutándose en http://localhost:3000". No hubo errores de Node.js.
2. **Ruta principal:** Al acceder a `http://localhost:3000/`, el navegador mostró correctamente el mensaje de texto "Servidor de empresa funcionando correctamente".
3. **Obtener todos los servicios:** La consulta a `http://localhost:3000/api/servicios` devolvió el arreglo completo en formato JSON con los 8 servicios.
4. **Consulta de servicio existente (ID):** Al visitar `http://localhost:3000/api/servicios/1`, se recibió correctamente el objeto JSON correspondiente al "Desarrollo Web & Aplicaciones a Medida".
5. **Consulta de servicio inexistente (ID):** Al ingresar `http://localhost:3000/api/servicios/999`, el servidor respondió correctamente con un error 404 y el JSON `{"mensaje": "Servicio no encontrado"}`.
6. **Filtro por categoría existente:** Al usar la URL `http://localhost:3000/api/servicios?categoria=Consultoría`, la API retornó exitosamente solo los servicios pertenecientes a dicha categoría.
7. **Filtro por categoría inexistente:** Al consultar `http://localhost:3000/api/servicios?categoria=Alimentos`, la respuesta fue un arreglo vacío `[]` y el servidor siguió funcionando sin problemas.

## Instrucciones para ejecutar el backend
1. Abre una terminal y ubícate en la carpeta principal de este proyecto (`PROYECTOWEB3`).
2. Ingresa a la carpeta del backend con el comando: `cd backend`
3. Instala las dependencias necesarias en caso de no tenerlas: `npm install`
4. Inicia el servidor ejecutando: `node server.js`
5. La consola indicará que el servidor está corriendo. Puedes probarlo accediendo a `http://localhost:3000` en tu navegador.
6. Para detener el servidor, presiona `Ctrl + C` en la terminal.

## Reflexión final
Esta actividad me permitió dar los primeros pasos fundamentales para convertir una aplicación estática de frontend en un sistema completo Full Stack. Aprendí a configurar un entorno básico con Node.js y Express, entendiendo cómo levantar un servidor capaz de escuchar peticiones y devolver datos estructurales en JSON. Al manejar rutas, parámetros de URL y query strings, logré separar la lógica de presentación de la lógica de datos, lo cual es esencial para crear aplicaciones web escalables. Comprender el rol de los métodos HTTP, los estados de respuesta y los middlewares me prepara sólidamente para la próxima etapa, donde conectaremos finalmente el frontend de Vue con esta nueva API REST.
