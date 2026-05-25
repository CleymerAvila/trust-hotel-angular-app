import { NgClass } from '@angular/common';
import { Component, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { Notification, NotificationType } from '@core/models/notification.model';

const ICONS: Record<NotificationType, string> = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2l4 -4"/></svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v4"/><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.871l-8.106 -13.534a1.914 1.914 0 0 0 -3.274 0z"/><path d="M12 16h.01"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12.01" y2="8"/><polyline points="11 12 12 12 12 16 13 16"/></svg>`,
};

@Component({
  selector: 'app-notification-item',
  imports: [NgClass],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css',
})
export class NotificationItem implements OnInit, OnDestroy {
  notification = input.required<Notification>();
  dismissed = output<string>();

  protected visible = signal(false);
  private enterTimer?: ReturnType<typeof setTimeout>;

  protected get icon(): () => string {
    return () => ICONS[this.notification().type];
  }

  ngOnInit(): void {
    this.enterTimer = setTimeout(() => this.visible.set(true), 10);
  }

  ngOnDestroy(): void {
    clearTimeout(this.enterTimer);
  }

  onDismiss(): void {
    this.visible.set(false);
    setTimeout(() => this.dismissed.emit(this.notification().id), 280);
  }

  onAction(): void {
    this.notification().action?.handler();
    this.onDismiss();
  }
}
