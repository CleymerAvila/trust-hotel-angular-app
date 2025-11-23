import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './invoice.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/invoices';

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.baseUrl);
    }

    deleteInvoiceBy(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
