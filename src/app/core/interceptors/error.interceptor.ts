import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';
import { catchError, throwError } from 'rxjs';


const HTTP_ERROR_MESSAGES: Record<number, { title: string; message: string }> = {
  400: { title: 'Solicitud inválida', message: 'Los datos enviados no son correctos.' },
  401: { title: 'No autenticado', message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.' },
  403: { title: 'Acceso denegado', message: 'No tienes permisos para realizar esta acción.' },
  404: { title: 'No encontrado', message: 'El recurso solicitado no existe.' },
  408: { title: 'Tiempo de espera', message: 'La solicitud tardó demasiado. Intenta de nuevo.' },
  409: { title: 'Conflicto', message: 'Ya existe un registro con esos datos.' },
  422: { title: 'Error de validación', message: 'Revisa los campos e intenta nuevamente.' },
  429: { title: 'Demasiadas solicitudes', message: 'Espera unos segundos antes de intentarlo de nuevo.' },
  500: { title: 'Error del servidor', message: 'Ocurrió un error interno. Intenta más tarde.' },
  502: { title: 'Error de puerta de enlace', message: 'El servidor no está disponible en este momento.' },
  503: { title: 'Servicio no disponible', message: 'El servidor está en mantenimiento. Intenta más tarde.' },
};


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const preset = HTTP_ERROR_MESSAGES[error.status];

      const title = preset?.title ?? `Error ${error.status}`;
      const message =
        // error.error?.message ??
        // error.error?.detail ??
        preset?.message ??
        'Ocurrió un error inesperado.';

      notifications.error(title, message, {
        action: {
          label: 'Reintentar',
          handler: () => {
            // Emit an event, use a retry service, etc.
            console.warn('[Notification] Retry requested for:', req.url);
          },
        },
      });

      return throwError(() => error);
    })
  );
};
