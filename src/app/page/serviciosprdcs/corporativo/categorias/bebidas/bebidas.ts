import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product1, Catalogo, OpcionCatalogo } from '../../../../../services/products';

// Interfaces extendidas (eliminar OpcionConCantidad)
interface ProductoConCantidad extends Product1 {
  cantidad: number;
  opcionCantidad: string;
  cantidadPersonalizada: number;
}

interface ProductoCarrito extends Product1 {
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  ahorro: number;
  opcionSeleccionada?: OpcionCatalogo;
}

@Component({
  selector: 'app-bebidas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './bebidas.html',
  styleUrls: ['./bebidas.css']
})
export class Bebidas implements OnInit {
  productos: ProductoConCantidad[] = [];
  carrito: ProductoCarrito[] = [];
  
  // Variables para acordeón (eliminar opcionesMultiples)
  productoDesplegado: ProductoConCantidad | null = null;
  opcionSeleccionada: OpcionCatalogo | null = null;
  cantidadCatalogo: number = 30;
  totalCatalogo: number = 0;

  // Variables para cantidad personalizada en catálogo
  opcionCantidadCatalogo: string = '30';
  cantidadPersonalizadaCatalogo: number = 30;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    const productosBase = this.productsService.getProductsByCategory('bebidas');
    this.productos = productosBase.map(producto => ({
      ...producto,
      cantidad: 1,
      opcionCantidad: '1',
      cantidadPersonalizada: 1
    }));
  }

  // ========== MÉTODOS PARA PRODUCTOS NORMALES ==========

  onOpcionCantidadChange(producto: ProductoConCantidad) {
    if (producto.opcionCantidad === 'personalizada') {
      producto.cantidad = producto.cantidadPersonalizada || 1;
    } else {
      producto.cantidad = parseInt(producto.opcionCantidad);
      producto.cantidadPersonalizada = producto.cantidad;
    }
  }

  onCantidadPersonalizadaChange(producto: ProductoConCantidad) {
    if (producto.opcionCantidad === 'personalizada') {
      producto.cantidad = producto.cantidadPersonalizada || 1;
    }
  }

  getPrecioTotal(producto: ProductoConCantidad): number {
    if (!producto.tieneCatalogo) {
      const descuento = this.getDescuento(producto.cantidad);
      const precioSinDescuento = producto.precio * producto.cantidad;
      const descuentoAplicado = precioSinDescuento * (descuento / 100);
      return Math.round(precioSinDescuento - descuentoAplicado);
    }
    return 0;
  }

  agregarAlCarrito(producto: ProductoConCantidad) {
    if (!producto.tieneCatalogo) {
      const precioTotal = this.getPrecioTotal(producto);
      const precioSinDescuento = producto.precio * producto.cantidad;
      const ahorro = precioSinDescuento - precioTotal;

      const productoCarrito: ProductoCarrito = {
        ...producto,
        cantidad: producto.cantidad,
        precioUnitario: producto.precio,
        precioTotal: precioTotal,
        ahorro: ahorro
      };

      this.carrito.push(productoCarrito);
      
      // Resetear
      producto.cantidad = 1;
      producto.opcionCantidad = '1';
      producto.cantidadPersonalizada = 1;
    }
  }

  // ========== MÉTODOS ACORDEÓN CATÁLOGOS ==========

  toggleCatalogo(producto: ProductoConCantidad) {
    if (this.productoDesplegado?.id === producto.id) {
      this.productoDesplegado = null;
      this.opcionSeleccionada = null;
      // Resetear opciones de cantidad del catálogo
      this.opcionCantidadCatalogo = '30';
      this.cantidadPersonalizadaCatalogo = 30;
      this.cantidadCatalogo = 30;
    } else {
      this.productoDesplegado = producto;
      // Inicializar opciones de cantidad
      this.opcionCantidadCatalogo = '30';
      this.cantidadPersonalizadaCatalogo = 30;
      this.cantidadCatalogo = 30;
    }
  }

  getCatalogoOpciones(catalogoId: string): OpcionCatalogo[] {
    const catalogo = this.productsService.getCatalogoById(catalogoId);
    return catalogo?.opciones || [];
  }

  seleccionarOpcionUnica(opcion: OpcionCatalogo, producto: ProductoConCantidad) {
    this.opcionSeleccionada = opcion;
    this.calcularTotalCatalogo();
  }

  // ========== MÉTODOS PARA CANTIDAD PERSONALIZADA EN CATÁLOGO ==========

  onCantidadCatalogoChange() {
    if (this.opcionCantidadCatalogo === 'personalizada') {
      this.cantidadCatalogo = this.cantidadPersonalizadaCatalogo || 1;
    } else {
      this.cantidadCatalogo = parseInt(this.opcionCantidadCatalogo);
      this.cantidadPersonalizadaCatalogo = this.cantidadCatalogo;
    }
    this.calcularTotalCatalogo();
  }

  onCantidadPersonalizadaCatalogoChange() {
    if (this.opcionCantidadCatalogo === 'personalizada') {
      this.cantidadCatalogo = this.cantidadPersonalizadaCatalogo || 1;
      this.calcularTotalCatalogo();
    }
  }

  getCantidadFinalCatalogo(): number {
    return this.cantidadCatalogo;
  }

  // ========== MÉTODOS PRECIOS Y DESCUENTOS ==========

  getDescuento(cantidad: number): number {
    if (cantidad >= 200) return 20;
    if (cantidad >= 100) return 15;
    if (cantidad >= 50) return 10;
    if (cantidad >= 30) return 5;
    return 0;
  }

  // MÉTODO SIMPLIFICADO - SOLO SELECCIÓN ÚNICA
  calcularTotalCatalogo() {
    let total = 0;

    // Solo para selección única
    if (this.opcionSeleccionada) {
      const precioBase = this.opcionSeleccionada.precio * this.cantidadCatalogo;
      const descuento = this.getDescuento(this.cantidadCatalogo);
      total = Math.round(precioBase * (1 - descuento / 100));
    }

    this.totalCatalogo = total;
  }

  // ========== MÉTODOS CARRITO ==========

  // MÉTODO SIMPLIFICADO - SOLO SELECCIÓN ÚNICA
  agregarCatalogoAlCarrito(producto: ProductoConCantidad) {
    // Solo para selección única
    if (this.opcionSeleccionada) {
      const precioSinDescuento = this.opcionSeleccionada.precio * this.cantidadCatalogo;
      const ahorro = precioSinDescuento - this.totalCatalogo;

      const productoCarrito: ProductoCarrito = {
        ...producto,
        nombre: `${producto.nombre} - ${this.opcionSeleccionada.nombre}`,
        precio: this.opcionSeleccionada.precio,
        descripcion: this.opcionSeleccionada.descripcion,
        imagen: this.opcionSeleccionada.imagen,
        cantidad: this.cantidadCatalogo,
        precioUnitario: this.opcionSeleccionada.precio,
        precioTotal: this.totalCatalogo,
        ahorro: ahorro,
        opcionSeleccionada: this.opcionSeleccionada
      };

      this.carrito.push(productoCarrito);
    }

    // Resetear
    this.productoDesplegado = null;
    this.opcionSeleccionada = null;
    this.cantidadCatalogo = 30;
    this.opcionCantidadCatalogo = '30';
    this.cantidadPersonalizadaCatalogo = 30;
    this.totalCatalogo = 0;
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.precioTotal, 0);
  }

  getTotalAhorrado(): number {
    return this.carrito.reduce((total, item) => total + item.ahorro, 0);
  }

  removerDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }
}