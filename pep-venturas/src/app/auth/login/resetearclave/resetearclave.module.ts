import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetearclavePageRoutingModule } from './resetearclave-routing.module';

import { ResetearclavePage } from './resetearclave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResetearclavePageRoutingModule
  ],
  declarations: [ResetearclavePage]
})
export class ResetearclavePageModule {}
