import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ← Agregar esto

@Component({
  standalone: true,
  selector: 'app-corporativo',
  imports: [CommonModule, RouterModule], // ← Agregar RouterModule aquí
  templateUrl: './corporativo.html',
  styleUrl: './corporativo.css'
})
export class Corporativo {
}