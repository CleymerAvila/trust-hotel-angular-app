import { Component, inject, input, } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'sidebar-header',
  imports: [],
  templateUrl: './sidebar-header.html',
})
export class SidebarHeader {
  envs = environment;
  authService = inject(AuthService);

  username = input.required<string>();
}
