import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any = null;
  private intentosFallidos: { [email: string]: number } = {};
  private bloqueados: { [email: string]: boolean } = {};
  private readonly MAX_INTENTOS = 3;

  constructor(private http: HttpClient) {}

  // Función para el login
  login(email: string, password: string): Observable<boolean> {

    if (this.bloqueados[email]) {
      console.warn(`Usuario bloqueado: ${email}`);
      return of(false); // Retorna un Observable con `false` si está bloqueado
    }

    // Envía las credenciales al servidor
    return this.http.post<{ message: string }>('http://localhost:3000/login', { email, password }).pipe(
      map(response => {
        // Si el servidor responde con éxito, guarda los datos del usuario
        this.userData = { email };
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.resetearIntentos(email); // Reinicia los intentos fallidos al iniciar sesión correctamente
        return true;
      }),
      catchError(error => {
        // Si el login falla, incrementa los intentos
        console.error('Error durante el login:', error);
        this.incrementarIntento(email);
        return of(false); // Retorna un Observable con `false` si falla
      })
    );
  }

  // Función para hacer logout
  logout() {
    this.userData = null;
    localStorage.removeItem('user');
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Obtiene el usuario actual
  getCurrentUser() {
    return this.userData || JSON.parse(localStorage.getItem('user')!);
  }

  // Incrementa el contador de intentos fallidos
  private incrementarIntento(email: string) {
    const intentos = this.intentosFallidos[email] || 0;
    this.intentosFallidos[email] = intentos + 1;

    // Si se alcanzan los intentos máximos, bloquea al usuario
    if (this.intentosFallidos[email] >= this.MAX_INTENTOS) {
      this.bloqueados[email] = true;
    }
  }

  // Reinicia los intentos y desbloquea al usuario
  private resetearIntentos(email: string) {
    this.intentosFallidos[email] = 0;
    this.bloqueados[email] = false;
  }

  // Obtiene la cantidad de intentos restantes
  getIntentosRestantes(email: string): number {
    return this.MAX_INTENTOS - (this.intentosFallidos[email] || 0);
  }

  // Verifica si el usuario está bloqueado
  estaBloqueado(email: string): boolean {
    return this.bloqueados[email] || false;
  }

  // Función para desbloquear al usuario
  desbloquear(email: string): boolean {
    if (this.bloqueados[email]) {
      this.bloqueados[email] = false;
      this.intentosFallidos[email] = 0; // Reinicia los intentos fallidos
      return true;
    }
    return false;
  }

}
