import { Component, inject, signal } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-employee.html',
})
export class EditEmployee {
  employeeToEdit: Employee | null = null;
  employeeService = inject(EmployeeService);
  activedRoute = inject(ActivatedRoute);
  route = inject(Router);
  employeeId: number = 0;

  editForm = new FormGroup<any>({
    email: new FormControl(this.employeeToEdit?.email, Validators.required),
    phone: new FormControl(this.employeeToEdit?.phone, Validators.required),
    salary: new FormControl(this.employeeToEdit?.salary, Validators.required),
    workShift: new FormControl('MORNING', Validators.required),
    type: new FormControl({ value: this.employeeToEdit?.type, disabled: true }, Validators.required),
    department: new FormControl(this.employeeToEdit?.department),
    bonus: new FormControl(this.employeeToEdit?.bonus),
    mainLanguage: new FormControl(this.employeeToEdit?.mainLanguage),
  });

  constructor() {}

  ngOnInit(): void {
    this.employeeId = Number(this.activedRoute.snapshot.paramMap.get('id'));
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        this.employeeToEdit = employee;
        console.log('Empleado a editar:', employee);

        this.editForm.setValue({
          email: employee.email,
          phone: employee.phone,
          salary: employee.salary,
          workShift: employee.workShift,
          type: employee.type,
          department: employee?.department ? employee.department : '',
          bonus: employee?.bonus ? employee.bonus : 0,
          mainLanguage: employee?.mainLanguage ? employee.mainLanguage : '',
        });
      },
      error: (error) => {
        alert('Error al obtener el empleado');
        console.error('Error al obtener el empleado:', error);
        this.route.navigate(['/employees']);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const employeeType = this.employeeToEdit?.type;
      if (employeeType === 'MANAGER') {
        this.editForm.get('department')?.disable();
        this.editForm.get('mainLanguage')?.disable();
      } else if (employeeType === 'RECEPTIONIST') {
        this.editForm.get('bonus')?.disable();
        this.editForm.get('department')?.disable();
      } else if(employeeType === 'PERSONNEL') {
        this.editForm.get('bonus')?.disable();
        this.editForm.get('mainLanguage')?.disable();
      }
      this.editForm.get('type')?.enable();
      const employeeData = {
        ...this.editForm.value,
      };
      this.editForm.get('type')?.disable();
      console.log('Datos del empleado a editar:', employeeData);
      // Aqui puedes agregar la logica para enviar los datos al servidor
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
        next: (employee) => {
          alert('Empleado editado con exito');
          console.log('Empleado editado con exito:', employee);
          this.route.navigate(['/employees']);
        },
        error: (error) => {
          alert('Error al editar el empleado');
          console.error('Error al editar el empleado:', error);
        }
      })
    }
  }
}
