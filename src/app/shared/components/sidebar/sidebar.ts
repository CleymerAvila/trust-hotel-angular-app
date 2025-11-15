import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarOptions } from './sidebar-options/sidebar-options';
import { User } from '../../../core/models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarHeader, SidebarOptions],
  templateUrl: './sidebar.html',
})
export class Sidebar implements OnInit, OnDestroy {

  currentUser: User | null = null;
  private  userSubscription?: Subscription;

  authService = inject(AuthService);

  ngOnInit(): void {
    // ✅ Suscribirse al Observable
    this.userSubscription = this.authService.currentUser.subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log('Usuario actual:', user);
      },
      error: (error) => {
        console.error('Error al obtener usuario:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
