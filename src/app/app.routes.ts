import { Routes } from '@angular/router';
import { ProductsComponent } from './page/products/products';
import { About } from './page/about/about';
import { Home } from './page/home/home';
import { Contact } from './page/contact/contact';

export const routes: Routes = [

    {path: '', component:Home},
    {path: 'nosotros', component:About},
    {path: 'productos', component:ProductsComponent},
    {path: 'contacto', component:Contact},
    {path: '**', redirectTo: ''}
];
