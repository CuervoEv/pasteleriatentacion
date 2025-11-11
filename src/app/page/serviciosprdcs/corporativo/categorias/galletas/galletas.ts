
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product1, GalletaOpcion } from '../../../../../services/products'; // Ajusta la ruta

// Interfaces locales para el componente
interface ProductoConCantidad {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  cantidad: number;
  opcionCantidad: string;
  cantidadPersonalizada: number;
  galletasSeleccionadaId?: string;
  galletasSeleccionada?: GalletaOpcion;
}

interface ProductoCarrito {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  ahorro: number;
  galletasSeleccionada?: GalletaOpcion;
}

@Component({
  selector: 'app-galletas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './galletas.html',
  styleUrls: ['./galletas.css']
})
export class Galletas implements OnInit {
  producto: ProductoConCantidad = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    cantidad: 30,
    opcionCantidad: '30',
    cantidadPersonalizada: 30,
    galletasSeleccionadaId: '',
    galletasSeleccionada: undefined
  };
  
  carrito: ProductoCarrito[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // Obtener el producto de galletas especiales del servicio
    const productos = this.productsService.getProductsByCategory('galletas');
    const galletaEspecial = productos.find(p => p.nombre === 'Galletas Especiales');
    
    if (galletaEspecial) {
      this.producto = {
        id: galletaEspecial.id,
        nombre: galletaEspecial.nombre,
        descripcion: galletaEspecial.descripcion,
        imagen: galletaEspecial.imagen,
        cantidad: 30,
        opcionCantidad: '30',
        cantidadPersonalizada: 30,
        galletasSeleccionadaId: '',
        galletasSeleccionada: undefined
      };
    }
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

  onGalletaSeleccionadaChange(producto: ProductoConCantidad) {
    const galleta = this.productsService.getGalletaOpcionById(producto.galletasSeleccionadaId || '');
    producto.galletasSeleccionada = galleta || undefined;
  }

  getDescuento(cantidad: number): number {
    if (cantidad >= 200) return 20;
    if (cantidad >= 100) return 15;
    if (cantidad >= 50) return 10;
    if (cantidad >= 30) return 5;
    return 0;
  }

  // ========== MÉTODOS PARA GALLLETAS ==========

  getGalletasOpciones(): GalletaOpcion[] {
    return this.productsService.getGalletasOpciones();
  }

  getGalletaSeleccionada(producto: ProductoConCantidad): GalletaOpcion | null {
    return producto.galletasSeleccionada || null;
  }

  getImagenGalleta(producto: ProductoConCantidad): string {
    // Si hay una galleta seleccionada, mostrar su imagen, sino la imagen genérica
    return producto.galletasSeleccionada ? producto.galletasSeleccionada.imagen : producto.imagen;
  }

  getPrecioTotal(producto: ProductoConCantidad): number {
    if (producto.galletasSeleccionada) {
      const descuento = this.getDescuento(producto.cantidad);
      const precioSinDescuento = producto.galletasSeleccionada.precio * producto.cantidad;
      const descuentoAplicado = precioSinDescuento * (descuento / 100);
      return Math.round(precioSinDescuento - descuentoAplicado);
    }
    return 0;
  }

  agregarAlCarrito(producto: ProductoConCantidad) {
    if (producto.galletasSeleccionada) {
      const precioTotal = this.getPrecioTotal(producto);
      const precioSinDescuento = producto.galletasSeleccionada.precio * producto.cantidad;
      const ahorro = precioSinDescuento - precioTotal;

      const productoCarrito: ProductoCarrito = {
        id: producto.id,
        nombre: `${producto.nombre} - ${producto.galletasSeleccionada.nombre}`,
        descripcion: producto.descripcion,
        imagen: producto.galletasSeleccionada.imagen,
        cantidad: producto.cantidad,
        precioUnitario: producto.galletasSeleccionada.precio,
        precioTotal: precioTotal,
        ahorro: ahorro,
        galletasSeleccionada: producto.galletasSeleccionada
      };

      this.carrito.push(productoCarrito);

      // Resetear solo la galleta seleccionada
      producto.galletasSeleccionadaId = '';
      producto.galletasSeleccionada = undefined;
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