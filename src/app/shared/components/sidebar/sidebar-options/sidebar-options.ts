import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";


export interface MenuOption{
  label: string;
  route: string;
  roles: string[];
  icon?: string;
}


@Component({
  selector: 'sidebar-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-options.html',
})
export class SidebarOptions {

  role = input.required<string>();

  options: MenuOption[] = [
    {label: 'Dashboard', route: '/dashboard', roles: ['ROLE_ADMIN','ROLE_MANAGER'], icon: 'fa-solid fa-border-all'},
    {label: 'Habitaciones', route: '/rooms', roles: ['ROLE_ADMIN','ROLE_MANAGER'], icon: 'fa-solid fa-bed'},
    {label: 'Empleados', route: '/employees', roles: ['ROLE_ADMIN','ROLE_MANAGER'], icon: 'fa-solid fa-users'},
    {label: 'Reportes', route: '/reports', roles: ['ROLE_ADMIN','ROLE_MANAGER'], icon: 'fa-solid fa-chart-line'},
    {label: 'Reservas', route: '/bookings', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST'], icon: 'fa-solid fa-calendar-check'},
    {label: 'Estadias', route: '/stayings', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST'], icon: 'fa-solid fa-door-open'},
    {label: 'Clientes', route: '/clients', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST'], icon: "fa-solid fa-people-roof"},
    {label: 'Promociones', route: '/promotions', roles: ['ROLE_ADMIN','ROLE_MANAGER', 'ROLE_RECEPTIONIST'], icon: 'fa-solid fa-tags'},
    {label: 'Pagos', route: '/payments', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST'], icon: 'fa-solid fa-credit-card'},
    {label: 'Servicios Habitacion', route: '/room-services', roles: ['ROLE_ADMIN','ROLE_MANAGER', 'ROLE_RECEPTIONIST'], icon: 'fa-solid fa-concierge-bell'},
    {label: 'Facturas', route: '/invoices', roles: ['ROLE_ADMIN','ROLE_RECEPTIONIST'], icon: 'fa-solid fa-file-invoice'},
  ]


  get filteredOptions(): MenuOption[] {
    return this.options.filter(opt => opt.roles.includes(this.role()))
  }
}
