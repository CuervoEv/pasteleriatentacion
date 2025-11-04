import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products, Product1 } from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent {
  productos: Product1[] = [];

  constructor(private productsService: Products) {
    this.productos = this.productsService.getProducts();
    console.log('Productos cargados:', this.productos);
  }
}
