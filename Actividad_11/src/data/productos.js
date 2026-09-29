// Importa la imagen local del queso Chanco desde la carpeta de recursos visuales
import imgQueso from '../assets/img/quesos-chillan.jpg' // Guarda la imagen del queso en la variable imgQueso
// Importa la imagen local de la miel de Quillón desde la carpeta de recursos visuales
import imgMiel from '../assets/img/miel-chillan.jpg' // Guarda la imagen de la miel en la variable imgMiel
// Importa la imagen local del poncho y tejidos desde la carpeta de recursos visuales
import imgTejidos from '../assets/img/tejidos-chillan.jpg' // Guarda la imagen de los tejidos en la variable imgTejidos
// Importa la imagen local de la cerámica de Quinchamalí desde la carpeta de recursos visuales
import imgCeramica from '../assets/img/ceramica-quinchamali.jpg' // Guarda la imagen de la cerámica en la variable imgCeramica
// Exporta la lista completa de productos para que otros archivos de la aplicación puedan consultarla
export const productos = [ // Inicia la lista (arreglo) que almacena el catálogo de productos disponibles
  { // Inicia los datos del primer producto
    id: 1, // Número identificador único para distinguir este producto de los demás en el sistema
    nombre: 'Queso Chanco de San Carlos', // Nombre visible del producto que se mostrará al cliente
    precio: 4500, // Precio de venta del producto expresado en pesos chilenos ($ CLP)
    categoria: 'Lácteos', // Categoría a la que pertenece el producto para facilitar su búsqueda y filtrado
    imagen: imgQueso, // Asigna la fotografía correspondiente del queso para mostrarla en la tarjeta
    descripcion: 'Queso artesanal de vaca, maduración media, tradicional de Ñuble.' // Texto con detalles y características del producto
  }, // Cierra los datos del primer producto
  { // Inicia los datos del segundo producto
    id: 2, // Número identificador único para distinguir este producto de los demás en el sistema
    nombre: 'Miel de Quillón', // Nombre visible del producto que se mostrará al cliente
    precio: 3500, // Precio de venta del producto expresado en pesos chilenos ($ CLP)
    categoria: 'Miel', // Categoría a la que pertenece el producto para facilitar su búsqueda y filtrado
    imagen: imgMiel, // Asigna la fotografía correspondiente de la miel para mostrarla en la tarjeta
    descripcion: 'Miel multifloral de productores locales, sin aditivos.' // Texto con detalles y características del producto
  }, // Cierra los datos del segundo producto
  { // Inicia los datos del tercer producto
    id: 3, // Número identificador único para distinguir este producto de los demás en el sistema
    nombre: 'Poncho tejido de Coihueco', // Nombre visible del producto que se mostrará al cliente
    precio: 22000, // Precio de venta del producto expresado en pesos chilenos ($ CLP)
    categoria: 'Textil', // Categoría a la que pertenece el producto para facilitar su búsqueda y filtrado
    imagen: imgTejidos, // Asigna la fotografía correspondiente del poncho para mostrarla en la tarjeta
    descripcion: 'Poncho de lana natural, tejido a telar por artesanas de la zona.' // Texto con detalles y características del producto
  }, // Cierra los datos del tercer producto
  { // Inicia los datos del cuarto producto
    id: 4, // Número identificador único para distinguir este producto de los demás en el sistema
    nombre: 'Cántaro de Quinchamalí', // Nombre visible del producto que se mostrará al cliente
    precio: 15000, // Precio de venta del producto expresado en pesos chilenos ($ CLP)
    categoria: 'Cerámica', // Categoría a la que pertenece el producto para facilitar su búsqueda y filtrado
    imagen: imgCeramica, // Asigna la fotografía correspondiente de la cerámica para mostrarla en la tarjeta
    descripcion: 'Pieza de alfarería tradicional en greda negra con decorados blancos, herencia cultural de Ñuble.' // Texto con detalles y características del producto
  } // Cierra los datos del cuarto producto
] // Cierra la lista completa del catálogo de productos
