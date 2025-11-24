import { Routes } from "@angular/router";
import { InvoicesList } from "./invoices-list/invoice-list";

export const INVOICES_ROUTES: Routes = [
    {
        path: '',
        component: InvoicesList
    },
    {
    path: ':id',
    loadComponent: () => import('./invoice-details/invoice-details')
        .then(c => c.InvoicesDetails)
    }
]