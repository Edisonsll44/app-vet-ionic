import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.scss'],
  standalone:false
})
export class ProductoModalComponent implements OnInit
{
@Input() producto: any;

constructor(private modalController: ModalController) {}

ngOnInit(): void {
    console.log('Producto recibido en el modal:', this.producto);

}

close() {
  this.modalController.dismiss();
}

}
