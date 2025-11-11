import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product1 } from '../../../services/products';

interface CursoCarrito {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class CursosComponent implements OnInit {
  cursos: Product1[] = [];
  carrito: CursoCarrito[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.cursos = this.productsService.getProductsByCategory('cursos');
  }

  agregarAlCarrito(curso: Product1) {
    const cursoCarrito: CursoCarrito = {
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      precio: curso.precio
    };
    this.carrito.push(cursoCarrito);
  }

  removerDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }
}