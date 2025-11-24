import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout').then(l => l.Layout),
    children : [
      {
          path: 'dashboard',
          loadComponent: () =>
              import('@features/dashboard/dashboard').then(d => d.Dashboard)
      },
      {
        path: 'rooms',
        loadChildren: () => import('@features/rooms/rooms.routes').then(m => m.ROOMS_ROUTES)
      },
      {
        path: 'employees',
        loadChildren: () => import('@features/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES)
      },
      {
        path: 'bookings',
        loadChildren: () => import('@features/bookings/booking.routes').then(m => m.BOOKINGS_ROUTES)
      },
      {
        path: 'clients',
        loadChildren: () => import('@features/clients/clients.routes').then(c => c.CLIENTS_ROUTES)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch : 'full'
      }
    ]
  }
]
