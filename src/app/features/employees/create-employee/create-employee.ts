import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Hotel } from '@core/models/hotel.model';
import { HotelService } from '@core/services/hotel.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-employee.html',
})
export class CreateEmployee implements OnInit, OnDestroy{
  currentHotel: Hotel | null = null;
  private hotelSubscription?: any;
  hotelService = inject(HotelService);
  employeeService = inject(EmployeeService);
  route = inject(Router);
  desactived = false;

  createForm = new FormGroup({
    dni: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    salary: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    workShift: new FormControl('MORNING', Validators.required),
    type: new FormControl('PERSONNEL', Validators.required),
    bonus: new FormControl<number>(0, { nonNullable: true, validators: [Validators.min(0)] }),
    department: new FormControl(''),
    mainLanguage: new FormControl(''),
  })

  constructor() {
    this.hotelService.getCurrentHotel().subscribe();
  }

  ngOnInit(): void {
    // ✅ Suscribirse al Observable del hotel actual
    this.hotelSubscription = this.hotelService.currentHotel$.subscribe({
      next: (hotel) => {
        this.currentHotel = hotel;
        console.log('Hotel actual:', hotel);
      },
      error: (error) => {
        console.error('Error al obtener hotel:', error);
      }
    })
  }

  onSubmit(): void {
    if(this.createForm.valid){
      const employeeData = {
        ...this.createForm.value,
        hotelId: this.currentHotel?.hotelId
      };
      console.log('Datos del empleado a crear:', employeeData);

      this.employeeService.createEmployee(employeeData).subscribe({
        next: (employee) => {
          this.createForm.reset();
          console.log('Empleado creado exitosamente:', employee);
          alert('Empleado creado exitosamente');
          this.route.navigate(['/employees']);
        },
        error: (error) => {
          alert('Error al crear el empleado');
        }
      });
    }
  }

  ngOnDestroy(): void {
    // ✅ Cancelar la suscripción al destruir el componente
    if (this.hotelSubscription) {
      this.hotelSubscription.unsubscribe();
    }
  }
}
