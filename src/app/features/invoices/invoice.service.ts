import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './invoice.model';
import { Observable } from 'rxjs';
import { InvoiceDetails } from './invoice-details/invoice-details.model';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

  private endpoint = '/invoices'

  private apiService = inject(ApiService);

    getInvoices(): Observable<Invoice[]> {
        return this.apiService.get<Invoice[]>(this.endpoint);
    }

    getInvoiceDetails(id: number) {
        return this.apiService.get<InvoiceDetails>(`${this.endpoint}/${id}/details`);
    }

    generateInitial(bookingId: number): Observable<Invoice> {
      return this.apiService.post<Invoice>(`${this.endpoint}/new-initial`, {bookingId} )
    }

    generateFinal(stayingId: number): Observable<Invoice> {
      return this.apiService.post<Invoice>(`${this.endpoint}/new-final`, {stayingId});
    }

    deleteInvoiceBy(id: number): Observable<void> {
        return this.apiService.delete<void>(`${this.endpoint}/${id}`);
    }
}
