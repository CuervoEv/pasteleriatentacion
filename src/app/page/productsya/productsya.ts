import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products, Product1 } from '../../services/products';  // ruta correcta al servicio

@Component({
  selector: 'app-productsya',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productsya.html',
  styleUrls: ['./productsya.css']
})
export class Productsyacomponent implements OnInit {
  productos: Product1[] = [];

  constructor(private productsService: Products) { }

  ngOnInit(): void {
    this.productos = this.productsService.getProducts();
    console.log('Productos cargados:', this.productos);
  }
}

