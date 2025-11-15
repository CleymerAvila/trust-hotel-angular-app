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
        path: '',
        redirectTo: 'dashboard',
        pathMatch : 'full'
      }
    ]
  }
]
