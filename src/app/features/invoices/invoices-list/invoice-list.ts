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

    deleteInvoice(id: number) {
        if(confirm("¿Eliminar factura?")){
        this.invoiceService.deleteInvoiceBy(id).subscribe({
            next: () => this.loadInvoices(),
            error: () => alert("No se pudo eliminar la factura.")
        });
        }
    }

    formatDate(date: any): string {
    if (!date) return '';

    // Si viene como string "2025,11,23,2,28,21"
    if (typeof date === 'string') {
        const parts = date.split(',').map(n => parseInt(n.trim()));
        date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
    }

    // Si viene como array [2025, 11, 23, 2, 28, 21]
    if (Array.isArray(date)) {
        date = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
    }

    return date.toLocaleString();
    }

}
