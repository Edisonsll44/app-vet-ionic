import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;
  registerForm: FormGroup;
  recoverPasswordForm: FormGroup;
  isRegistering = false; // Variable para saber si está en registro o login
  currentForm: 'login' | 'register' | 'recoverPassword' = 'login'; // Control de formulario visible

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    // Formulario de login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Formulario de registro
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.passwordMatchValidator
    });

    // Formulario de recuperación de contraseña
    this.recoverPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Método para verificar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { mismatch: true };
    }
    return { mismatch: true };
  }

  // Cambiar entre login, registro y recuperación de contraseña
  showLogin() {
    this.currentForm = 'login';
  }

  showRegister() {
    this.currentForm = 'register';
  }

  showRecoverPassword() {
    this.currentForm = 'recoverPassword';
  }

  async login() {
    const { email, password } = this.loginForm.value;

    if (this.authService.estaBloqueado(email)) {
      const toast = await this.toastController.create({
        message: 'Usuario bloqueado. Has excedido los 3 intentos permitidos.',
        duration: 2500,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    this.authService.login(email, password).subscribe(async success => {
      if (success) {
        this.navCtrl.navigateRoot('/tabs');
      } else {
        const intentosRestantes = this.authService.getIntentosRestantes(email);
        const toast = await this.toastController.create({
          message: `Credenciales incorrectas. Intentos restantes: ${intentosRestantes}`,
          duration: 2500,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  async register() {
    const { email, password } = this.registerForm.value;
    // Lógica de registro (deberías crear esta lógica en tu AuthService)
    this.authService.login(email, password).subscribe(async success => {
      if (success) {
        const toast = await this.toastController.create({
          message: 'Usuario registrado correctamente.',
          duration: 2000,
          color: 'success',
        });
        await toast.present();
        this.showLogin(); // Volver al login después de registrar
      } else {
        const toast = await this.toastController.create({
          message: 'Error al registrar. Intenta nuevamente.',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      }
    });
  }

  resetPassword() {
    this.navCtrl.navigateForward('/resetearclave/resetearclave');
  }

  recoverPassword() {
    const email = this.recoverPasswordForm.get('email')?.value;

    if (!email) {
      console.log('Correo electrónico es requerido');
      return;
    }

    // Aquí puedes hacer una llamada a tu servicio de recuperación de contraseña
    console.log('Enviando recuperación a:', email);

    // Opcional: Mostrar mensaje al usuario, limpiar el formulario, etc.
  }

}
