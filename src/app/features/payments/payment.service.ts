import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';

export interface PaymentDTO {
    paymentId: number;
    paymentMethod: string;
    totalAmount: number;
    status: string;
    issueDate: string;
    invoice: {
        invoiceId: number,
        clientName: string
    };
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

  endpoint = '/payments';

  private apiService = inject(ApiService);

  getAllPayments(): Observable<PaymentDTO[]> {
      return this.apiService.get<PaymentDTO[]>(this.endpoint);
  }

  getPaymentById(id: number): Observable<PaymentDTO> {
      return this.apiService.get<PaymentDTO>(`${this.endpoint}/${id}`);
  }
}
