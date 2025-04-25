import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cita } from '../interfaces/cita.model';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private jsonUrl = 'assets/mock/citas.json';  // Esto es solo para cargar las citas inicialmente
  private apiUrl = 'https://mi-servidor.com/api/citas'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las citas desde el backend
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.jsonUrl);  // Esto puede cambiar dependiendo de tu API
  }

  // Obtener una cita por ID desde el backend
  getCitaPorId(id: number): Observable<Cita | undefined> {
    return this.http.get<Cita[]>(this.jsonUrl).pipe(
      map((citas: Cita[]) => citas.find((cita) => cita.id === id))
    );
  }

  // Enviar una nueva cita al servidor para que sea almacenada
  agregarCita(cita: Cita): Observable<void> {
    return this.http.post<void>(this.apiUrl, cita);  // Enviar la cita al servidor
  }
}
