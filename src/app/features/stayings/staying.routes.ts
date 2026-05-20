import { Routes } from "@angular/router";
import { AddInvoicePayment } from "@shared/components/add-invoice-payment/add-invoice-payment";

export const STAYINGS_ROUTES: Routes = [
  {
    path : '',
    loadComponent: () => import('@features/stayings/staying-list/staying-list')
          .then(s => s.StayingList),
  },
  {
    path: 'invoice-payments/:id',
    component: AddInvoicePayment
  }
]
