import { Component } from '@angular/core';
import { LoginForm } from './login-form/login-form';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm, RouterOutlet],
  templateUrl: './login-page.html',
})
export class LoginPage {

}
