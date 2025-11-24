import { Component, inject, signal } from '@angular/core';
import { BookingService } from '@features/bookings/services/booking.service';
import { StayingService } from '../staying.service';
import { Staying } from '../staying.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staying-list',
  imports: [DatePipe],
  templateUrl: './staying-list.html',
})
export class StayingList {
  isOpen = signal(false);
  private stayingService = inject(StayingService);
  stayings = signal<Staying[]>([]);
  router = inject(Router);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadStayings();
  }

  loadStayings(): void {
    this.loading.set(true);
    this.error.set(null);
    this.stayingService.getAllStayings().subscribe({
      next: (stayings) => {
        this.stayings.set(stayings);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las estadias')
        this.loading.set(false);
        console.log(err, 'error loading stayings')
      }
    })
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen)
  }

  redirecToInvoice(finalInvoiceId: number){
    if(finalInvoiceId){
      alert('Estadia con factura ID: ' + finalInvoiceId)
      this.router.navigate([`invoices/${finalInvoiceId}`])
    } else {
      alert('Esta estadia no cuenta con factura final')
    }
  }

  checkOut(stayingId: number){
    if(confirm('Desea generar la factura final para la estadia?')){
      this.stayingService.checkOut(stayingId).subscribe({
        next: (staying) => {
          alert('Factura generada exitosamente')
          this.loadStayings()
        },
        error : (error) => {
          alert('Error al generar la factura')
          console.error(error, 'error trying to create invoice')
        }
      })
    }
  }

  confirmCheckOut(stayingId: number ): void {
    if(confirm('Estas seguro que deseas confirmar el checkOut')){
      this.stayingService.confirmCheckOut(stayingId).subscribe({
        next: () => {
          alert('Se realizo el check out satisfactoriamente');
          this.loadStayings();
        },
      })
    }
  }

  revertCheckOut(stayingId: number){
    if(confirm("Estas seguro que desea revertir el ultimo check out")){
      this.stayingService.revertCheckOut().subscribe({
        next:() => {
          alert('Check out revertido correctamente');
          this.loadStayings();
        },
        
      })
    }
  }

}
