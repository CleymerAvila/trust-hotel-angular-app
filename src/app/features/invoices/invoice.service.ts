import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './invoice.model';
import { Observable } from 'rxjs';
import { InvoiceDetails } from './invoice-details/invoice-details.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/api/v1/invoices';

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.baseUrl);
    }

    getInvoiceDetails(id: number) {
        return this.http.get<InvoiceDetails>(`${this.baseUrl}/${id}/details`);
    }



    deleteInvoiceBy(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
