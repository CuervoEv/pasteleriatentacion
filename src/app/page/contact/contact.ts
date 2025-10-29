import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario enviado', form.value);
    }
  }
}
