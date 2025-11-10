import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product1 } from '../../../../../services/products';

// Extender la interfaz para incluir cantidad personalizada
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
}

@Component({
  selector: 'app-amasijos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './amasijos.html',
  styleUrls: ['./amasijos.css']
})
export class Amasijos implements OnInit {
  productos: ProductoConCantidad[] = [];
  carrito: ProductoCarrito[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    const productosBase = this.productsService.getProductsByCategory('amasijos');
    
    // Convertir Product1 a ProductoConCantidad
    this.productos = productosBase.map(producto => ({
      ...producto,
      cantidad: 1,
      opcionCantidad: '1',
      cantidadPersonalizada: 1
    }));
  }

  // Manejar cambio en opción de cantidad
  onOpcionCantidadChange(producto: ProductoConCantidad) {
    if (producto.opcionCantidad === 'personalizada') {
      // Mantener la cantidad actual o usar 1 como default
      producto.cantidad = producto.cantidadPersonalizada || 1;
    } else {
      producto.cantidad = parseInt(producto.opcionCantidad);
      producto.cantidadPersonalizada = producto.cantidad;
    }
  }

  // Manejar cambio en cantidad personalizada
  onCantidadPersonalizadaChange(producto: ProductoConCantidad) {
    if (producto.opcionCantidad === 'personalizada') {
      producto.cantidad = producto.cantidadPersonalizada || 1;
    }
  }

  // Calcular descuento según cantidad
  getDescuento(cantidad: number): number {
    if (cantidad >= 200) return 20;
    if (cantidad >= 100) return 15;
    if (cantidad >= 50) return 10;
    if (cantidad >= 30) return 5;
    return 0;
  }

  // Calcular precio total con descuento
  getPrecioTotal(producto: ProductoConCantidad): number {
    const descuento = this.getDescuento(producto.cantidad);
    const precioSinDescuento = producto.precio * producto.cantidad;
    const descuentoAplicado = precioSinDescuento * (descuento / 100);
    return Math.round(precioSinDescuento - descuentoAplicado);
  }

  // Agregar producto al carrito
  agregarAlCarrito(producto: ProductoConCantidad) {
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
    
    // Resetear después de agregar
    producto.cantidad = 1;
    producto.opcionCantidad = '1';
    producto.cantidadPersonalizada = 1;
  }

  // Calcular total del carrito
  getTotalCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.precioTotal, 0);
  }

  // Calcular total ahorrado
  getTotalAhorrado(): number {
    return this.carrito.reduce((total, item) => total + item.ahorro, 0);
  }
}