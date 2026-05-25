import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicesDetails } from '@features/invoices/invoice-details/invoice-details';
import { InvoiceService } from '@features/invoices/invoice.service';
import { PaymentService } from '@features/payments/payment.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-add-invoice-payment',
  imports: [InvoicesDetails, FormsModule, ReactiveFormsModule],
  templateUrl: './add-invoice-payment.html',
  styleUrl: './add-invoice-payment.css',
})
export class AddInvoicePayment implements OnInit{

  invoiceService: InvoiceService = inject(InvoiceService);
  paymentsService: PaymentService = inject(PaymentService);
  notify: NotificationService = inject(NotificationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  isLoading = signal<boolean>(false);
  hidePaymentOption = signal<boolean>(true);
  id: number = 0;

  paymentForm!: FormGroup;
  invoiceId!: FormControl;
  paymentMethod!: FormControl;
  totalAmount!: FormControl;
  status!: FormControl;
  issueDate!: FormControl;

  constructor() {
    this.initPaymentForm()
  }

  initPaymentForm(): void {
    this.paymentForm = new FormGroup({
      invoiceId: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required),
      totalAmount: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      issueDate: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.getInvoiceId();
    console.log("invoice id " + this.getInvoiceId())
    this.initPaymentForm();
  }

  toggleAddPaymentOption(): boolean {
    this.hidePaymentOption.set(!this.hidePaymentOption());
    console.log('hidePaymentOption: ' + this.hidePaymentOption())
    return this.hidePaymentOption();
  }

  onSubmit(): void {
    const currentValues = this.paymentForm.value;
    console.log("Valores actuales del formulario", currentValues)
    const currentDate = new Date();
    this.paymentForm.patchValue({
      invoiceId: this.id,
      status: 'APPROVED',
      issueDate: currentDate.toISOString()
    })
    if(this.paymentForm.valid){
      console.log('Formulario Valido: ' , this.paymentForm.value)
      this.paymentsService.registerPayment(this.paymentForm.value).subscribe({
        next: (payment) => {
          console.log(payment);
          this.notify.success('Pago Registrado', 'El pago fue creado exitosamente');
          this.ngOnInit();
          this.paymentForm.reset();
          this.closeModal();
        },
        error: (error) => {
          console.error(error);
        }
      })

    } else {
      console.log('Formulario Invalido: ' , this.paymentForm.value);

    }
  }

  receiveInvoiceId(invoiceId: any){
    console.log("invoiceId received " + invoiceId);
    this.id = invoiceId;
  }

  getInvoiceId(): number {
    return this.id;
  }
  closeModal(): void {
    console.log('📍 Cerrando modal');
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
