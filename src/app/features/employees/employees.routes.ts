import { Routes } from "@angular/router";

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/employees/employees-list/employees-list').then(m => m.EmployeesList),
  },
  {
    path: 'create',
    loadComponent: () => import('@features/employees/create-employee/create-employee').then(m => m.CreateEmployee),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('@features/employees/edit-employee/edit-employee').then(m => m.EditEmployee),
  },
  {
      path: '',
      redirectTo: 'rooms',
      pathMatch: 'full'
  }
]
