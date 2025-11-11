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
      imagen: 'assets/img/galletas/chocolate-chips.jpg'
    },
    {
      id: 'avena-pasas',
      nombre: 'Galletas de Avena con Pasas',
      precio: 1800,
      descripcion: 'Galletas saludables de avena con pasas',
      imagen: 'assets/img/galletas/avena-pasas.jpg'
    },
    {
      id: 'mantequilla',
      nombre: 'Galletas de Mantequilla',
      precio: 1500,
      descripcion: 'Clásicas galletas de mantequilla doradas',
      imagen: 'assets/img/galletas/mantequilla.jpg'
    },
    {
      id: 'coco',
      nombre: 'Galletas de Coco',
      precio: 2200,
      descripcion: 'Galletas esponjosas con coco rallado',
      imagen: 'assets/img/galletas/coco.jpg'
    },
    {
      id: 'jengibre',
      nombre: 'Galletas de Jengibre',
      precio: 2500,
      descripcion: 'Galletas especiadas con jengibre y canela',
      imagen: 'assets/img/galletas/jengibre.jpg'
    },
    {
      id: 'limon',
      nombre: 'Galletas de Limón',
      precio: 1900,
      descripcion: 'Galletas refrescantes con ralladura de limón',
      imagen: 'assets/img/galletas/limon.jpg'
    },
    {
      id: 'vainilla',
      nombre: 'Galletas de Vainilla',
      precio: 1600,
      descripcion: 'Galletas suaves con esencia de vainilla',
      imagen: 'assets/img/galletas/vainilla.jpg'
    },
    {
      id: 'nuez',
      nombre: 'Galletas de Nuez',
      precio: 2800,
      descripcion: 'Galletas crujientes con nueces tostadas',
      imagen: 'assets/img/galletas/nuez.jpg'
    },
    {
      id: 'maria',
      nombre: 'Galletas María',
      precio: 1200,
      descripcion: 'Galletas tipo María, perfectas para acompañar',
      imagen: 'assets/img/galletas/maria.jpg'
    },
    {
      id: 'integral',
      nombre: 'Galletas Integrales',
      precio: 2100,
      descripcion: 'Galletas saludables con harina integral',
      imagen: 'assets/img/galletas/integral.jpg'
    }
  ];

  // NUEVAS OPCIONES DE HOJALDRE
  private hojaldreOpciones: HojaldreOpcion[] = [
    {
      id: 'hojaldre-jamon-queso',
      nombre: 'Hojaldre de Jamón y Queso',
      precio: 3500,
      descripcion: 'Delicioso hojaldre relleno de jamón y queso derretido',
      imagen: 'assets/img/hojaldre/jamon-queso.jpg'
    },
    {
      id: 'hojaldre-pollo',
      nombre: 'Hojaldre de Pollo',
      precio: 3200,
      descripcion: 'Hojaldre relleno de pollo desmechado con especias',
      imagen: 'assets/img/hojaldre/pollo.jpg'
    },
    {
      id: 'hojaldre-chocolate',
      nombre: 'Hojaldre de Chocolate',
      precio: 2800,
      descripcion: 'Hojaldre dulce relleno de chocolate fundido',
      imagen: 'assets/img/hojaldre/chocolate.jpg'
    },
    {
      id: 'hojaldre-espinacas',
      nombre: 'Hojaldre de Espinacas',
      precio: 3000,
      descripcion: 'Hojaldre relleno de espinacas y queso',
      imagen: 'assets/img/hojaldre/espinacas.jpg'
    },
    {
      id: 'hojaldre-champinones',
      nombre: 'Hojaldre de Champiñones',
      precio: 3300,
      descripcion: 'Hojaldre relleno de champiñones salteados',
      imagen: 'assets/img/hojaldre/champinones.jpg'
    },
    {
      id: 'hojaldre-carne',
      nombre: 'Hojaldre de Carne',
      precio: 3400,
      descripcion: 'Hojaldre relleno de carne molida sazonada',
      imagen: 'assets/img/hojaldre/carne.jpg'
    },
    {
      id: 'hojaldre-queso',
      nombre: 'Hojaldre de Queso',
      precio: 2700,
      descripcion: 'Hojaldre relleno exclusivamente de queso derretido',
      imagen: 'assets/img/hojaldre/queso.jpg'
    },
    {
      id: 'hojaldre-verduras',
      nombre: 'Hojaldre de Verduras',
      precio: 2900,
      descripcion: 'Hojaldre relleno de mezcla de verduras frescas',
      imagen: 'assets/img/hojaldre/verduras.jpg'
    },
    {
      id: 'hojaldre-atun',
      nombre: 'Hojaldre de Atún',
      precio: 3100,
      descripcion: 'Hojaldre relleno de atún con cebolla y tomate',
      imagen: 'assets/img/hojaldre/atun.jpg'
    },
    {
      id: 'hojaldre-dulce-leche',
      nombre: 'Hojaldre de Dulce de Leche',
      precio: 2600,
      descripcion: 'Hojaldre dulce relleno de dulce de leche',
      imagen: 'assets/img/hojaldre/dulce-leche.jpg'
    }
  ];

  // Productos - UN SOLO ARRAY CORREGIDO
  private productos: Product1[] = [
    { 
      id: 1, 
      nombre: 'Arepas de Queso', 
      precio: 2500, 
      descripcion: 'Arepa de maíz blanco o amarillo, asada con delicioso queso.', 
      imagen: 'assets/img/amasijos/arepa.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 2, 
      nombre: 'Empanada', 
      precio: 2500, 
      descripcion: 'Empanada de maíz rellena de carne, pollo o papa. Crujiente por fuera, sabrosa por dentro.', 
      imagen: 'assets/img/amasijos/empanada.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 3, 
      nombre: 'Buñuelo', 
      precio: 2000, 
      descripcion: 'Esfera de masa de queso y almidón de yuca. Esencial en navidades colombianas.', 
      imagen: '/img/amasijos/bunuelo.jpg',
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
      precio: 2000, 
      descripcion: 'Pan de queso y harina de maíz. Perfecto para el desayuno o la merienda.', 
      imagen: 'assets/img/amasijos/almojabana.jpg',
      categoria: 'amasijos'
    },
    { 
      id: 6, 
      nombre: 'Pastel de Yuca', 
      precio: 2500, 
      descripcion: 'El puré de yuca, suave y cremoso, se complementa con el relleno de carne, arroz y vegetales, aportando un sabor rico y satisfactorio', 
      imagen: 'assets/img/amasijos/pan-yuca.jpg',
      categoria: 'amasijos'
    },
    // BEBIDAS - Con catálogos
    { 
      id: 7, 
      nombre: 'Jugos Naturales', 
      precio: 0,
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
    },
    // NUEVOS PRODUCTOS DE GALLLETAS
    { 
      id: 10, 
      nombre: 'Galletas Artesanales', 
      precio: 0,
      descripcion: 'Selecciona tu tipo favorito de galleta artesanal', 
      imagen: 'assets/img/galletas/galletas-generico.jpg',
      categoria: 'galletas',
      esGalletas: true
    },
    { 
      id: 11, 
      nombre: 'Galletas Especiales', 
      precio: 0,
      descripcion: 'Galletas premium con ingredientes seleccionados', 
      imagen: 'assets/img/galletas/galletas-especiales.jpg',
      categoria: 'galletas',
      esGalletas: true
    },
    // NUEVOS PRODUCTOS DE HOJALDRE
    { 
      id: 12, 
      nombre: 'Hojaldres Especiales', 
      precio: 0,
      descripcion: 'Deliciosos hojaldres rellenos con ingredientes premium', 
      imagen: 'assets/img/hojaldre/hojaldre-generico.jpg',
      categoria: 'hojaldre',
      esHojaldre: true
    },
    { 
      id: 13, 
      nombre: 'Hojaldres Clásicos', 
      precio: 0,
      descripcion: 'Hojaldres tradicionales con los rellenos más populares', 
      imagen: 'assets/img/hojaldre/hojaldre-clasico.jpg',
      categoria: 'hojaldre',
      esHojaldre: true
    },
    { 
      id: 14, 
      nombre: 'Hojaldres Dulces', 
      precio: 0,
      descripcion: 'Hojaldres dulces perfectos para el postre', 
      imagen: 'assets/img/hojaldre/hojaldre-dulce.jpg',
      categoria: 'hojaldre',
      esHojaldre: true
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