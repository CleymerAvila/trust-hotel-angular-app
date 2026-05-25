import { Room } from './../room.model';
import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { RoomService } from '../room.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-edit-room',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-room.html',
})
export class EditRoom {
  roomToEdit : Room | null = null;
  // hotelService = inject(HotelService);
  roomService = inject(RoomService);
  notify = inject(NotificationService);
  route = inject(Router);
  activeRoute = inject(ActivatedRoute);
  roomId: number = 0;

  editForm = new FormGroup({
    number: new FormControl(this.roomToEdit?.number, Validators.required),
    type: new FormControl(this.roomToEdit?.type, Validators.required),
    currentState: new FormControl({value :this.roomToEdit?.currentState, disabled:true }, Validators.required),
    capacity: new FormControl(this.roomToEdit?.capacity, Validators.required),
    pricePerNight: new FormControl(this.roomToEdit?.pricePerNight, Validators.required),
  });

  constructor() {
  }

  ngOnInit(): void {
    this.roomId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (room) => {
        this.roomToEdit = room;
        console.log('Habitacion a editar:', room);
        this.editForm.setValue({
          number: room.number,
          type: room.type,
          currentState: room.currentState,
          capacity: room.capacity,
          pricePerNight: room.pricePerNight
        });
        this.notify.info('Habitación Cargada', 'La habitación fue cargada exitosamente');
      },
      error: (error) => {
        console.error('Error al obtener la habitacion:', error);
        this.route.navigate(['/rooms']);
      }
    });

  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const roomData = {
        ...this.editForm.value,
      };
      console.log('Datos de la habitacion a editar:', roomData);
      this.roomService.editRoom(this.roomId, roomData).subscribe({
        next: (room) => {
           console.log('Habitacion creada exitosamente:', room);
          this.editForm.reset();
          this.notify.success('Habitación Actualizada', 'La habitación fue registrada exitosamente');
          this.route.navigate(['/rooms']);
        },
        error: (error) => {
          console.error('Error al crear la habitacion:', error);
        }
      });
    }
  }
}

