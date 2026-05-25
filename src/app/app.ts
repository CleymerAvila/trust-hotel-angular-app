import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import localeEs  from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NotificationContainerComponent } from "@shared/components/notification-container/notification-container";


registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trust-hotel-frontend');
}
