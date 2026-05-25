export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // ms, 0 = persistent
  action?: NotificationAction;
  timestamp: Date;
}

export interface NotificationAction {
  label: string;
  handler: () => void;
}
 