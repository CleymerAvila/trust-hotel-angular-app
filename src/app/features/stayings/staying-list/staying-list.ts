import { Component, inject, signal } from '@angular/core';
import { StayingService } from '../staying.service';
import { Staying } from '../staying.model';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { InvoiceService } from '@features/invoices/invoice.service';
import { StatusBadgeDirective } from "@shared/directives/status-badge.directive";
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-staying-list',
  imports: [DatePipe, RouterLink, StatusBadgeDirective],
  templateUrl: './staying-list.html',
})
export class StayingList {
  isOpen = signal(false);
  private stayingService = inject(StayingService);
  private invoiceService = inject(InvoiceService);
  private notify = inject(NotificationService);
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

  redirectToInvoice(finalInvoiceId: number){
    if(finalInvoiceId){
      alert('Estadia con factura ID: ' + finalInvoiceId)
      this.router.navigate([`invoices/${finalInvoiceId}`])
    } else {
      alert('Esta estadia no cuenta con factura final')
    }
  }

  generateFinalInvoice(stayingId: number){
    if(confirm('Desea generar la factura final para la estadia?')){
      this.invoiceService.generateFinal(stayingId).subscribe({
        next: () => {
          this.notify.success('Factura Generada', 'La factura fue registrada exitosamente')
          this.loadStayings()
        },
        error : (error) => {
          this.notify.error('Error al Generar Factura', error?.error?.message);
          console.error(error, 'error trying to create invoice')
        }
      })
    }
  }

  checkOut(stayingId: number ): void {
    if(confirm('Estas seguro que deseas confirmar el checkOut')){
      this.stayingService.checkOut(stayingId).subscribe({
        next: () => {
          this.notify.success('Check Out Exitoso', 'El check out fue registrado exitosamente')
          this.loadStayings();
        },
        error: (error) => {
          this.notify.error('Error al realizar Check Out' , error?.error?.message)
          console.error(error);
        }
      })
    }
  }

  revertCheckOut(){
    if(confirm("Estas seguro que desea revertir el ultimo check out")){
      this.stayingService.revertCheckOut().subscribe({
        next:() => {
          alert('Check out revertido correctamente');
          this.loadStayings();
        },
        error: (error) => {
          this.notify.error('Error al revertir Check Out', error?.error?.message)
        }
      })
    }
  }

}
