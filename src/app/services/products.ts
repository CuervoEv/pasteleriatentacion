import { Injectable } from '@angular/core';
import { url } from 'node:inspector';

export interface Product1 {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  categoria?: string;
  tieneCatalogo?: boolean;
  catalogoId?: string;
  esGalletas?: boolean;
  esHojaldre?: boolean;
}

export interface Catalogo {
  id: string;
  nombre: string;
  tipo: 'seleccion' | 'multiple';
  opciones: OpcionCatalogo[];
}

export interface OpcionCatalogo {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

// NUEVA INTERFAZ PARA GALLLETAS
export interface GalletaOpcion {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

export interface HojaldreOpcion {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Catálogos primero
  private catalogos: Catalogo[] = [
    {
      id: 'jugos-naturales',
      nombre: 'Jugos Naturales',
      tipo: 'seleccion',
      opciones: [
        { id: 'naranja', nombre: 'Jugo de Naranja', precio: 5000, descripcion: '100% natural recién exprimido', imagen: 'assets/img/bebidas/jugo-naranja.jpg' },
        { id: 'maracuya', nombre: 'Jugo de Maracuyá', precio: 5500, descripcion: 'Tropical y refrescante', imagen: 'assets/img/bebidas/jugo-maracuya.jpg' },
        { id: 'mango', nombre: 'Jugo de Mango', precio: 5200, descripcion: 'Dulce y cremoso', imagen: 'assets/img/bebidas/jugo-mango.jpg' },
        { id: 'mora', nombre: 'Jugo de Mora', precio: 5300, descripcion: 'Antioxidante natural', imagen: 'assets/img/bebidas/jugo-mora.jpg' },
        { id: 'lulo', nombre: 'Jugo de Lulo', precio: 5600, descripcion: 'Clásico colombiano', imagen: 'assets/img/bebidas/jugo-lulo.jpg' }
      ]
    },
    {
      id: 'yogures-mini',
      nombre: 'Yogures Mini',
      tipo: 'seleccion',
      opciones: [
        { id: 'fresa', nombre: 'Yogurt Mini Fresa', precio: 1800, descripcion: 'Sabor fresa 200ml', imagen: 'assets/img/bebidas/yogurt-fresa.jpg' },
        { id: 'mora', nombre: 'Yogurt Mini Mora', precio: 1800, descripcion: 'Sabor mora 200ml', imagen: 'assets/img/bebidas/yogurt-mora.jpg' },
        { id: 'durazno', nombre: 'Yogurt Mini Durazno', precio: 1800, descripcion: 'Sabor durazno 200ml', imagen: 'assets/img/bebidas/yogurt-durazno.jpg' },
        { id: 'mixto', nombre: 'Yogurt Mini Mixto', precio: 1800, descripcion: 'Mezcla de frutas 200ml', imagen: 'assets/img/bebidas/yogurt-mixto.jpg' }
      ]
    },
    {
      id: 'postobon',
      nombre: 'Productos Postobón',
      tipo: 'seleccion',
      opciones: [
        { id: 'manzana', nombre: 'Gaseosa Manzana 400ml', precio: 3000, descripcion: 'Refrescante sabor manzana', imagen: 'assets/img/bebidas/postobon-manzana.jpg' },
        { id: 'uva', nombre: 'Gaseosa Uva 400ml', precio: 3000, descripcion: 'Clásico sabor uva', imagen: 'assets/img/bebidas/postobon-uva.jpg' },
        { id: 'colombiana', nombre: 'Gaseosa Colombiana 400ml', precio: 3000, descripcion: 'Sabor único colombiano', imagen: 'assets/img/bebidas/postobon-colombiana.jpg' },
        { id: 'agua-manzana', nombre: 'Agua Manzana 500ml', precio: 2800, descripcion: 'Agua saborizada baja en azúcar', imagen: 'assets/img/bebidas/agua-manzana.jpg' },
        { id: 'hit-lulo', nombre: 'Hit Lulo 500ml', precio: 3500, descripcion: 'Energía tropical', imagen: 'assets/img/bebidas/hit-lulo.jpg' }
      ]
    }
  ];

  // NUEVAS OPCIONES DE GALLLETAS
  private galletasOpciones: GalletaOpcion[] = [
    {
      id: 'chocolate-chips',
      nombre: 'Galletas de Chocolate Chips',
      precio: 2000,
      descripcion: 'Crujientes galletas con chips de chocolate',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/chipsdechocolate.jpg'
    },
    {
      id: 'avena-pasas',
      nombre: 'Galletas de Avena con Pasas',
      precio: 1800,
      descripcion: 'Galletas saludables de avena con pasas',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/avena.webp'
    },
    {
      id: 'mantequilla',
      nombre: 'Galletas de Mantequilla',
      precio: 1500,
      descripcion: 'Clásicas galletas de mantequilla doradas',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/mantequilla.webp'
    },
    {
      id: 'coco',
      nombre: 'Galletas de Coco',
      precio: 2200,
      descripcion: 'Galletas esponjosas con coco rallado',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/coco.avif'
    },
    {
      id: 'jengibre',
      nombre: 'Galletas de Jengibre',
      precio: 2500,
      descripcion: 'Galletas especiadas con jengibre y canela',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/jengibre.jpg'
    },
    {
      id: 'limon',
      nombre: 'Galletas de Limón',
      precio: 1900,
      descripcion: 'Galletas refrescantes con ralladura de limón',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/limon.avif'
    },
    {
      id: 'vainilla',
      nombre: 'Galletas de Chocolate',
      precio: 1600,
      descripcion: 'Galletas con una explosion de chocolate',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/chocolate.jpg'
    },
    {
      id: 'nuez',
      nombre: 'Galletas de Nuez',
      precio: 2800,
      descripcion: 'Galletas crujientes con nueces tostadas',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/nuez.jpg'
    },
    {
      id: 'maria',
      nombre: 'Galletas Red-Velvet',
      precio: 1200,
      descripcion: 'Galletas tipo Red-Velvet, perfectas para acompañar cualquier ocacion',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/red.jpg'
    },
    {
      id: 'integral',
      nombre: 'Galletas Integrales',
      precio: 2100,
      descripcion: 'Galletas saludables con harina integral',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/integrales.avif'
    }
  ];

  // NUEVAS OPCIONES DE HOJALDRE
  private hojaldreOpciones: HojaldreOpcion[] = [
    {
      id: 'hojaldre-jamon-queso',
      nombre: 'Hojaldre de Jamón y Queso',
      precio: 3000,
      descripcion: 'Deliciosos bocadillos de hojaldre relleno de jamón y queso',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/jamonyquesi.jpg'
    },
    {
      id: 'hojaldre-pollo',
      nombre: 'Pastel de Pollo',
      precio: 3000,
      descripcion: 'Hojaldre relleno de pollo desmechado con especias',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/Pasteldepollo.jpeg'
    },
    {
      id: 'hojaldre-chocolate',
      nombre: 'Cruassant de Chocolate',
      precio: 2800,
      descripcion: 'Hojaldre dulce relleno de chocolate fundido',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/crochocolate.jpg'
    },

    {
      id: 'hojaldre-carne',
      nombre: 'Emppanadas Hojaldradas',
      precio: 3000,
      descripcion: 'Hojaldre relleno de carne molida sazonada',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/hojalempanada.jpg'
    },
    {
      id: 'hojaldre-rollitos-canela',
      nombre: 'Rollitos de Canela',
      precio: 3500,
      descripcion: 'Rollitos hojaldrados con mucho sabor',
      imagen:'https://cuervoev.github.io/pasteleriatentacion/img/canela.jpg'
    },
    {
      id: 'hojaldre-queso',
      nombre: 'Deditos de Queso',
      precio: 2700,
      descripcion: 'Hojaldre relleno exclusivamente de queso derretido',
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/deditosdequeso.jpg'
    },
  ];

  // Productos - UN SOLO ARRAY CORREGIDO
  private productos: Product1[] = [
    { 
      id: 1, 
      nombre: 'Arepas de Queso', 
      precio: 2500, 
      descripcion: 'Arepa de maíz blanco o amarillo, asada con delicioso queso.', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/Arepadequeso.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 2, 
      nombre: 'Empanada', 
      precio: 2500, 
      descripcion: 'Empanada de maíz rellena de carne, pollo o papa. Crujiente por fuera, sabrosa por dentro.', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/empanada.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 3, 
      nombre: 'Buñuelo', 
      precio: 2000, 
      descripcion: 'Esfera de masa de queso y almidón de yuca. Esencial en navidades colombianas.', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/buenuelo.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 4, 
      nombre: 'Pandebono', 
      precio: 2000, 
      descripcion: 'Panecillo de almidón de yuca y queso. Suave por dentro y ligeramente crujiente.', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/pandebono.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 5, 
      nombre: 'Almojábana', 
      precio: 2000, 
      descripcion: 'Pan de queso y harina de maíz. Perfecto para el desayuno o la merienda.', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/Almojabanas.jpeg',
      categoria: 'amasijos'
    },
    { 
      id: 6, 
      nombre: 'Pastel de Yuca', 
      precio: 2500, 
      descripcion: 'El puré de yuca, suave y cremoso, se complementa con el relleno de carne, arroz y vegetales, aportando un sabor rico y satisfactorio', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/pasteldeyuca.jpg',
      categoria: 'amasijos'
    },
    // BEBIDAS - Con catálogos
    { 
      id: 7, 
      nombre: 'Jugos Naturales', 
      precio: 0,
      descripcion: 'Selecciona tu sabor favorito de jugo natural', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/jugnaturales.webp',
      categoria: 'bebidas',
      tieneCatalogo: true,
      catalogoId: 'jugos-naturales'
    },
    { 
      id: 8, 
      nombre: 'Yogures Mini', 
      precio: 0,
      descripcion: 'Variedad de yogures deliciosos', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/yogures.jpg',
      categoria: 'bebidas',
      tieneCatalogo: true,
      catalogoId: 'yogures-mini'
    },
    { 
      id: 9, 
      nombre: 'Productos Postobón', 
      precio: 0,
      descripcion: 'Gaseosas, aguas y bebidas energéticas', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/postobon.webp',
      categoria: 'bebidas', 
      tieneCatalogo: true,
      catalogoId: 'postobon'
    },
    // NUEVOS PRODUCTOS DE GALLLETAS
    { 
      id: 10, 
      nombre: 'Galletas Artesanales', 
      precio: 0,
      descripcion: 'Selecciona tu tipo favorito de galleta artesanal', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/',
      categoria: 'galletas',
      esGalletas: true
    },
    { 
      id: 11, 
      nombre: 'Galletas Especiales', 
      precio: 0,
      descripcion: 'Galletas premium con ingredientes seleccionados', 
      imagen: '/img/galletas.jpg',
      categoria: 'galletas',
      esGalletas: true
    },
    // NUEVOS PRODUCTOS DE HOJALDRE
    { 
      id: 12, 
      nombre: 'Hojaldres Especiales', 
      precio: 0,
      descripcion: 'Deliciosos hojaldres rellenos con ingredientes premium', 
      imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/canela.jpg',
      categoria: 'hojaldre',
      esHojaldre: true
    },
    { 
    id: 15, 
    nombre: 'Curso de Pastelería Básica', 
    precio: 180000, 
    descripcion: 'Aprende técnicas fundamentales de pastelería en 8 sesiones prácticas', 
    imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/cup1.jpg',
    categoria: 'cursos'
  },
  { 
    id: 16, 
    nombre: 'Curso de Decoración Avanzada', 
    precio: 320000, 
    descripcion: 'Domina técnicas profesionales de decoración en 12 sesiones intensivas', 
    imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/cup2.jpg',
    categoria: 'cursos'
  },
  { 
    id: 17, 
    nombre: 'Curso de Panadería Artesanal', 
    precio: 250000, 
    descripcion: 'Especialízate en panadería artesanal con fermentación natural', 
    imagen: 'https://cuervoev.github.io/pasteleriatentacion/img/cup3.jpg',
    categoria: 'cursos'
  }
];
   

  

  getProducts(): Product1[] {
    return this.productos;
  }

  getProductsByCategory(categoria: string): Product1[] {
    return this.productos.filter(producto => producto.categoria === categoria);
  }

  getProductById(id: number): Product1 | undefined {
    return this.productos.find(producto => producto.id === id);
  }

  // Métodos para catálogos
  getCatalogos(): Catalogo[] {
    return this.catalogos;
  }

  getCatalogoById(id: string): Catalogo | undefined {
    return this.catalogos.find(catalogo => catalogo.id === id);
  }

  // NUEVOS MÉTODOS PARA GALLLETAS
  getGalletasOpciones(): GalletaOpcion[] {
    return this.galletasOpciones;
  }

  getGalletaOpcionById(id: string): GalletaOpcion | undefined {
    return this.galletasOpciones.find(galleta => galleta.id === id);
  }

  // NUEVOS MÉTODOS PARA HOJALDRE
  getHojaldreOpciones(): HojaldreOpcion[] {
    return this.hojaldreOpciones;
  }

  getHojaldreOpcionById(id: string): HojaldreOpcion | undefined {
    return this.hojaldreOpciones.find(hojaldre => hojaldre.id === id);
  }
}