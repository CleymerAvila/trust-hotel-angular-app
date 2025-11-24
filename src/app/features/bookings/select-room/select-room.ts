import { DateRange } from './../services/booking-form.service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '@features/rooms/room.service';
import { BookingFormService } from '../services/booking-form.service';
import { Room } from '@features/rooms/room.model';

@Component({
  selector: 'app-select-room',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-room.html',
})
export class SelectRoom {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private roomService = inject(RoomService);
  private bookingFormService = inject(BookingFormService);


  availableRooms = signal<Room[]>([]);
  isLoading = signal(false);
  dateRange : DateRange | null = null;

  ngOnInit(): void {
    this.loadAvailableRooms();
  }

  private loadAvailableRooms(): void {
    this.dateRange = this.bookingFormService.getRangeDate();

    if(!this.dateRange){
      alert('Por favor selecciona las fechas en el formulario');
      this.closeModal();
      return;
    }

    this.isLoading.set(true);
    this.roomService.getAvailableRooms(
      this.dateRange.startDate,
      this.dateRange.endDate
    ).subscribe({
      next: (rooms) => {
        console.log('habitaciones desde el back', rooms)
        this.availableRooms.set(rooms);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.availableRooms = signal<Room[]>([]);
        this.isLoading.set(false);
        alert("Error al cargar las habitaciones disponibles")
      }
    })
  }

  getNumberOfNights(): number {
    if (!this.dateRange) return 0;

    const start = new Date(this.dateRange.startDate);
    const end = new Date(this.dateRange.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // 🔑 Calcular precio total
  calculateTotal(pricePerNight: number): number {
    return pricePerNight * this.getNumberOfNights();
  }

  selectRoom(room: Room): void {
    console.log('✅ Habitación seleccionada:', room);

    const selectedRoom = {
      id: room.roomId,
      number: room.number
    };

    this.bookingFormService.setSelectedRoom(selectedRoom);

    // Volver al formulario
    console.log('📍 Volviendo a make-booking');
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  changeDates(): void {
    console.log('📍 Volviendo a cambiar fechas');
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  closeModal(): void {
    console.log('📍 Cerrando modal');
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }


}
