import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingFormService, SelectedClient, SelectedRoom } from '../services/booking-form.service';
import { Subject, takeUntil } from 'rxjs';
import { BookingService } from '../services/booking.service';



@Component({
  selector: 'app-create-booking',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-booking.html',
})
export class CreateBooking implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private bookingFormServive = inject(BookingFormService);
  private bookingService = inject(BookingService);
  private route = inject(ActivatedRoute);

  bookingForm!: FormGroup;

  selectedClient: SelectedClient | null = null;
  selectedRoom:  SelectedRoom | null = null;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToSelections();
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      clientName: [{ value:  '', disabled: true }],
      roomNumber: [{ value: '', disabled: true }],
      startDate: [ '', Validators.required],
      endDate: ['' , Validators.required],
    })
  }

  private subscribeToSelections(): void {
    this.bookingFormServive.selectedClient$
        .pipe(takeUntil(this.destroy$))
        .subscribe((client) => {
          this.selectedClient = client;

          if(client){
            this.bookingForm.get('clientName')?.setValue(client.name);
            console.log('Cliente Actualizado en el formulario:', client.name);
          } else {
            this.bookingForm.get('clientName')?.setValue('');
          }
        });

    this.bookingFormServive.selectedRoom$
        .pipe(takeUntil(this.destroy$))
        .subscribe((room) => {
          this.selectedRoom = room;
          if(room){
            this.bookingForm.get('roomNumber')?.setValue(room.number);
            console.log('Habitación Actualizada en el formulario:', room.number);
          } else {
            this.bookingForm.get('roomNumber')?.setValue('');
          }
        });
  }

  areDatesValid(): boolean {
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;
    return !!(startDate && endDate && startDate < endDate)
  }

  onDateChange(): void {
    if(this.areDatesValid()){
      const startDate = this.bookingForm.get('startDate')?.value;
      const endDate = this.bookingForm.get('endDate')?.value;
      this.bookingFormServive.setDateRange(startDate, endDate);
      this.bookingFormServive.clearRoom();
    }
  }

  navigateToSelectClient(): void {
    this.router.navigate(['select-client'], { relativeTo: this.route});
  }

  navigateToSelectRoom(): void {
    this.router.navigate(['select-room'], { relativeTo: this.route});
  }

  navigateBackToBookings(): void {
    this.router.navigate(['bookings'])
  }
  isFormValid(): boolean {
    return (
      this.bookingForm.valid &&
      this.selectedClient !== null &&
      this.selectedRoom !== null
    )
  }

  submitBooking(): void {
    if(!this.isFormValid()){
      alert('Por favor complete todos los campos requeridos y seleccione un cliente y una habitación.');
      return;
    }

    const bookingData = {
      clientId: this.selectedClient!.id,
      roomId: this.selectedRoom!.id,
      startDate: this.bookingForm.get('startDate')?.value,
      endDate: this.bookingForm.get('endDate')?.value,
    };

    console.log('Datos de la reserva a enviar:', bookingData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor

    this.bookingService.createBooking(bookingData).subscribe({
      next: (booking) => {
        this.bookingForm.reset();
        alert('La reservacion ha sido creada con exito');
        this.bookingFormServive.clearClient();
        this.router.navigate(['bookings'])
      },
      error: (error) => {
        console.error('Error al crear la reserva:', error);
        alert('Error al crear la reserva. Por favor, intenta de nuevo.');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.bookingFormServive.clearClient();
    this.bookingFormServive.clearRoom()
  }
}
