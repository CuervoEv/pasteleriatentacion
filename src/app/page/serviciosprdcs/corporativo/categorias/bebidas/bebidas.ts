import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product1, OpcionCatalogo } from '../../../../../services/products';

// Interfaces extendidas
interface ProductoConCantidad extends Product1 {
  cantidad: number;
  opcionCantidad: string;
  cantidadPersonalizada: number;
  opcionSeleccionadaId?: string;
  opcionSeleccionada?: OpcionCatalogo;
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

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    const productosBase = this.productsService.getProductsByCategory('bebidas');
    this.productos = productosBase.map(producto => ({
      ...producto,
      cantidad: 30,
      opcionCantidad: '30',
      cantidadPersonalizada: 30,
      opcionSeleccionadaId: '',
      opcionSeleccionada: undefined
    }));
  }

  // ========== MÉTODOS COMUNES ==========

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

  onOpcionSeleccionadaChange(producto: ProductoConCantidad) {
    const opciones = this.getCatalogoOpciones(producto.catalogoId!);
    producto.opcionSeleccionada = opciones.find(op => op.id === producto.opcionSeleccionadaId);
  }

  getDescuento(cantidad: number): number {
    if (cantidad >= 200) return 20;
    if (cantidad >= 100) return 15;
    if (cantidad >= 50) return 10;
    if (cantidad >= 30) return 5;
    return 0;
  }

  // ========== MÉTODOS PARA PRODUCTOS NORMALES ==========

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

  // ========== MÉTODOS PARA CATÁLOGOS ==========

  getCatalogoOpciones(catalogoId: string): OpcionCatalogo[] {
    const catalogo = this.productsService.getCatalogoById(catalogoId);
    return catalogo?.opciones || [];
  }

  getOpcionSeleccionada(producto: ProductoConCantidad): OpcionCatalogo | null {
    return producto.opcionSeleccionada || null;
  }

  getPrecioTotalCatalogo(producto: ProductoConCantidad): number {
    if (producto.opcionSeleccionada) {
      const descuento = this.getDescuento(producto.cantidad);
      const precioSinDescuento = producto.opcionSeleccionada.precio * producto.cantidad;
      const descuentoAplicado = precioSinDescuento * (descuento / 100);
      return Math.round(precioSinDescuento - descuentoAplicado);
    }
    return 0;
  }

  agregarCatalogoAlCarrito(producto: ProductoConCantidad) {
    if (producto.opcionSeleccionada) {
      const precioTotal = this.getPrecioTotalCatalogo(producto);
      const precioSinDescuento = producto.opcionSeleccionada.precio * producto.cantidad;
      const ahorro = precioSinDescuento - precioTotal;

      const productoCarrito: ProductoCarrito = {
        ...producto,
        nombre: `${producto.nombre} - ${producto.opcionSeleccionada.nombre}`,
        precio: producto.opcionSeleccionada.precio,
        descripcion: producto.opcionSeleccionada.descripcion,
        imagen: producto.opcionSeleccionada.imagen,
        cantidad: producto.cantidad,
        precioUnitario: producto.opcionSeleccionada.precio,
        precioTotal: precioTotal,
        ahorro: ahorro,
        opcionSeleccionada: producto.opcionSeleccionada
      };

      this.carrito.push(productoCarrito);

      // Resetear solo la opción seleccionada
      producto.opcionSeleccionadaId = '';
      producto.opcionSeleccionada = undefined;
    }
  }

  // ========== MÉTODOS DEL CARRITO ==========

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