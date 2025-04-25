import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoModalComponent } from './producto-modal/producto-modal.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
})
export class ProductosPage implements OnInit {
  productos: any[] = [];
  searchTerm = '';

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.2,
    spaceBetween: 10
  };

  constructor(private productoService: ProductoService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: any[]) => {
      this.productos = data;
    });
  }

  get productosFiltrados() {
    if (!this.searchTerm.trim()) return this.productos;

    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async verMas(producto: any) {
    const modal = await this.modalController.create({
      component: ProductoModalComponent,
      componentProps: {
        producto: producto
      }
    });
    await modal.present();
  }
}
