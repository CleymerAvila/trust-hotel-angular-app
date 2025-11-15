import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";


export interface MenuOption{
  label: string;
  route: string;
  roles: string[];
}


@Component({
  selector: 'sidebar-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-options.html',
})
export class SidebarOptions {

  role = input.required<string>();

  options: MenuOption[] = [
    {label: 'Dashboard', route: '/dashboard', roles: ['ROLE_ADMIN','ROLE_MANAGER']},
    {label: 'Habitaciones', route: '/rooms', roles: ['ROLE_ADMIN','ROLE_MANAGER']},
    {label: 'Empleados', route: '/employees', roles: ['ROLE_ADMIN','ROLE_MANAGER']},
    {label: 'Reportes', route: '/reports', roles: ['ROLE_ADMIN','ROLE_MANAGER']},
    {label: 'Reservas', route: '/bookings', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST']},
    {label: 'Estadias', route: '/stayings', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST']},
    {label: 'Promociones', route: '/promotions', roles: ['ROLE_ADMIN','ROLE_MANAGER', 'ROLE_RECEPTIONIST']},
    {label: 'Pagos', route: '/payments', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST']},
    {label: 'Servicios Habitacion', route: '/room-services', roles: ['ROLE_ADMIN','ROLE_MANAGER', 'ROLE_RECEPTIONIST']},
    {label: 'Facturas', route: '/Invoices', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST']},
  ]


  get filteredOptions(): MenuOption[] {
    return this.options.filter(opt => opt.roles.includes(this.role()))
  }
}
