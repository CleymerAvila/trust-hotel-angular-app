import { Component, OnInit, signal } from '@angular/core';
import { PaymentService, PaymentDTO } from '@core/services/payment.service';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
    selector: 'app-payments',
    imports: [
        DatePipe,
        CommonModule
    ],
    templateUrl: './payments.html'
})
export class PaymentsComponent implements OnInit {

    payments = signal<PaymentDTO[]>([]);
    loading = signal(true);

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.paymentService.getAllPayments().subscribe({
        next: (data) => {
            this.payments.set(data);
            this.loading.set(false);
            console.log('PAGOS RECIBIDOS:', data);
        },
        error: () => this.loading.set(false)
        });
    }
}
