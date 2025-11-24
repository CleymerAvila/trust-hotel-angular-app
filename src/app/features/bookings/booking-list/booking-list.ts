import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../booking.model';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './booking-list.html',
})
export class BookingList {
  isOpen = signal(false);
  private bookingService = inject(BookingService);
  bookings = signal<Booking[]>([]);
  router = inject(Router);

  loading = signal(true);
  error = signal<string | null>(null);
  ngOnInit() {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading.set(true);
    this.error.set(null);
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings.set(bookings);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las reservas.');
        this.loading.set(false);
        console.log(err, 'error loading bookings');
      }
    })
  }

  toggleDropdown(){
    this.isOpen.set(!this.isOpen())
  }

  deleteBooking(bookingId: number): void {
    if(confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.bookingService.deleteBookingBy(bookingId).subscribe({
        next: () => {
          alert('Reserva eliminada exitosamente.');
          this.loadBookings();
        },
        error: (err) => {
          alert('Error al eliminar la reserva.');
          console.log(err, 'error deleting booking');
        }
      });
    }
  }

  redirecToInvoice(initialInvoiceId: number){
    if(initialInvoiceId){
      alert('Reserva con factura ID: ' + initialInvoiceId)
      this.router.navigate([`invoices/${initialInvoiceId}`])
    } else {
      alert('Esta reserva no cuenta con factura inicial')
    }
  }

  checkIn(bookingId: number){
    if(confirm('Desea generar la factura para la estadia?')){
      this.bookingService.checkIn(bookingId).subscribe({
        next: (booking) => {
          alert('Factura generada exitosamente')
          this.loadBookings()
        },
        error : (error) => {
          alert('Error al generar la factura')
          console.error(error, 'error trying to create invoice')
        }
      })
    }
  }

  confirmCheckIn(bookingId: number): void {
    if(confirm('Estas seguro que deseas confirmar el checkIn')){
      this.bookingService.confirmCheckIn(bookingId).subscribe({
        next: (booking) => {
          alert("Check In realizado satisfactoriamente")
          this.loadBookings();
        },
        error: (error) => {
          alert('Error al realizar check in de la reserva')
          console.error(error, 'error trying to make check in')
        }
      })
    }
  }

  cancelBooking(bookingId: number): void {
    if(confirm('Estas seguro que desea cancelar la reservacion? la accion es irreversible')){
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: (booking) => {
          alert('Reserva cancelada exitosamente');
          this.loadBookings()
        },
        error: (error) => {
          alert('Error al eliminar la reserva')
          console.log(error, 'error canceling booking')
        }
      })
    }
  }
}
