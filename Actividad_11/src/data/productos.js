import imgQueso from '../assets/img/quesos-chillan.jpg' // Importa la imagen local del queso Chanco
import imgMiel from '../assets/img/miel-chillan.jpg' // Importa la imagen local de la miel de Quillón
import imgTejidos from '../assets/img/tejidos-chillan.jpg' // Importa la imagen local del poncho y tejidos
import imgCeramica from '../assets/img/ceramica-quinchamali.jpg' // Importa la imagen local de la cerámica de Quinchamalí

export const productos = [ // Exporta el arreglo que contiene el catálogo de productos disponibles
  { // Inicia la definición del objeto correspondiente al primer producto
    id: 1, // Identificador numérico único del producto
    nombre: 'Queso Chanco de San Carlos', // Nombre representativo del producto
    precio: 4500, // Precio unitario del producto en pesos chilenos
    categoria: 'Lácteos', // Categoría o clasificación del producto
    imagen: imgQueso, // Asigna el recurso de imagen importado para este producto
    descripcion: 'Queso artesanal de vaca, maduración media, tradicional de Ñuble.' // Breve reseña descriptiva del producto
  }, // Cierra el objeto del primer producto
  { // Inicia la definición del objeto correspondiente al segundo producto
    id: 2, // Identificador numérico único del producto
    nombre: 'Miel de Quillón', // Nombre representativo del producto
    precio: 3500, // Precio unitario del producto en pesos chilenos
    categoria: 'Miel', // Categoría o clasificación del producto
    imagen: imgMiel, // Asigna el recurso de imagen importado para este producto
    descripcion: 'Miel multifloral de productores locales, sin aditivos.' // Breve reseña descriptiva del producto
  }, // Cierra el objeto del segundo producto
  { // Inicia la definición del objeto correspondiente al tercer producto
    id: 3, // Identificador numérico único del producto
    nombre: 'Poncho tejido de Coihueco', // Nombre representativo del producto
    precio: 22000, // Precio unitario del producto en pesos chilenos
    categoria: 'Textil', // Categoría o clasificación del producto
    imagen: imgTejidos, // Asigna el recurso de imagen importado para este producto
    descripcion: 'Poncho de lana natural, tejido a telar por artesanas de la zona.' // Breve reseña descriptiva del producto
  }, // Cierra el objeto del tercer producto
  { // Inicia la definición del objeto correspondiente al cuarto producto
    id: 4, // Identificador numérico único del producto
    nombre: 'Cántaro de Quinchamalí', // Nombre representativo del producto
    precio: 15000, // Precio unitario del producto en pesos chilenos
    categoria: 'Cerámica', // Categoría o clasificación del producto
    imagen: imgCeramica, // Asigna el recurso de imagen importado para este producto
    descripcion: 'Pieza de alfarería tradicional en greda negra con decorados blancos, herencia cultural de Ñuble.' // Breve reseña descriptiva del producto
  } // Cierra el objeto del cuarto producto
] // Cierra la declaración del arreglo de productos
