import { Routes } from "@angular/router";


export const CLIENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/clients/clients-list/clients-list').then(c => c.ClientsList),
  },
  {
    path: 'create',
    loadComponent: () => import('@features/clients/create-client/create-client').then(c => c.CreateClient),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('@features/clients/edit-client/edit-client').then(c => c.EditClient),
  },
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  }
]
