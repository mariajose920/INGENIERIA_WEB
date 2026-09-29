import imgQueso from '../assets/img/quesos-chillan.jpg'
import imgMiel from '../assets/img/miel-chillan.jpg'
import imgTejidos from '../assets/img/tejidos-chillan.jpg'
import imgCeramica from '../assets/img/ceramica-quinchamali.jpg'

export const productos = [
  {
    id: 1,
    nombre: 'Queso Chanco de San Carlos',
    precio: 4500,
    categoria: 'Lácteos',
    imagen: imgQueso,
    descripcion: 'Queso artesanal de vaca, maduración media, tradicional de Ñuble.'
  },
  {
    id: 2,
    nombre: 'Miel de Quillón',
    precio: 3500,
    categoria: 'Miel',
    imagen: imgMiel,
    descripcion: 'Miel multifloral de productores locales, sin aditivos.'
  },
  {
    id: 3,
    nombre: 'Poncho tejido de Coihueco',
    precio: 22000,
    categoria: 'Textil',
    imagen: imgTejidos,
    descripcion: 'Poncho de lana natural, tejido a telar por artesanas de la zona.'
  },
  {
    id: 4,
    nombre: 'Cántaro de Quinchamalí',
    precio: 15000,
    categoria: 'Cerámica',
    imagen: imgCeramica,
    descripcion: 'Pieza de alfarería tradicional en greda negra con decorados blancos, herencia cultural de Ñuble.'
  }
]
