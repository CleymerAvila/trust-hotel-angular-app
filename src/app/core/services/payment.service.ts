import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentDTO {
    paymentId: number;
    paymentMethod: string;
    totalAmount: number;
    status: string;
    issueDate: string;
    invoice: {
        invoiceId: number;
        client: {
        name: string;
        };
    };
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private http = inject(HttpClient);
    private api = '/api/v1/payments';

    getAllPayments(): Observable<PaymentDTO[]> {
        return this.http.get<PaymentDTO[]>(this.api);
    }

    getPaymentById(id: number): Observable<PaymentDTO> {
        return this.http.get<PaymentDTO>(`${this.api}/${id}`);
    }
}
