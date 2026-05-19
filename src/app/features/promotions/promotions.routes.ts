import { Routes } from '@angular/router'

export const PROMOTIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/promotions/promotions-list/promotions-list').then(m => m.PromotionsList),
  },
  {
    path: 'create',
    loadComponent: () => import('@features/promotions/create-promotion/create-promotion').then(m => m.CreatePromotion),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('@features/promotions/edit-promotion/edit-promotion').then(m => m.EditPromotion),
  },
  {
      path: '',
      redirectTo: 'promotions',
      pathMatch: 'full'
  }
]
