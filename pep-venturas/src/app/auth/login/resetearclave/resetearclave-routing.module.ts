import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetearclavePage } from './resetearclave.page';

const routes: Routes = [
  {
    path: '',
    component: ResetearclavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetearclavePageRoutingModule {}
