import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styles: `
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
    }
    button {
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:disabled {
      background: #ccc;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
  `
})
export class LoginForm {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  onLogin() {
    this.loading = true;
    this.errorMessage = '';


    this.authService.login(this.email, this.password )
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/topics']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Credenciales inválidas';
          console.error('Error de login:', err);
        }
      });
  }
}
