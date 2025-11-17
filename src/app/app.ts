import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import localeEs  from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trust-hotel-frontend');
}
