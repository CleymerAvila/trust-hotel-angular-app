import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
})
export class LoginForm {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notify = inject(NotificationService);

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  onLogin() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
        this.notify.info('Inición Sesión', 'Ha iniciado sesión satisfactoriamente');
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Credenciales inválidas';
        console.error('Error de login:', err);
      },
    });
  }
}
