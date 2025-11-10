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

// Importar los componentes de categorías
import { Amasijos} from './page/serviciosprdcs/corporativo/categorias/amasijos/amasijos';
import { Bebidas } from './page/serviciosprdcs/corporativo/categorias/bebidas/bebidas';
import { Dulces } from './page/serviciosprdcs/corporativo/categorias/dulces/dulces';
import { Galletas} from './page/serviciosprdcs/corporativo/categorias/galletas/galletas';
import { Hojaldres } from './page/serviciosprdcs/corporativo/categorias/hojaldres/hojaldres';
import { Postres } from './page/serviciosprdcs/corporativo/categorias/postres/postres';

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

  // NUEVAS RUTAS PARA CATEGORÍAS DE CORPORATIVO
  { path: 'servicio/corporativo/amasijos', component: Amasijos },
  { path: 'servicio/corporativo/bebidas', component: Bebidas },
  { path: 'servicio/corporativo/dulces', component: Dulces },
  { path: 'servicio/corporativo/galletas', component: Galletas },
  { path: 'servicio/corporativo/hojaldres', component: Hojaldres },
  { path: 'servicio/corporativo/postres', component: Postres },

  { path: '**', redirectTo: '' }
];