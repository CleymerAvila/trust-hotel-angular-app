import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styles: `
    p {
      color: blue;
    }

    button {
      padding: 10px;
      background-color: red;
      cursor: pointer;
    }
  `,
})
export class Header {
  authService = inject(AuthService);
}
