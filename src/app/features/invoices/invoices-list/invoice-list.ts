import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoices-list',
  imports: [
    CurrencyPipe,
    RouterModule
  ],
  templateUrl: './invoice-list.html'
})
export class InvoicesList {

  private invoiceService = inject(InvoiceService);

  invoices = signal<Invoice[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices(){
    this.loading.set(true);
    this.error.set(null);

    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Error al cargar las facturas.");
        this.loading.set(false);
      }
    });
  }

  // cuando ya los DTOs del invoice desde el back-end envien el id de la factura entonces cambio por:
  //deleteInvoice(id: number) {
  //  if(confirm("¿Eliminar factura?")){
  //    this.invoiceService.deleteInvoiceBy(id).subscribe({
  //      next: () => this.loadInvoices(),
  //      error: () => alert("No se pudo eliminar la factura.")
  //    });
  //  }
  //}

  deleteInvoice(invoice: Invoice) {
  console.log('Factura seleccionada:', invoice);
}


  formatDate(arr: number[]){
    return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
      .toLocaleString('es-CO');
  }
}
