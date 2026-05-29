import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { RoomServiceService } from '../room-service.service';
import { RoomService, ROOM_SERVICE_TYPES } from '../room-service.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-room-services-list',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './room-services-list.html',
})
export class RoomServicesList {
  private roomServiceService = inject(RoomServiceService);
  private notify = inject(NotificationService);

  roomServices = signal<RoomService[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  serviceTypes = ROOM_SERVICE_TYPES;

  ngOnInit() {
    this.loadRoomServices();
  }

  loadRoomServices(): void {
    this.loading.set(true);
    this.error.set(null);

    this.roomServiceService.getRoomServices().subscribe({
      next: (services) => {
        this.roomServices.set(services);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los servicios de habitación.');
        this.loading.set(false);
        console.error(err, 'error loading room services');
      },
    });
  }

  deleteRoomService(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio de habitación?')) {
      this.roomServiceService.deleteRoomService(id).subscribe({
        next: () => {
          this.notify.warning(
            'Servicio Eliminado',
            'El servicio de habitación ha sido eliminado exitosamente'
          );
          this.loadRoomServices();
        },
        error: (err) => {
          this.notify.error('Error al eliminar servicio', err?.error?.message);
          console.error(err, 'error deleting room service');
        },
      });
    }
  }
}
