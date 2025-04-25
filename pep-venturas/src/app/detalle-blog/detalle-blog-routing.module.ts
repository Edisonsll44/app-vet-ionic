import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleBlogPage } from './detalle-blog.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleBlogPageRoutingModule {}
