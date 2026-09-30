<!-- Bloque de código JavaScript con Composition API para la lógica reactiva del componente -->
<script setup>
// Importa la función 'ref' de Vue para crear variables reactivas cuyos cambios actualizan la interfaz automáticamente
import { ref } from 'vue'
// Importa la tienda global compartida de datos de recepción para acceder y modificar la información general
import { useRecepcionStore } from '../stores/useRecepcionStore.js'

// Extrae el estado global reactivo ('state') desde la tienda para leer y guardar datos
const { state } = useRecepcionStore()

// Crea un objeto reactivo que contiene los campos del formulario donde el usuario escribe los datos del proveedor
const form = ref({
  // Campo de texto para almacenar el nombre de la empresa o editorial del proveedor
  nombre: '',
  // Campo de texto para almacenar el número de identificación tributaria (RUT) del proveedor
  rut: '',
  // Campo de texto para almacenar los datos de contacto como correo o teléfono
  contacto: ''
// Cierre del objeto inicial del formulario
})

// Función que se ejecuta al presionar el botón para guardar un nuevo proveedor
function guardar() {
  // Comprueba si el campo de nombre está vacío después de quitar espacios sobrantes
  if (!form.value.nombre.trim()) {
    // Muestra una ventana de alerta avisando al usuario que el nombre es obligatorio
    alert('El nombre del proveedor es obligatorio')
    // Detiene la ejecución de la función para no registrar un dato incompleto
    return
  // Cierre de la condición de validación del nombre
  }
  // Comprueba si el campo de RUT está vacío después de quitar espacios sobrantes
  if (!form.value.rut.trim()) {
    // Muestra una ventana de alerta avisando al usuario que el RUT es obligatorio
    alert('El RUT es obligatorio')
    // Detiene la ejecución de la función para no registrar un dato incompleto
    return
  // Cierre de la condición de validación del RUT
  }

  // Obtiene un número identificador único e incrementa el contador de proveedores en 1 para el siguiente registro
  const id = state._seq.proveedores++
  // Agrega el nuevo proveedor con sus datos limpios al final de la lista global de proveedores
  state.proveedores.push({
    // Asigna el identificador único generado
    id,
    // Guarda el nombre del proveedor sin espacios en blanco al inicio o al final
    nombre: form.value.nombre.trim(),
    // Guarda el RUT del proveedor sin espacios en blanco al inicio o al final
    rut: form.value.rut.trim(),
    // Guarda el contacto del proveedor sin espacios en blanco al inicio o al final
    contacto: form.value.contacto.trim()
  // Cierre del objeto del nuevo proveedor
  })

  // Limpia todos los campos del formulario restableciéndolos a texto vacío para un nuevo ingreso
  form.value = { nombre: '', rut: '', contacto: '' }
// Cierre de la función guardar
}

// Función para eliminar un proveedor según su número identificador (id)
function eliminar(id) {
  // Busca en la lista la posición numérica (índice) donde se encuentra el proveedor con ese id
  const index = state.proveedores.findIndex(p => p.id === id)
  // Verifica si el proveedor fue encontrado en la lista (un índice distinto de -1 indica que sí existe)
  if (index !== -1) {
    // Elimina exactamente un elemento en esa posición de la lista de proveedores
    state.proveedores.splice(index, 1)
  // Cierre de la condición
  }
// Cierre de la función eliminar
}
// Fin del bloque de código JavaScript
</script>

<!-- Bloque de plantilla HTML que define la estructura visual visible en pantalla -->
<template>
  <!-- Contenedor principal de la sección de administración de proveedores -->
  <div class="proveedores-section">
    <!-- Título principal de la sección con un icono de edificio representativo -->
    <h2>🏢 Proveedores</h2>

    <!-- Formulario para ingresar nuevos proveedores; al enviarse previene la recarga de página y llama a la función guardar -->
    <form class="custom-form" @submit.prevent="guardar">
      <!-- Agrupador visual para la etiqueta y el campo de entrada del nombre -->
      <div class="form-group">
        <!-- Texto explicativo que indica al usuario qué debe escribir en este campo -->
        <label>Nombre Empresa / Editorial</label>
        <!-- Campo de texto enlazado bidireccionalmente a form.nombre, obligatorio de llenar -->
        <input v-model="form.nombre" placeholder="Ej: Editorial Santillana" required />
      <!-- Cierre del agrupador del campo de nombre -->
      </div>

      <!-- Agrupador visual para la etiqueta y el campo de entrada del RUT -->
      <div class="form-group">
        <!-- Texto explicativo que indica que en este campo va el RUT -->
        <label>RUT</label>
        <!-- Campo de texto enlazado bidireccionalmente a form.rut, obligatorio de llenar -->
        <input v-model="form.rut" placeholder="Ej: 76.123.456-7" required />
      <!-- Cierre del agrupador del campo de RUT -->
      </div>

      <!-- Agrupador visual para la etiqueta y el campo de entrada del contacto -->
      <div class="form-group">
        <!-- Texto explicativo que indica que se puede ingresar correo o teléfono -->
        <label>Contacto (Email / Teléfono)</label>
        <!-- Campo de texto opcional enlazado bidireccionalmente a form.contacto -->
        <input v-model="form.contacto" placeholder="Ej: contacto@editorial.cl" />
      <!-- Cierre del agrupador del campo de contacto -->
      </div>

      <!-- Botón que activa el envío del formulario para agregar el proveedor registrado -->
      <button class="btn-primary" type="submit">➕ Registrar Proveedor</button>
    <!-- Cierre del formulario de proveedores -->
    </form>

    <!-- Contenedor con barra de desplazamiento horizontal si la tabla excede el ancho de la pantalla -->
    <div class="table-container">
      <!-- Tabla estructurada para presentar el listado de proveedores registrados -->
      <table class="data-table">
        <!-- Encabezado de la tabla que define los títulos de cada columna -->
        <thead>
          <!-- Fila que contiene las celdas de encabezado de columnas -->
          <tr>
            <!-- Columna para mostrar el número identificador del proveedor -->
            <th>ID</th>
            <!-- Columna para mostrar el nombre de la empresa o editorial -->
            <th>Nombre</th>
            <!-- Columna para mostrar el RUT de la empresa -->
            <th>RUT</th>
            <!-- Columna para mostrar el medio de contacto -->
            <th>Contacto</th>
            <!-- Columna para las acciones disponibles, como el botón de eliminar -->
            <th>Acciones</th>
          <!-- Cierre de la fila de encabezado -->
          </tr>
        <!-- Cierre del encabezado de la tabla -->
        </thead>
        <!-- Cuerpo de la tabla donde se muestran los datos de cada proveedor fila por fila -->
        <tbody>
          <!-- Fila que se repite dinámicamente para cada proveedor registrado en la lista -->
          <tr v-for="p in state?.proveedores || []" :key="p.id">
            <!-- Celda que muestra el número identificador único en negrita -->
            <td><strong>#{{ p.id }}</strong></td>
            <!-- Celda que muestra el nombre del proveedor -->
            <td>{{ p.nombre }}</td>
            <!-- Celda que muestra el RUT del proveedor con estilo de código monoespaciado -->
            <td><code>{{ p.rut }}</code></td>
            <!-- Celda que muestra el contacto o un guion largo si está vacío -->
            <td>{{ p.contacto || '—' }}</td>
            <!-- Celda que contiene los botones de acción -->
            <td>
              <!-- Botón rojo que al hacer clic llama a la función eliminar con el id correspondiente -->
              <button class="btn-danger-sm" @click="eliminar(p.id)">Eliminar</button>
            <!-- Cierre de la celda de acciones -->
            </td>
          <!-- Cierre de la fila del proveedor -->
          </tr>
          <!-- Fila condicional que se muestra únicamente cuando no existen proveedores registrados en la lista -->
          <tr v-if="!state?.proveedores?.length">
            <!-- Celda que abarca las 5 columnas mostrando un mensaje informativo de que la lista está vacía -->
            <td colspan="5" class="empty-msg">No hay proveedores registrados aún.</td>
          <!-- Cierre de la fila condicional -->
          </tr>
        <!-- Cierre del cuerpo de la tabla -->
        </tbody>
      <!-- Cierre de la tabla de datos -->
      </table>
    <!-- Cierre del contenedor con desplazamiento horizontal -->
    </div>
  <!-- Cierre del contenedor principal de proveedores -->
  </div>
<!-- Fin del bloque de plantilla HTML -->
</template>

<!-- Bloque de estilos visuales CSS aplicados únicamente a este componente -->
<style scoped>
/* Regla de diseño para el título h2 dentro de la sección de proveedores */
.proveedores-section h2 {
  /* Elimina el margen superior para que no haya espacio extra arriba del título */
  margin-top: 0;
  /* Añade un espacio de separación de 20 píxeles debajo del título */
  margin-bottom: 20px;
  /* Define un color de texto gris oscuro azulado elegante */
  color: #0f172a;
/* Fin de las reglas para el título h2 */
}

/* Regla de diseño para la caja del formulario personalizado */
.custom-form {
  /* Utiliza una cuadrícula adaptable (CSS Grid) para ordenar los campos en filas y columnas */
  display: grid;
  /* Configura columnas automáticas de al menos 200 píxeles y el botón con su tamaño natural al final */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) auto;
  /* Establece una separación de 12 píxeles entre cada campo del formulario */
  gap: 12px;
  /* Alinea todos los elementos al fondo para que queden nivelados verticalmente con el botón */
  align-items: flex-end;
  /* Aplica un color de fondo gris claro azulado suave */
  background: #f8fafc;
  /* Añade un acolchado o relleno interior de 18 píxeles alrededor de todo el formulario */
  padding: 18px;
  /* Redondea las cuatro esquinas de la caja del formulario a 8 píxeles */
  border-radius: 8px;
  /* Agrega una línea de borde delgada de color gris claro */
  border: 1px solid #e2e8f0;
  /* Agrega un margen de separación de 24 píxeles debajo del formulario */
  margin-bottom: 24px;
/* Fin de las reglas del formulario personalizado */
}

/* Regla para cada grupo que contiene una etiqueta y su campo de entrada */
.form-group {
  /* Organiza los elementos internos en una disposición flexible (Flexbox) */
  display: flex;
  /* Coloca la etiqueta encima del campo de entrada ordenándolos verticalmente en columna */
  flex-direction: column;
  /* Añade una separación de 6 píxeles entre la etiqueta y el campo */
  gap: 6px;
/* Fin de las reglas del grupo de formulario */
}

/* Regla de diseño para los textos de las etiquetas dentro de los grupos */
.form-group label {
  /* Establece un tamaño de letra pequeño y legible de 0.85rem */
  font-size: 0.85rem;
  /* Aplica un grosor de letra seminegrita (600) para destacar la etiqueta */
  font-weight: 600;
  /* Define un color gris pizarra oscuro para el texto */
  color: #475569;
/* Fin de las reglas de las etiquetas */
}

/* Regla de diseño para los campos de texto donde el usuario escribe */
input {
  /* Aplica relleno interior de 8 píxeles arriba/abajo y 12 píxeles a los lados */
  padding: 8px 12px;
  /* Aplica un borde sólido de 1 píxel en tono gris suave */
  border: 1px solid #cbd5e1;
  /* Redondea las esquinas del campo a 6 píxeles */
  border-radius: 6px;
  /* Define un tamaño de texto cómodo para leer al escribir (0.95rem) */
  font-size: 0.95rem;
  /* Remueve el contorno por defecto del navegador para personalizarlo */
  outline: none;
  /* Aplica una animación suave de 0.2 segundos al cambiar el color del borde */
  transition: border-color 0.2s;
/* Fin de las reglas generales de los campos de texto */
}

/* Estilo que se activa cuando el usuario hace clic o escribe dentro de un campo de texto (foco) */
input:focus {
  /* Cambia el color del borde a un azul llamativo para indicar que está activo */
  border-color: #2563eb;
/* Fin de las reglas de foco en campos de texto */
}

/* Regla de diseño para el botón principal de registrar proveedor */
.btn-primary {
  /* Añade un relleno interno de 9 píxeles arriba/abajo y 18 píxeles a los lados */
  padding: 9px 18px;
  /* Asigna un fondo de color azul corporativo brillante */
  background: #2563eb;
  /* Establece el texto del botón en color blanco */
  color: white;
  /* Elimina el borde por defecto del botón */
  border: none;
  /* Redondea las esquinas del botón a 6 píxeles */
  border-radius: 6px;
  /* Configura el texto en seminegrita para mayor visibilidad */
  font-weight: 600;
  /* Muestra el cursor como una mano apuntadora al pasar sobre el botón */
  cursor: pointer;
  /* Fija la altura del botón exactamente en 38 píxeles para coincidir con los campos */
  height: 38px;
  /* Evita que el texto del botón se divida en múltiples líneas */
  white-space: nowrap;
  /* Anima suavemente el cambio de color de fondo en 0.2 segundos */
  transition: background-color 0.2s;
/* Fin de las reglas del botón principal */
}

/* Efecto que se aplica cuando el cursor se posiciona sobre el botón principal */
.btn-primary:hover {
  /* Oscurece el color azul del botón para indicar interactividad */
  background: #1d4ed8;
/* Fin del efecto hover del botón principal */
}

/* Regla para el contenedor que envuelve la tabla de datos */
.table-container {
  /* Permite desplazamiento horizontal en pantallas pequeñas si la tabla no cabe */
  overflow-x: auto;
/* Fin de las reglas del contenedor de tabla */
}

/* Regla de diseño general para la tabla de datos de proveedores */
.data-table {
  /* Hace que la tabla ocupe el 100% del ancho disponible de su contenedor */
  width: 100%;
  /* Colapsa los bordes entre celdas para que se vean limpios como una sola línea */
  border-collapse: collapse;
  /* Alinea todo el texto hacia la izquierda */
  text-align: left;
/* Fin de las reglas generales de la tabla */
}

/* Regla de diseño para las celdas de encabezado de la tabla (th) */
.data-table th {
  /* Aplica un color de fondo gris claro suave al encabezado */
  background: #f1f5f9;
  /* Establece el color del texto en gris pizarra */
  color: #475569;
  /* Añade un relleno de 10 píxeles arriba/abajo y 14 píxeles a los laterales */
  padding: 10px 14px;
  /* Fija el tamaño de fuente en 0.85rem */
  font-size: 0.85rem;
  /* Convierte todo el texto de los encabezados a letras mayúsculas */
  text-transform: uppercase;
  /* Añade un ligero espacio extra entre letras para mejorar la legibilidad */
  letter-spacing: 0.05em;
/* Fin de las reglas de los encabezados de tabla */
}

/* Regla de diseño para las celdas de datos con contenido regular de la tabla (td) */
.data-table td {
  /* Añade un relleno de 12 píxeles arriba/abajo y 14 píxeles a los laterales */
  padding: 12px 14px;
  /* Coloca una línea divisoria inferior delgada de color gris claro */
  border-bottom: 1px solid #f1f5f9;
  /* Establece un color de texto gris oscuro neutro */
  color: #334155;
/* Fin de las reglas de las celdas de datos */
}

/* Efecto al pasar el cursor sobre cualquier fila de la tabla */
.data-table tr:hover td {
  /* Cambia sutilmente el fondo de las celdas a un gris muy claro para resaltar la fila activa */
  background-color: #f8fafc;
/* Fin del efecto hover en filas de la tabla */
}

/* Regla de diseño para el botón pequeño de eliminar (rojo suave) */
.btn-danger-sm {
  /* Aplica un fondo de color rojo claro suave */
  background: #fee2e2;
  /* Define el color del texto en rojo intenso */
  color: #dc2626;
  /* Aplica un borde delgado de color rojo pastel */
  border: 1px solid #fca5a5;
  /* Añade un relleno compacto de 4 píxeles arriba/abajo y 10 píxeles a los lados */
  padding: 4px 10px;
  /* Redondea las esquinas del botón a 4 píxeles */
  border-radius: 4px;
  /* Muestra el cursor como una mano apuntadora */
  cursor: pointer;
  /* Define un tamaño de letra pequeño de 0.85rem */
  font-size: 0.85rem;
/* Fin de las reglas del botón pequeño de eliminar */
}

/* Efecto que se aplica cuando el cursor se posiciona sobre el botón de eliminar */
.btn-danger-sm:hover {
  /* Intensifica ligeramente el fondo rojo claro para dar retroalimentación visual */
  background: #fecaca;
/* Fin del efecto hover del botón de eliminar */
}

/* Regla para el mensaje cuando no hay registros en la tabla */
.empty-msg {
  /* Centra el texto horizontalmente dentro de la celda */
  text-align: center;
  /* Aplica un color gris suave atenuado al texto */
  color: #94a3b8;
  /* Añade un espaciado generoso de 24 píxeles de relleno interior */
  padding: 24px;
/* Fin de las reglas del mensaje de tabla vacía */
}
/* Fin del bloque de estilos CSS */
</style>
