// hojaldre.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product1, HojaldreOpcion } from '../../../../../services/products';

// Interfaces locales para el componente
interface ProductoConCantidad {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  cantidad: number;
  opcionCantidad: string;
  cantidadPersonalizada: number;
  hojaldreSeleccionadaId?: string;
  hojaldreSeleccionada?: HojaldreOpcion;
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
  hojaldreSeleccionada?: HojaldreOpcion;
}

@Component({
  selector: 'app-hojaldres',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hojaldres.html',
  styleUrls: ['./hojaldres.css']
})
export class HojaldresComponent implements OnInit {
  producto: ProductoConCantidad = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    cantidad: 30,
    opcionCantidad: '30',
    cantidadPersonalizada: 30,
    hojaldreSeleccionadaId: '',
    hojaldreSeleccionada: undefined
  };
  
  carrito: ProductoCarrito[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // Obtener el producto de hojaldre especial del servicio
    const productos = this.productsService.getProductsByCategory('hojaldre');
    const hojaldreEspecial = productos.find(p => p.nombre === 'Hojaldres Especiales');
    
    if (hojaldreEspecial) {
      this.producto = {
        id: hojaldreEspecial.id,
        nombre: hojaldreEspecial.nombre,
        descripcion: hojaldreEspecial.descripcion,
        imagen: hojaldreEspecial.imagen,
        cantidad: 30,
        opcionCantidad: '30',
        cantidadPersonalizada: 30,
        hojaldreSeleccionadaId: '',
        hojaldreSeleccionada: undefined
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

  onHojaldreSeleccionadaChange(producto: ProductoConCantidad) {
    const hojaldre = this.productsService.getHojaldreOpcionById(producto.hojaldreSeleccionadaId || '');
    producto.hojaldreSeleccionada = hojaldre || undefined;
  }

  getDescuento(cantidad: number): number {
    if (cantidad >= 200) return 20;
    if (cantidad >= 100) return 15;
    if (cantidad >= 50) return 10;
    if (cantidad >= 30) return 5;
    return 0;
  }

  // ========== MÉTODOS PARA HOJALDRE ==========

  getHojaldreOpciones(): HojaldreOpcion[] {
    return this.productsService.getHojaldreOpciones();
  }

  getHojaldreSeleccionada(producto: ProductoConCantidad): HojaldreOpcion | null {
    return producto.hojaldreSeleccionada || null;
  }

  getImagenHojaldre(producto: ProductoConCantidad): string {
    return producto.hojaldreSeleccionada ? producto.hojaldreSeleccionada.imagen : producto.imagen;
  }

  getPrecioTotal(producto: ProductoConCantidad): number {
    if (producto.hojaldreSeleccionada) {
      const descuento = this.getDescuento(producto.cantidad);
      const precioSinDescuento = producto.hojaldreSeleccionada.precio * producto.cantidad;
      const descuentoAplicado = precioSinDescuento * (descuento / 100);
      return Math.round(precioSinDescuento - descuentoAplicado);
    }
    return 0;
  }

  agregarAlCarrito(producto: ProductoConCantidad) {
    if (producto.hojaldreSeleccionada) {
      const precioTotal = this.getPrecioTotal(producto);
      const precioSinDescuento = producto.hojaldreSeleccionada.precio * producto.cantidad;
      const ahorro = precioSinDescuento - precioTotal;

      const productoCarrito: ProductoCarrito = {
        id: producto.id,
        nombre: `${producto.nombre} - ${producto.hojaldreSeleccionada.nombre}`,
        descripcion: producto.descripcion,
        imagen: producto.hojaldreSeleccionada.imagen,
        cantidad: producto.cantidad,
        precioUnitario: producto.hojaldreSeleccionada.precio,
        precioTotal: precioTotal,
        ahorro: ahorro,
        hojaldreSeleccionada: producto.hojaldreSeleccionada
      };

      this.carrito.push(productoCarrito);

      // Resetear solo el hojaldre seleccionado
      producto.hojaldreSeleccionadaId = '';
      producto.hojaldreSeleccionada = undefined;
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