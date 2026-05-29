import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomServiceService } from '../room-service.service';
import { NotificationService } from '@core/services/notification.service';
import { ROOM_SERVICE_TYPES } from '../room-service.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-room-service',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-room-service.html',
})
export class EditRoomService {
  private roomServiceService = inject(RoomServiceService);
  private notify = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  fetching = signal(true);
  serviceId = signal<number | null>(null);
  serviceTypes = ROOM_SERVICE_TYPES;

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    type: new FormControl('FOODS_AND_BEVERAGE', Validators.required),
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.serviceId.set(id);
      this.loadService(id);
    } else {
      this.notify.error('Error', 'ID de servicio no válido.');
      this.router.navigate(['/room-services']);
    }
  }

  loadService(id: number): void {
    this.fetching.set(true);
    this.roomServiceService.getRoomServiceById(id).subscribe({
      next: (service) => {
        this.editForm.patchValue({
          name: service.name,
          description: service.description,
          price: service.price,
          type: service.type,
        });
        this.fetching.set(false);
      },
      error: (err) => {
        this.notify.error('Error', 'No se pudo cargar el servicio de habitación.');
        this.fetching.set(false);
        this.router.navigate(['/room-services']);
        console.error(err, 'error fetching room service');
      },
    });
  }

  onSubmit(): void {
    const id = this.serviceId();
    if (this.editForm.valid && id !== null) {
      this.loading.set(true);
      const data = this.editForm.value;

      this.roomServiceService.updateRoomService(id, data).subscribe({
        next: () => {
          this.notify.success(
            'Servicio Actualizado',
            'El servicio de habitación se ha modificado exitosamente.'
          );
          this.loading.set(false);
          this.router.navigate(['/room-services']);
        },
        error: (err) => {
          this.notify.error('Error al actualizar servicio', err?.error?.message || 'Error del servidor');
          this.loading.set(false);
          console.error(err, 'error updating room service');
        },
      });
    }
  }
}
