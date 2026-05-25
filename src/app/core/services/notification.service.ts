import { Injectable, signal, computed } from '@angular/core';
import { Notification, NotificationType, NotificationAction } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly MAX_NOTIFICATIONS = 5;
  private readonly DEFAULT_DURATION = 5000;

  private _notifications = signal<Notification[]>([]);

  readonly notifications = computed(() => this._notifications());

  show(
    type: NotificationType,
    title: string,
    message: string,
    options?: { duration?: number; action?: NotificationAction }
  ): string {
    const id = crypto.randomUUID();
    const notification: Notification = {
      id,
      type,
      title,
      message,
      duration: options?.duration ?? this.DEFAULT_DURATION,
      action: options?.action,
      timestamp: new Date(),
    };

    this._notifications.update((list) => {
      const updated = [notification, ...list];
      return updated.slice(0, this.MAX_NOTIFICATIONS);
    });

    if (notification.duration && notification.duration > 0) {
      setTimeout(() => this.dismiss(id), notification.duration);
    }

    return id;
  }

  success(title: string, message: string, options?: { duration?: number; action?: NotificationAction }) {
    return this.show('success', title, message, options);
  }

  error(title: string, message: string, options?: { duration?: number; action?: NotificationAction }) {
    return this.show('error', title, message, { duration: 0, ...options });
  }

  warning(title: string, message: string, options?: { duration?: number; action?: NotificationAction }) {
    return this.show('warning', title, message, options);
  }

  info(title: string, message: string, options?: { duration?: number; action?: NotificationAction }) {
    return this.show('info', title, message, options);
  }

  dismiss(id: string): void {
    this._notifications.update((list) => list.filter((n) => n.id !== id));
  }

  dismissAll(): void {
    this._notifications.set([]);
  }
}
