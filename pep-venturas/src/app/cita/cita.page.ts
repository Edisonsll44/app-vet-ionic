import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; // Importamos moment
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '../services/citas.service';
import { Cita } from '../interfaces/cita.model';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.page.html',
  styleUrls: ['./cita.page.scss'],
  standalone: false
})
export class CitaPage implements OnInit {

  cita: Cita | undefined;
  color: 'success' | 'warning' | 'danger' = 'success';
  mostrarAcciones: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private citaService: CitasService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.citaService.getCitaPorId(id).subscribe((cita) => {
      if (cita) {
        this.cita = cita;
        this.evaluarColor(cita.fechaHora);
      }
    });
  }

  evaluarColor(fechaHoraStr: string) {
    const ahora = moment(); // Obtenemos la fecha y hora actual con moment
    const fechaCita = moment(fechaHoraStr); // Usamos moment para parsear la fecha de la cita
    const horas = fechaCita.diff(ahora, 'hours'); // Calculamos la diferencia en horas

    if (horas <= 24) {
      this.color = 'danger';
      this.mostrarAcciones = false;
    } else if (horas <= 48) {
      this.color = 'warning';
      this.mostrarAcciones = true;
    } else {
      this.color = 'success';
      this.mostrarAcciones = true;
    }
  }

  editarCita() {
    console.log('Editar cita:', this.cita?.id);
    // Aquí puedes redirigir a la página de edición
  }

  cancelarCita() {
    console.log('Cancelar cita:', this.cita?.id);
    // Aquí puedes implementar lógica de cancelación
  }
}