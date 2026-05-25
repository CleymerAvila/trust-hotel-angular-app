import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-employees-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './employees-list.html',
})
export class EmployeesList {
  isOpen = signal(false)
  private employeeService = inject(EmployeeService);
  private notify = inject(NotificationService);

  employees = signal<Employee[]>([]);

  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.error.set(null);

    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees.set(employees);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los empleados.');
        this.loading.set(false);
        console.log(err, 'error loading employees');
      }
    })
  }

  deleteEmployee(employeeId: number): void {
    if(confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.employeeService.deleteEmployeeBy(employeeId).subscribe({
        next: () => {
          this.notify.warning('Empleado Eliminado ', 'El empleado fue borrado de los registros exitosamente');
          this.loadEmployees();
        },
        error: (err) => {
          this.notify.error('Error eliminando Empleado', err?.error?.message);
          console.log(err, 'error deleting employee');
        }
      });
    }
  }
  toggleDropdown(){
    this.isOpen.set(!this.isOpen())
  }
}
