import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CitasService } from '../services/citas.service';
import { TipoMascota } from '../interfaces/tipomascota.model';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.page.html',
  styleUrls: ['./nueva-cita.page.scss'],
  standalone: false
})
export class NuevaCitaPage implements OnInit {

  clienteNombre: string = '';
  clienteTelefono: string = '';
  clienteEmail: string = '';
  mascotaNombre: string = '';
  mascotaTipo: string = '';
  mascotaEdad: string = '';
  descripcion: string = '';
  fechaHora: string = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm'); // Hora por defecto dentro de 1 día
  tiposMascota: string[] = [];

  constructor(
    private citaService: CitasService,
    private navController: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.tiposMascota = this.obtenerTiposMascota();
  }

  obtenerTiposMascota(): string[] {
    const tipos: TipoMascota[] = [
      { nombre: 'Felino' },
      { nombre: 'Perruno' },
      { nombre: 'Ave' },
      { nombre: 'Reptil' },
      { nombre: 'Roedor' },
      { nombre: 'Pez' },
      { nombre: 'Otro' }
    ];
    return tipos.map(t => t.nombre);
  }

  async crearCita() {
    if (this.validarFormulario()) {
      const nuevaCita = {
        cliente: {
          nombre: this.clienteNombre,
          telefono: this.clienteTelefono,
          email: this.clienteEmail
        },
        mascota: {
          nombre: this.mascotaNombre,
          tipo: this.mascotaTipo,
          edad: this.mascotaEdad
        },
        descripcion: this.descripcion,
        fechaHora: this.fechaHora,
        estado: 'pendiente'
      };

      const loading = await this.loadingController.create({
        message: 'Guardando cita...',
        spinner: 'circles',
      });

      await loading.present();

      try {
        await this.citaService.agregarCita(nuevaCita).toPromise();
        await loading.dismiss();

        await this.presentToast('Cita creada exitosamente', 'success');
        this.limpiarFormulario();
        this.navController.navigateForward(['/citas']);

      } catch (error) {
        await loading.dismiss();
        await this.presentToast('Error al crear la cita', 'danger');
        console.error('Error al crear la cita', error);
      }
    }
  }

  async presentToast(mensaje: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  validarFormulario(): boolean {
    return !!(
      this.clienteNombre?.trim() &&
      this.clienteTelefono?.trim() &&
      this.clienteEmail?.trim() &&
      this.mascotaNombre?.trim() &&
      this.mascotaTipo &&
      this.mascotaEdad &&
      this.descripcion?.trim() &&
      this.fechaHora
    );
  }

  cancelar() {
    this.navController.back(); // Navega hacia atrás
  }

  limpiarFormulario() {
    this.clienteNombre = '';
    this.clienteTelefono = '';
    this.clienteEmail = '';
    this.mascotaNombre = '';
    this.mascotaTipo = '';
    this.mascotaEdad = '';
    this.descripcion = '';
    this.fechaHora = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm');
  }

}
