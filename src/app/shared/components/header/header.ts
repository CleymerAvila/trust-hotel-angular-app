import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [DatePipe],
  templateUrl: './header.html',
})
export class Header {
  authService = inject(AuthService);
  currentDate: Date = new Date();
}
