<!-- Bloque de lógica y funcionamiento interno del componente usando Vue 3 -->
<script setup>
// Importa la función reactiva 'ref' desde la biblioteca Vue para almacenar y sincronizar datos con la vista
import { ref } from 'vue'
// Importa la función para acceder al almacén global compartido de recepciones y catálogo de libros
import { useRecepcionStore } from '../stores/useRecepcionStore.js'

// Extrae el estado global reactivo ('state') que contiene las listas y secuencias compartidas
const { state } = useRecepcionStore()

// Declara una variable reactiva llamada 'form' que contiene los campos del formulario para un nuevo libro
const form = ref({
  // Código ISBN identificador único internacional del libro, inicialmente vacío
  isbn: '',
  // Título o nombre del libro escolar o de texto, inicialmente vacío
  titulo: '',
  // Nombre de la editorial que publica el libro, inicialmente vacío
  editorial: '',
  // Nivel escolar educativo asignado al libro, con valor inicial 'Básica'
  nivel: 'Básica',
  // Año de edición o publicación del libro, que toma por defecto el año actual en curso
  anio: new Date().getFullYear()
// Cierre del objeto inicial del formulario
})

// Función que se ejecuta cuando el usuario presiona el botón para registrar o guardar un libro
function guardar() {
  // Limpia el código ISBN eliminando guiones y espacios en blanco para evaluar solo sus dígitos
  const cleanIsbn = form.value.isbn.replace(/[-\s]/g, '')
  // Comprueba si la longitud del ISBN limpio no es exactamente de 10 ni de 13 dígitos
  if (cleanIsbn.length !== 10 && cleanIsbn.length !== 13) {
    // Muestra una ventana de alerta advirtiendo que el ISBN debe tener 10 o 13 dígitos
    alert('ISBN inválido. Ingrese un ISBN de 10 o 13 dígitos.')
    // Detiene la ejecución de la función para impedir registrar datos incorrectos
    return
  // Cierre de la validación del ISBN
  }

  // Verifica si el campo de título está vacío o contiene solo espacios en blanco
  if (!form.value.titulo.trim()) {
    // Muestra una ventana de alerta pidiendo al usuario que escriba el título del libro
    alert('Ingrese el título del libro.')
    // Interrumpe el proceso de guardado para evitar libros sin título
    return
  // Cierre de la validación del título
  }

  // Verifica si el campo de editorial está en blanco o solo tiene espacios
  if (!form.value.editorial.trim()) {
    // Muestra una alerta solicitando el ingreso de la editorial
    alert('Ingrese la editorial del libro.')
    // Detiene la función para que no continúe el registro
    return
  // Cierre de la validación de la editorial
  }

  // Genera un nuevo identificador numérico único incrementando el contador secuencial de libros
  const id = state._seq.libros++
  // Agrega el nuevo libro a la lista o catálogo de libros en el almacén de datos del sistema
  state.libros.push({
    // Asigna el número identificador único generado
    id,
    // Guarda el código ISBN eliminando posibles espacios sobrantes al inicio o al final
    isbn: form.value.isbn.trim(),
    // Guarda el título del libro sin espacios en blanco innecesarios
    titulo: form.value.titulo.trim(),
    // Guarda la editorial del libro recortando los espacios sobrantes
    editorial: form.value.editorial.trim(),
    // Guarda el nivel educativo seleccionado (Básica, Media o Prebásica)
    nivel: form.value.nivel,
    // Convierte el valor del año a formato numérico antes de almacenarlo
    anio: Number(form.value.anio)
  // Cierre del objeto con los datos del libro registrado
  })

  // Restablece los campos del formulario a sus valores originales por defecto o en blanco
  form.value = {
    // Limpia el campo ISBN dejándolo vacío
    isbn: '',
    // Limpia el campo de título dejándolo vacío
    titulo: '',
    // Limpia el campo de editorial dejándolo vacío
    editorial: '',
    // Vuelve a colocar 'Básica' como opción por defecto
    nivel: 'Básica',
    // Vuelve a asignar el año actual en curso
    anio: new Date().getFullYear()
  // Cierre del objeto de restablecimiento del formulario
  }
// Cierre de la función guardar
}

// Función encargada de borrar un libro del catálogo mediante su número de identificación ID
function eliminar(id) {
  // Busca la posición o índice del libro en la lista cuyo ID coincide con el recibido
  const index = state.libros.findIndex(l => l.id === id)
  // Comprueba si el libro fue efectivamente encontrado (índice distinto de -1)
  if (index !== -1) {
    // Elimina exactamente un elemento en la posición encontrada dentro de la lista
    state.libros.splice(index, 1)
  // Cierre de la condición de comprobación
  }
// Cierre de la función eliminar
}
// Cierre del bloque de script setup
</script>

<!-- Bloque de plantilla visual que define la estructura y elementos que se ven en pantalla -->
<template>
  <!-- Contenedor principal que envuelve toda la sección del catálogo de libros -->
  <div class="libros-section">
    <!-- Encabezado de nivel 2 con título descriptivo e icono para la sección -->
    <h2>📖 Catálogo de Libros</h2>

    <!-- Formulario para ingresar nuevos libros que al enviarse previene la recarga y llama a la función guardar -->
    <form class="custom-form" @submit.prevent="guardar">
      <!-- Grupo que reúne la etiqueta y el campo de entrada del código ISBN -->
      <div class="form-group">
        <!-- Etiqueta de texto que describe el campo para ingresar el ISBN -->
        <label>ISBN</label>
        <!-- Campo de texto vinculado a form.isbn con texto de ejemplo y obligatorio para el envío -->
        <input v-model="form.isbn" placeholder="978-956-123456-0" required />
      <!-- Cierre del grupo del campo ISBN -->
      </div>

      <!-- Grupo que reúne la etiqueta y el campo de texto para el título del libro -->
      <div class="form-group">
        <!-- Etiqueta de texto que indica el campo del título -->
        <label>Título</label>
        <!-- Campo de texto conectado reactivamente a form.titulo con ejemplo y carácter obligatorio -->
        <input v-model="form.titulo" placeholder="Ej: Matemática 5° Básico" required />
      <!-- Cierre del grupo del campo de título -->
      </div>

      <!-- Grupo que reúne la etiqueta y el campo de entrada para la editorial -->
      <div class="form-group">
        <!-- Etiqueta de texto que indica el campo de la editorial -->
        <label>Editorial</label>
        <!-- Campo de texto conectado a form.editorial con ejemplo y requerido obligatoriamente -->
        <input v-model="form.editorial" placeholder="Ej: Santillana" required />
      <!-- Cierre del grupo del campo de editorial -->
      </div>

      <!-- Grupo que reúne la etiqueta y el selector desplegable para el nivel educativo -->
      <div class="form-group">
        <!-- Etiqueta de texto que indica el nivel educativo del libro -->
        <label>Nivel Educativo</label>
        <!-- Menú desplegable conectado reactivamente a la variable form.nivel -->
        <select v-model="form.nivel">
          <!-- Opción de selección correspondiente al nivel de educación Básica -->
          <option value="Básica">Básica</option>
          <!-- Opción de selección correspondiente al nivel de educación Media -->
          <option value="Media">Media</option>
          <!-- Opción de selección correspondiente al nivel de educación Prebásica -->
          <option value="Prebásica">Prebásica</option>
        <!-- Cierre del menú desplegable -->
        </select>
      <!-- Cierre del grupo del selector de nivel educativo -->
      </div>

      <!-- Grupo que reúne la etiqueta y el campo numérico para el año de edición -->
      <div class="form-group">
        <!-- Etiqueta de texto que indica el año de publicación o edición -->
        <label>Año Edición</label>
        <!-- Campo numérico vinculado a form.anio que convierte a número y limita entre los años 1990 y 2035 -->
        <input v-model.number="form.anio" type="number" min="1990" max="2035" placeholder="Año" required />
      <!-- Cierre del grupo del campo de año de edición -->
      </div>

      <!-- Botón de acción con estilo destacado para enviar el formulario y registrar el libro -->
      <button class="btn-primary" type="submit">➕ Registrar Libro</button>
    <!-- Cierre de la etiqueta del formulario -->
    </form>

    <!-- Contenedor con soporte de desplazamiento horizontal para la tabla de libros -->
    <div class="table-container">
      <!-- Tabla que lista ordenadamente los datos de todos los libros registrados -->
      <table class="data-table">
        <!-- Cabecera de la tabla que contiene los títulos de las columnas -->
        <thead>
          <!-- Fila que agrupa los títulos de las columnas de la tabla -->
          <tr>
            <!-- Columna de encabezado para el identificador único del libro -->
            <th>ID</th>
            <!-- Columna de encabezado para el código internacional ISBN -->
            <th>ISBN</th>
            <!-- Columna de encabezado para el título del libro -->
            <th>Título</th>
            <!-- Columna de encabezado para el nombre de la editorial -->
            <th>Editorial</th>
            <!-- Columna de encabezado para el nivel escolar correspondiente -->
            <th>Nivel</th>
            <!-- Columna de encabezado para el año de publicación o edición -->
            <th>Año</th>
            <!-- Columna de encabezado para las acciones disponibles como eliminar -->
            <th>Acciones</th>
          <!-- Cierre de la fila de encabezados -->
          </tr>
        <!-- Cierre de la cabecera de la tabla -->
        </thead>
        <!-- Cuerpo de la tabla que contendrá las filas de datos de los libros -->
        <tbody>
          <!-- Fila que se genera de forma repetitiva para cada libro registrado en la lista con su clave única ID -->
          <tr v-for="l in state?.libros || []" :key="l.id">
            <!-- Celda que muestra el identificador numérico precedido por el símbolo gato en negrita -->
            <td><strong>#{{ l.id }}</strong></td>
            <!-- Celda que muestra el código ISBN con fuente monoespaciada para facilitar su lectura técnica -->
            <td><code>{{ l.isbn }}</code></td>
            <!-- Celda que muestra el título del libro con estilo de fuente seminegrita -->
            <td class="font-medium">{{ l.titulo }}</td>
            <!-- Celda que muestra el nombre de la editorial del libro -->
            <td>{{ l.editorial }}</td>
            <!-- Celda que muestra el nivel educativo dentro de una pequeña insignia coloreada -->
            <td><span class="badge">{{ l.nivel }}</span></td>
            <!-- Celda que muestra el año de edición del libro -->
            <td>{{ l.anio }}</td>
            <!-- Celda que contiene los botones de acción para este libro específico -->
            <td>
              <!-- Botón pequeño en color rojo que al pulsarse ejecuta la función eliminar pasando el ID del libro -->
              <button class="btn-danger-sm" @click="eliminar(l.id)">Eliminar</button>
            <!-- Cierre de la celda de acciones -->
            </td>
          <!-- Cierre de la fila individual del libro -->
          </tr>
          <!-- Fila condicional que se muestra únicamente cuando no hay ningún libro en la lista -->
          <tr v-if="!state?.libros?.length">
            <!-- Celda que abarca el ancho completo de las 7 columnas con un mensaje explicativo -->
            <td colspan="7" class="empty-msg">No hay libros registrados aún.</td>
          <!-- Cierre de la fila condicional de lista vacía -->
          </tr>
        <!-- Cierre del cuerpo de la tabla -->
        </tbody>
      <!-- Cierre de la tabla de datos -->
      </table>
    <!-- Cierre del contenedor de la tabla -->
    </div>
  <!-- Cierre del contenedor principal de la sección de libros -->
  </div>
<!-- Cierre del bloque de plantilla visual -->
</template>

<!-- Bloque de estilos CSS scoped con alcance exclusivo para los elementos visuales de este componente -->
<style scoped>
/* Regla de estilos para el encabezado h2 dentro de la sección de libros */
.libros-section h2 {
  /* Quita el margen superior predeterminado del título para alinear correctamente */
  margin-top: 0;
  /* Aplica un margen inferior de 20 píxeles para separar el título del formulario */
  margin-bottom: 20px;
  /* Establece un color de texto azul oscuro pizarra para el título */
  color: #0f172a;
/* Cierre de la regla del título h2 */
}

/* Regla de diseño para el contenedor del formulario personalizado */
.custom-form {
  /* Activa el diseño de cuadrícula moderna para organizar los campos */
  display: grid;
  /* Crea columnas responsivas automáticas de mínimo 170 píxeles y una columna final ajustada al botón */
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) auto;
  /* Establece una separación de 12 píxeles entre filas y columnas de la cuadrícula */
  gap: 12px;
  /* Alinea los campos y el botón hacia la parte inferior para que queden parejos */
  align-items: flex-end;
  /* Aplica un fondo gris claro suave al cuadro del formulario */
  background: #f8fafc;
  /* Añade un relleno interno de 18 píxeles en todos los lados del formulario */
  padding: 18px;
  /* Redondea las cuatro esquinas del contenedor con un radio de 8 píxeles */
  border-radius: 8px;
  /* Añade un borde fino gris de 1 píxel para delimitar el formulario */
  border: 1px solid #e2e8f0;
  /* Añade un margen inferior de 24 píxeles para distanciar el formulario de la tabla */
  margin-bottom: 24px;
/* Cierre de la regla del formulario personalizado */
}

/* Regla para cada bloque o grupo individual de campo en el formulario */
.form-group {
  /* Utiliza el modelo flexible para organizar verticalmente la etiqueta y el control */
  display: flex;
  /* Posiciona los elementos en dirección de columna, uno sobre otro */
  flex-direction: column;
  /* Aplica una separación de 6 píxeles entre la etiqueta y el campo de entrada */
  gap: 6px;
/* Cierre de la regla de grupo de formulario */
}

/* Regla para el estilo tipográfico de las etiquetas descriptivas de los campos */
.form-group label {
  /* Define un tamaño de texto ligeramente compacto de 0.85 unidades rem */
  font-size: 0.85rem;
  /* Aplica grosor de fuente seminegrita para destacar el nombre de cada campo */
  font-weight: 600;
  /* Asigna un color gris azulado intermedio para una apariencia profesional */
  color: #475569;
/* Cierre de la regla de etiquetas */
}

/* Regla unificada de formato visual para los campos de entrada de texto y menús desplegables */
input, select {
  /* Establece un espacio interior de 8 píxeles arriba/abajo y 12 píxeles a los lados */
  padding: 8px 12px;
  /* Define un borde de 1 píxel gris claro alrededor del campo */
  border: 1px solid #cbd5e1;
  /* Suaviza las esquinas del campo con un redondeo de 6 píxeles */
  border-radius: 6px;
  /* Fija el tamaño de fuente del texto ingresado en 0.95 unidades rem */
  font-size: 0.95rem;
  /* Elimina el contorno de selección predeterminado del navegador */
  outline: none;
  /* Asigna color de fondo blanco sólido a los campos */
  background: white;
/* Cierre de la regla para inputs y selects */
}

/* Regla que resalta el campo de entrada o menú cuando el usuario hace clic o se posiciona sobre él */
input:focus, select:focus {
  /* Cambia el color del borde a azul brillante para señalar cuál campo está recibiendo datos */
  border-color: #2563eb;
/* Cierre de la regla de foco en campos */
}

/* Regla de diseño para el botón de acción principal de registrar libro */
.btn-primary {
  /* Añade un relleno interno de 9 píxeles arriba/abajo y 18 píxeles a los lados */
  padding: 9px 18px;
  /* Aplica un color de fondo azul estándar de llamada a la acción */
  background: #2563eb;
  /* Establece el color del texto del botón en blanco para alto contraste */
  color: white;
  /* Quita cualquier borde predeterminado del navegador */
  border: none;
  /* Redondea las esquinas del botón con un radio de 6 píxeles */
  border-radius: 6px;
  /* Aplica grosor de fuente seminegrita al texto del botón */
  font-weight: 600;
  /* Cambia el cursor del ratón a forma de mano indicando que se puede hacer clic */
  cursor: pointer;
  /* Fija una altura de 38 píxeles coincidiendo exactamente con la altura de los campos */
  height: 38px;
  /* Impide que el texto del botón se corte o salte a una segunda línea */
  white-space: nowrap;
/* Cierre de la regla del botón primario */
}

/* Regla que modifica la apariencia del botón primario cuando el cursor del ratón pasa sobre él */
.btn-primary:hover {
  /* Oscurece el tono del fondo a un azul más profundo para dar respuesta visual al usuario */
  background: #1d4ed8;
/* Cierre de la regla de interacción hover del botón primario */
}

/* Regla para el contenedor que aloja la tabla de datos */
.table-container {
  /* Habilita una barra de desplazamiento horizontal automática si la tabla no cabe en pantalla */
  overflow-x: auto;
/* Cierre de la regla del contenedor de tabla */
}

/* Regla principal de presentación para la tabla de datos de libros */
.data-table {
  /* Hace que la tabla abarque todo el ancho disponible del 100% */
  width: 100%;
  /* Colapsa los bordes entre celdas para que se aprecie una cuadrícula delgada y unificada */
  border-collapse: collapse;
  /* Alinea todo el texto de las celdas hacia la izquierda */
  text-align: left;
/* Cierre de la regla de la tabla de datos */
}

/* Regla de formato para las celdas de encabezado de columna de la tabla */
.data-table th {
  /* Aplica un fondo gris claro suave para distinguir visualmente la cabecera */
  background: #f1f5f9;
  /* Asigna un color gris oscuro para el texto de los encabezados */
  color: #475569;
  /* Añade un relleno de 10 píxeles arriba/abajo y 14 píxeles en los lados */
  padding: 10px 14px;
  /* Define un tamaño de letra pequeño de 0.85 unidades rem */
  font-size: 0.85rem;
  /* Convierte automáticamente todo el texto de los encabezados a mayúsculas */
  text-transform: uppercase;
  /* Añade un ligero espacio extra de 0.05em entre letras para facilitar su lectura */
  letter-spacing: 0.05em;
/* Cierre de la regla de encabezados de tabla */
}

/* Regla de formato para las celdas con datos de la tabla */
.data-table td {
  /* Añade un relleno interno de 12 píxeles arriba/abajo y 14 píxeles a los laterales */
  padding: 12px 14px;
  /* Añade una línea divisoria inferior muy suave de 1 píxel entre cada fila */
  border-bottom: 1px solid #f1f5f9;
  /* Asigna un color gris neutro agradable para el texto de los datos */
  color: #334155;
/* Cierre de la regla para celdas de datos */
}

/* Regla que resalta visualmente una fila completa cuando el puntero del ratón se ubica sobre ella */
.data-table tr:hover td {
  /* Aplica un color de fondo gris muy claro a las celdas de la fila activa */
  background-color: #f8fafc;
/* Cierre de la regla de interacción hover sobre filas */
}

/* Regla para textos con peso tipográfico seminegrita */
.font-medium {
  /* Asigna un grosor de letra intermedio de 600 */
  font-weight: 600;
  /* Aplica un color de texto oscuro profundo */
  color: #0f172a;
/* Cierre de la regla de peso medio de fuente */
}

/* Regla de estilo para la insignia o etiqueta visual de nivel educativo */
.badge {
  /* Permite que la insignia se comporte en línea respetando dimensiones y rellenos */
  display: inline-block;
  /* Aplica un relleno compacto de 2 píxeles verticalmente y 8 píxeles horizontalmente */
  padding: 2px 8px;
  /* Aplica un fondo celeste claro muy suave */
  background: #e0f2fe;
  /* Establece un color de texto azul intenso para asegurar un contraste óptimo */
  color: #0369a1;
  /* Redondea las esquinas en forma de píldora mediante un radio de 12 píxeles */
  border-radius: 12px;
  /* Asigna un tamaño de texto reducido de 0.8 unidades rem */
  font-size: 0.8rem;
  /* Aplica grosor de fuente seminegrita */
  font-weight: 600;
/* Cierre de la regla de insignia */
}

/* Regla para el botón de acción secundaria o de peligro para eliminar un libro */
.btn-danger-sm {
  /* Aplica un color de fondo rojizo muy claro de precaución */
  background: #fee2e2;
  /* Establece las letras en un color rojo vivo */
  color: #dc2626;
  /* Añade un borde fino rojizo de 1 píxel alrededor del botón */
  border: 1px solid #fca5a5;
  /* Aplica un relleno compacto de 4 píxeles vertical y 10 píxeles horizontal */
  padding: 4px 10px;
  /* Redondea sutilmente las esquinas del botón con 4 píxeles de radio */
  border-radius: 4px;
  /* Muestra el puntero del ratón como una mano al pasar por encima */
  cursor: pointer;
  /* Define un tamaño de fuente pequeño de 0.85 unidades rem */
  font-size: 0.85rem;
/* Cierre de la regla del botón de eliminar */
}

/* Regla para cuando el cursor del ratón se posa sobre el botón de eliminar */
.btn-danger-sm:hover {
  /* Intensifica ligeramente el fondo rosado rojizo para indicar que responderá al clic */
  background: #fecaca;
/* Cierre de la regla hover del botón de eliminar */
}

/* Regla para el estilo del texto de mensaje informativo cuando no hay libros */
.empty-msg {
  /* Centra horizontalmente el texto dentro de la celda de la tabla */
  text-align: center;
  /* Asigna un color gris tenue para comunicar un estado pasivo o vacío */
  color: #94a3b8;
  /* Añade un espaciado interior amplio de 24 píxeles para dar respiro visual */
  padding: 24px;
/* Cierre de la regla del mensaje de lista vacía */
}
/* Cierre del bloque de estilos CSS */
</style>
