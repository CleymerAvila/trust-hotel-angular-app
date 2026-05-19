import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoomService } from '@features/rooms/room.service';
import { CardHotelStatusComponent } from "@shared/components/dashboard-data/card-hotel-status/card-hotel-status";
import { CardMonthlyRevenueComponent } from "@shared/components/dashboard-data/card-monthly-revenue/card-monthly-revenue";
import { EmployeesActiveCardComponent } from "@shared/components/dashboard-data/employees-active-card/employees-active-card";
import { OcupacionCardComponent } from "@shared/components/dashboard-data/ocupacion-card/ocupacion-card";
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styles: ``,
  imports: [
    CardHotelStatusComponent,
    CardMonthlyRevenueComponent,
    EmployeesActiveCardComponent,
    NgApexchartsModule,
    OcupacionCardComponent,
  ]
})
export class Dashboard implements OnInit {

  reservasPorTipoData = {
    SINGLE: 0,
    DOUBLE: 0,
    TRIPLE: 0,
    SUITE: 0,
    STANDARD: 0,
    FAMILY: 0
  };

  habitacionesDisponibles: number = 0;
  totalReservasHoy: number = 0;
  ingresosMensuales: number = 0;
  empleadosActivos: number = 0;
  checkinsToday: number = 0;
  checkoutsToday: number = 0;

  ocupacionActual: number = 0;
  habitacionesTotales: number = 0;
  variacionOcupacion: number = 0;

  ocupacionActualRooms: number = 0;

  constructor(
    private dashboardService: DashboardService,
    private roomService: RoomService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("==== INICIANDO DASHBOARD ====");
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard() {
  this.dashboardService.getDashboardData().subscribe({
    next: data => {
      console.log("✔ Datos del dashboard recibidos:", data);

      // Habitaciones
      this.habitacionesDisponibles = data.freeRooms;
      this.habitacionesTotales = data.totalRooms;

      // Guardamos las habitaciones ocupadas reales
      this.ocupacionActualRooms = data.occupiedRooms;

      // Porcentaje de ocupación (opcional)
      this.ocupacionActual = data.totalRooms > 0
        ? Math.round((data.occupiedRooms / data.totalRooms) * 100)
        : 0;

      // Ingresos mensuales
      this.ingresosMensuales = data.monthlyRevenue;

      // Total reservas (usando totalBookings por ahora)
      this.totalReservasHoy = data.totalBookings;
      this.checkinsToday = data.totalBookings;
      this.checkoutsToday = data.completedBookings;

      // Empleados activos
      this.empleadosActivos = data.activeEmployees;

      this.cdr.detectChanges();
    },
    error: err => {
      console.error("❌ ERROR en /dashboard-data (getDashboardData)", err);
    }
  });

}


}
