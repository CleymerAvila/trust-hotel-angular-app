import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
        path : '',
        loadChildren: () => import('@shared/components/layout/layout.routes')
        .then(layout => layout.LAYOUT_ROUTES),
        canActivate: [authGuard]
    },
    {
        path : 'login',
        loadComponent: () => import('@features/auth/login/login-page/login-page').then(lp => lp.LoginPage),
        canActivate: [guestGuard]
    },
    {
        path : '**',
        redirectTo : 'login',
    }
];
