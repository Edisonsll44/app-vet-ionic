import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetearclave',
  templateUrl: './resetearclave.page.html',
  styleUrls: ['./resetearclave.page.scss'],
  standalone: false
})
export class ResetearclavePage implements OnInit {

  resetForm!: FormGroup;  // Aseguramos que el formulario es inicializado correctamente

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // Inicializamos el formulario
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Método para restablecer la contraseña
  resetPassword() {
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;
      console.log('Restablecer contraseña para:', email);
      // Aquí podrías hacer la llamada al servicio para restablecer la contraseña

      // Luego redirigir a la página de login
      this.router.navigate(['/auth/login']);
    }
  }

  // Método para volver al login
  backToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
