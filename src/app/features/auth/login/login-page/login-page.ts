import { Component } from '@angular/core';
import { LoginForm } from './login-form/login-form';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@shared/components/footer/footer'
@Component({
  selector: 'app-login-page',
  imports: [LoginForm, Footer, RouterOutlet],
  templateUrl: './login-page.html',
})
export class LoginPage {}
