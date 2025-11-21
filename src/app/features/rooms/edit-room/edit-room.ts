import { Room } from './../room.model';
import { Component, signal, input, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Hotel } from '@core/models/hotel.model';
import { HotelService } from '@core/services/hotel.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-edit-room',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-room.html',
})
export class EditRoom implements OnInit, OnDestroy {
  roomToEdit : Room | null = null;
  // private hotelSubscription?: any;
  // hotelService = inject(HotelService);
  roomService = inject(RoomService);
  route = inject(Router);
  activeRoute = inject(ActivatedRoute);
  roomId: number = 0;

  editForm = new FormGroup({
    number: new FormControl(this.roomToEdit?.number, Validators.required),
    type: new FormControl(this.roomToEdit?.type, Validators.required),
    currentState: new FormControl(this.roomToEdit?.currentState, Validators.required),
    capacity: new FormControl(this.roomToEdit?.capacity, Validators.required),
    pricePerNight: new FormControl(this.roomToEdit?.pricePerNight, Validators.required),
  });

  constructor() {
    // this.hotelService.getCurrentHotel().subscribe();
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
      }
    });

  }

  onSubmit(): void {
    // if (this.createForm.valid) {
    //   const roomData = {
    //     ...this.createForm.value,
    //     hotelId: this.currentHotel?.hotelId
    //   };
    //   console.log('Datos de la habitacion a crear:', roomData);
    //   // Aqui puedes agregar la logica para enviar los datos al servidor
    //   this.roomService.createRoom(roomData).subscribe({
    //     next: (room) => {
    //       // console.log('Habitacion creada exitosamente:', room);
    //       this.createForm.reset();
    //       alert('Habitacion creada exitosamente');
    //       this.route.navigate(['/rooms']);
    //     },
    //     error: (error) => {
    //       console.error('Error al crear la habitacion:', error);
    //     }
    //   });

    // };
  }

  ngOnDestroy(): void {
    // this.hotelSubscription?.unsubscribe();
  }
}

