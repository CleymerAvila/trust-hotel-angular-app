import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/dashboard.service';
import { RoomService } from '@features/rooms/room.service';

@Component({
    selector: 'app-card-hotel-status',
    templateUrl: './card-hotel-status.html',
})
export class CardHotelStatusComponent implements OnInit {

    habitacionesDisponibles: number = 0;

    constructor(
        private dashboardService: DashboardService,
        private roomService: RoomService
    ) {}

    ngOnInit(): void {
    console.log("==== INICIANDO TARJETA ====");
    this.cargarDatosTarjeta();
    }

    cargarDatosTarjeta() {

        this.dashboardService.getDashboardData().subscribe({
            next: data => {
                console.log("Datos recibidos del dashboard: ", data);

                this.habitacionesDisponibles = data.freeRooms;
                this.checkinsToday = data.totalBookings; // Temporal
                this.checkoutsToday = data.completedBookings; // Temporal   
            }
        })
    }

    @Input() availableRooms: number = 0;
    @Input() checkinsToday: number = 0;
    @Input() checkoutsToday: number = 0;
    @Input() reservas!: number;
    @Input() disponibles!: number;
}
