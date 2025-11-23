import { Routes } from "@angular/router";

export const INVOICES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@features/invoices/invoices-list/invoice-list').then(m => m.InvoicesList)
    }
]