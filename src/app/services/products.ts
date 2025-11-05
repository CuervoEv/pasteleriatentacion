import { Injectable } from '@angular/core';

export interface Product1 {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class Products {
  private productos: Product1[] = [
    { id: 1, nombre: 'Tiramisu', precio: 30000, descripcion: 'Postre italiano', imagen: 'https://via.placeholder.com/150' },
    { id: 2, nombre: 'Brownie', precio: 25000, descripcion: 'Brownie de chocolate', imagen: 'https://via.placeholder.com/150' },
    { id: 3, nombre: 'Cheesecake', precio: 28000, descripcion: 'Cheesecake de fresa', imagen: 'https://via.placeholder.com/150' }
  ];

  getProducts(): Product1[] {
    return this.productos;
  }
}
