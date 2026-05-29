import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoomServiceService } from '../room-service.service';
import { NotificationService } from '@core/services/notification.service';
import { ROOM_SERVICE_TYPES } from '../room-service.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-room-service',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-room-service.html',
})
export class CreateRoomService {
  private roomServiceService = inject(RoomServiceService);
  private notify = inject(NotificationService);
  private router = inject(Router);

  loading = signal(false);
  serviceTypes = ROOM_SERVICE_TYPES;

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    type: new FormControl('FOODS_AND_BEVERAGE', Validators.required),
  });

  onSubmit(): void {
    if (this.createForm.valid) {
      this.loading.set(true);
      const data = this.createForm.value;

      this.roomServiceService.createRoomService(data).subscribe({
        next: () => {
          this.notify.success(
            'Servicio Creado',
            'El servicio de habitación se ha registrado exitosamente.'
          );
          this.loading.set(false);
          this.router.navigate(['/room-services']);
        },
        error: (err) => {
          this.notify.error('Error al registrar servicio', err?.error?.message || 'Error del servidor');
          this.loading.set(false);
          console.error(err, 'error creating room service');
        },
      });
    }
  }
}
