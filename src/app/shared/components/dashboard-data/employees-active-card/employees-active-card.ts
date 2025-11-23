import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/dashboard.service';

@Component({
    selector: 'app-employees-active-card',
    templateUrl: './employees-active-card.html',
})
export class EmployeesActiveCardComponent implements OnInit{

    @Input() empleadosActivos!: number;
    
    constructor(
        private dashboardService: DashboardService
    ){}

    ngOnInit(): void {
    console.log("iniciando tarjeta Empleados Activos");
    this.cargarDatosTarjeta(); // 👈 AGREGA ESTO
    }

    cargarDatosTarjeta() {
        this.dashboardService.getDashboardData().subscribe({
            next: data => {
                console.log("Datos recibidos del dashboard: ", data);

                this.empleadosActivos = data.activeEmployees
            }
        })
    }
}
