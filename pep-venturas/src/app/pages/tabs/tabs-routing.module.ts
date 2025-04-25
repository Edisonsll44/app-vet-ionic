import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'citas',
        loadChildren: () =>
          import('../citas/citas.module').then((m) => m.CitasPageModule),
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('../productos/productos.module').then((m) => m.ProductosPageModule),
      },
      {
        path: 'contacto',
        loadChildren: () =>
          import('../contacto/contacto.module').then((m) => m.ContactoPageModule),
      },
      {
        path: '',
        redirectTo: 'citas',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
