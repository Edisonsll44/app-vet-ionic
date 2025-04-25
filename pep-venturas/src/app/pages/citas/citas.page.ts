import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Cita } from 'src/app/interfaces/cita.model';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone:false
})
export class CitasPage implements OnInit {

  citas: any[] = [];

  constructor(private citasService: CitasService,
              private navController: NavController,
              private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.citasService.getCitas().subscribe(data => {
      const ahora = new Date();

      this.citas = data
        .filter(cita => cita.estado === 'pendiente')
        .map(cita => {
          const fechaCita = new Date(cita.fechaHora);
          const horasRestantes = (fechaCita.getTime() - ahora.getTime()) / (1000 * 60 * 60);

          let color = 'success'; // Verde por defecto

          if (horasRestantes <= 24) {
            color = 'danger'; // Rojo
          } else if (horasRestantes <= 48) {
            color = 'warning'; // Amarillo
          }

          return {
            ...cita,
            color,
            fechaFormateada: fechaCita.toLocaleDateString(),
            horaFormateada: fechaCita.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        });
    });
  }

  nuevaCita() {
    this.navController.navigateBack("/nueva-cita"); // sin ID → nueva
  }

  editarCita(cita: any) {
    this.navController.navigateBack("/cita");
  }

  mostrarOpciones(fechaHora: string): boolean {
    const ahora = new Date().getTime();
    const fechaCita = new Date(fechaHora).getTime();
    const horasRestantes = (fechaCita - ahora) / (1000 * 60 * 60);
    return horasRestantes > 24;
  }


  async cancelarCita(cita: any) {
    const alerta = await this.alertCtrl.create({
      header: '¿Cancelar cita?',
      message: `¿Seguro que deseas cancelar la cita de ${cita.mascota.nombre}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí, cancelar',
          handler: () => {
            // this.citasService.cancelarCita(cita.id).subscribe(() => {
            //   this.ngOnInit(); // recargar citas
            // });
          }
        }
      ]
    });

    await alerta.present();


  }
}
