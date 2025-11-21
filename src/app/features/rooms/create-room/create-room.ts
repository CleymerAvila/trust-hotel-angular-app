import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Hotel } from '@core/models/hotel.model';
import { HotelService } from '@core/services/hotel.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-create-room',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-room.html',
})
export class CreateRoom implements OnInit, OnDestroy {
  currentHotel : Hotel | null = null;
  private hotelSubscription?: any;
  hotelService = inject(HotelService);
  roomService = inject(RoomService);
  route = inject(Router)
  desactived = signal(false);

  createForm = new FormGroup({
    number: new FormControl('', Validators.required),
    type: new FormControl('PERSONAL', Validators.required),
    currentState: new FormControl({ value: 'LIBRE', disabled: true }, Validators.required),
    floor: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    pricePerNight: new FormControl('', Validators.required),
  });

  constructor() {
    this.hotelService.getCurrentHotel().subscribe();
  }

  ngOnInit(): void {
    // ✅ Suscribirse al Observable del hotel actual
    this.hotelSubscription = this.hotelService.currentHotel$.subscribe({
      next: (hotel) => {
        this.currentHotel = hotel;
        console.log('Hotel actual:', hotel);
      },
      error: (error) => {
        console.error('Error al obtener hotel:', error);
      }
    })
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const roomData = {
        ...this.createForm.value,
        hotelId: this.currentHotel?.hotelId
      };
      console.log('Datos de la habitacion a crear:', roomData);
      // Aqui puedes agregar la logica para enviar los datos al servidor
      this.roomService.createRoom(roomData).subscribe({
        next: (room) => {
          // console.log('Habitacion creada exitosamente:', room);
          this.createForm.reset();
          alert('Habitacion creada exitosamente');
          this.route.navigate(['/rooms']);
        },
        error: (error) => {
          // console.error('Error al crear la habitacion:', error);
          alert('Error al crear la habitacion');
        }
      });

    };
  }

  ngOnDestroy(): void {
    this.hotelSubscription?.unsubscribe();
  }
}

