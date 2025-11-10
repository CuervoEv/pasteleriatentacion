import { Injectable } from '@angular/core';

export interface Product1 {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  categoria?: string;
  tieneCatalogo?: boolean;
  catalogoId?: string;
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

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Catálogos primero
  private catalogos: Catalogo[] = [
    // En products.ts - Cambiar todos los catálogos a 'seleccion'
  {
    id: 'jugos-naturales',
    nombre: 'Jugos Naturales',
    tipo: 'seleccion', // ✅ Selección única
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
    tipo: 'seleccion', // ✅ CAMBIADO a selección única
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
    tipo: 'seleccion', // ✅ CAMBIADO a selección única
    opciones: [
      { id: 'manzana', nombre: 'Gaseosa Manzana 400ml', precio: 3000, descripcion: 'Refrescante sabor manzana', imagen: 'assets/img/bebidas/postobon-manzana.jpg' },
      { id: 'uva', nombre: 'Gaseosa Uva 400ml', precio: 3000, descripcion: 'Clásico sabor uva', imagen: 'assets/img/bebidas/postobon-uva.jpg' },
      { id: 'colombiana', nombre: 'Gaseosa Colombiana 400ml', precio: 3000, descripcion: 'Sabor único colombiano', imagen: 'assets/img/bebidas/postobon-colombiana.jpg' },
      { id: 'agua-manzana', nombre: 'Agua Manzana 500ml', precio: 2800, descripcion: 'Agua saborizada baja en azúcar', imagen: 'assets/img/bebidas/agua-manzana.jpg' },
      { id: 'hit-lulo', nombre: 'Hit Lulo 500ml', precio: 3500, descripcion: 'Energía tropical', imagen: 'assets/img/bebidas/hit-lulo.jpg' }
    ]
  }
];

  // Productos después
  private productos: Product1[] = [
    { 
      id: 1, 
      nombre: 'Arepa Colombiana', 
      precio: 2500, 
      descripcion: 'Arepa de maíz blanco o amarillo, asada o frita. Tradición en cada hogar colombiano.', 
      imagen: 'assets/img/amasijos/arepa.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 2, 
      nombre: 'Empanada', 
      precio: 3000, 
      descripcion: 'Empanada de maíz rellena de carne, pollo o papa. Crujiente por fuera, sabrosa por dentro.', 
      imagen: 'assets/img/amasijos/empanada.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 3, 
      nombre: 'Buñuelo', 
      precio: 1500, 
      descripcion: 'Esfera de masa de queso y almidón de yuca. Esencial en navidades colombianas.', 
      imagen: 'assets/img/amasijos/bunuelo.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 4, 
      nombre: 'Pandebono', 
      precio: 2000, 
      descripcion: 'Panecillo de almidón de yuca y queso. Suave por dentro y ligeramente crujiente.', 
      imagen: 'assets/img/amasijos/pandebono.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 5, 
      nombre: 'Almojábana', 
      precio: 2200, 
      descripcion: 'Pan de queso y harina de maíz. Perfecto para el desayuno o la merienda.', 
      imagen: 'assets/img/amasijos/almojabana.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 6, 
      nombre: 'Pan de Yuca', 
      precio: 1800, 
      descripcion: 'Panecillo de harina de yuca y queso. Textura suave y sabor único.', 
      imagen: 'assets/img/amasijos/pan-yuca.jpg',
      categoria: 'amasijos'
    },
    // BEBIDAS - Con catálogos
    { 
      id: 7, 
      nombre: 'Jugos Naturales', 
      precio: 0, // Precio base 0 porque se elige del catálogo
      descripcion: 'Selecciona tu sabor favorito de jugo natural', 
      imagen: 'assets/img/bebidas/jugos-naturales.jpg',
      categoria: 'bebidas',
      tieneCatalogo: true,
      catalogoId: 'jugos-naturales'
    },
    { 
      id: 8, 
      nombre: 'Yogures Mini', 
      precio: 0,
      descripcion: 'Variedad de yogures bebibles individuales', 
      imagen: 'assets/img/bebidas/yogures-mini.jpg',
      categoria: 'bebidas',
      tieneCatalogo: true,
      catalogoId: 'yogures-mini'
    },
    { 
      id: 9, 
      nombre: 'Productos Postobón', 
      precio: 0,
      descripcion: 'Gaseosas, aguas y bebidas energéticas', 
      imagen: 'assets/img/bebidas/postobon-catalogo.jpg',
      categoria: 'bebidas', 
      tieneCatalogo: true,
      catalogoId: 'postobon'
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

  // Nuevos métodos para catálogos
  getCatalogos(): Catalogo[] {
    return this.catalogos;
  }

  getCatalogoById(id: string): Catalogo | undefined {
    return this.catalogos.find(catalogo => catalogo.id === id);
  }
}