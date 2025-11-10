import { Routes } from '@angular/router';
import { ProductsComponent } from './page/products/products';
import { About } from './page/about/about';
import { Home } from './page/home/home';
import { Contact } from './page/contact/contact';

import { Personalizados} from './page/serviciosprdcs/personalizados/personalizados';
import { Corporativo } from './page/serviciosprdcs/corporativo/corporativo';
import { Cursos } from './page/serviciosprdcs/cursos/cursos';
import { Prorespost } from './page/serviciosprdcs/prorespost/prorespost';
import { Kitemp } from './page/serviciosprdcs/kitemp/kitemp';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'nosotros', component: About },
  { path: 'productos', component: ProductsComponent },
  { path: 'contacto', component: Contact },

  { path: 'servicio/personalizados', component: Personalizados},
  { path: 'servicio/corporativo', component: Corporativo },
  { path: 'servicio/cursos', component: Cursos},
  { path: 'servicio/prorespost', component:Prorespost },
  { path: 'servicio/kitemp', component:Kitemp},

  { path: '**', redirectTo: '' }
];
