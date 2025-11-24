import { Routes } from "@angular/router";

export const STAYINGS_ROUTES: Routes = [
  {
    path : '',
    loadComponent: () => import('@features/stayings/staying-list/staying-list')
          .then(s => s.StayingList),
  }
]
