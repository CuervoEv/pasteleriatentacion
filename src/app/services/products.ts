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
export class Products{ 
  private productos: Product1[] = [
    {
      id: 1,
      nombre: 'Tiramisu Clasico 4 personas',
      precio: 30000,
      descripcion: 'Postre italiano hecho con capas de bizcocho empapado en café y crema de mascarpone. ideal para una pasar un buen rato con amigos o familia.',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 200,
      descripcion: 'Descripción del Producto 2',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 3,  
      nombre: 'Producto 3',
      precio: 300,
      descripcion: 'Descripción del Producto 3',
      imagen: 'https://via.placeholder.com/150'
    }

  ];
  constructor() { }

  getProducts(): Product1[] {
    return this.productos;
  }
} 