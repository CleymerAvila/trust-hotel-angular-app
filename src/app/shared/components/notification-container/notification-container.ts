import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NotificationItem } from '../notification-item/notification-item';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [NotificationItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="notification-container" aria-label="Notificaciones" role="region">
      @for (notification of notificationService.notifications(); track notification.id) {
        <app-notification-item
          [notification]="notification"
          (dismissed)="notificationService.dismiss($event)"
        />
      }
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;

      > * {
        pointer-events: auto;
      }
    }

    @media (max-width: 480px) {
      .notification-container {
        top: 12px;
        right: 12px;
        left: 12px;
        align-items: stretch;
      }
    }
  `],
})
export class NotificationContainerComponent {
  protected notificationService = inject(NotificationService);
}
