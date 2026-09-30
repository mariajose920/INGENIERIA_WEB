// Importa el paquete 'express', una herramienta que facilita la creación de servidores web en Node.js
const express = require('express')

// Importa el archivo local de servicios con los datos de ejemplo que ofrecerá la empresa
const servicios = require('./data/servicios')

// Crea la aplicación del servidor web utilizando Express
const app = express()

// Define el número de puerto en la computadora por donde el servidor atenderá las peticiones (puerto 3000)
const PORT = 3000

// Habilita al servidor para recibir, entender y procesar datos enviados en formato JSON
app.use(express.json())

// Establece una ruta de acceso inicial ('/') para cuando alguien ingrese a la dirección principal del servidor
app.get('/', (req, res) => {
  // Responde al usuario enviando un mensaje de texto confirmando que el servidor está en funcionamiento
  res.send('Servidor de empresa funcionando correctamente')
// Finaliza la configuración de la ruta principal
})

// Establece una ruta ('/api/servicios') para consultar la lista de todos los servicios ofrecidos
app.get('/api/servicios', (req, res) => {
  // Extrae de la dirección web el filtro de categoría si el usuario lo proporcionó en la consulta
  const categoria = req.query.categoria

  // Comprueba si el usuario solicitó filtrar por una categoría específica
  if (categoria) {
    // Filtra la lista completa de servicios para conservar únicamente los que coincidan con la categoría
    const resultado = servicios.filter(
      // Evalúa cada servicio de la lista uno por uno
      servicio =>
        // Convierte el nombre de la categoría del servicio a minúsculas para comparar sin importar mayúsculas
        servicio.categoria.toLowerCase() ===
        // Compara con el texto de la categoría solicitada, también convertido a minúsculas
        categoria.toLowerCase()
    // Cierra la función de filtrado
    )
    // Devuelve los servicios que cumplieron el filtro en formato JSON y concluye la respuesta
    return res.json(resultado)
  // Cierra la condición if
  }

  // Si no se solicitó ningún filtro, responde enviando la lista completa de servicios en formato JSON
  res.json(servicios)
// Finaliza la configuración de la ruta de listado de servicios
})

// Establece una ruta dinámica ('/api/servicios/:id') para consultar un servicio específico según su identificador único
app.get('/api/servicios/:id', (req, res) => {
  // Convierte el parámetro 'id' que viene como texto en la dirección web a un número entero
  const id = Number(req.params.id)

  // Busca dentro de la lista de servicios el primer elemento cuyo id coincida exactamente con el id recibido
  const servicio = servicios.find(
    // Compara el id de cada elemento de la lista con el id buscado
    item => item.id === id
  // Cierra la función de búsqueda
  )

  // Comprueba si no se encontró ningún servicio con ese número de identificación
  if (!servicio) {
    // Responde con el código de estado 404 (No Encontrado) y envía un mensaje de error en formato JSON
    return res.status(404).json({
      // Detalle del mensaje explicativo para el usuario o aplicación que hizo la consulta
      mensaje: 'Servicio no encontrado'
    // Cierra el objeto de respuesta JSON
    })
  // Cierra la condición if
  }

  // Si el servicio sí fue encontrado, lo envía como respuesta en formato JSON
  res.json(servicio)
// Finaliza la configuración de la ruta de consulta por identificador
})

// Inicia el servidor para que empiece a escuchar conexiones de usuarios en el puerto definido
app.listen(PORT, () => {
  // Imprime un mensaje en la terminal con la dirección web donde se puede probar el servidor
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
// Finaliza la configuración de inicio del servidor
})
