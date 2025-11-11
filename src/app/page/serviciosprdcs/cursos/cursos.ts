import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService, Product1 } from '../../../services/products';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class CursosComponent implements OnInit {
  cursos: Product1[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.cursos = this.productsService.getProductsByCategory('cursos');
  }
}