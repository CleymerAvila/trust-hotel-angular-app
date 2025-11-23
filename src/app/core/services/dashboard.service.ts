import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface DashboardData {
    totalRooms: number;
    freeRooms: number;
    bookedRooms: number;
    occupiedRooms: number;
    maintenanceRooms: number;

    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    canceledBookings: number;
    completedBookings: number;

    activeStayings: number;
    finishedStayings: number;

    totalClients: number;

    monthlyRevenue: number;
    activeEmployees: number;
}


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = "http://localhost:8080/api/v1/dashboard";

    constructor(private http:HttpClient) {}

    getDashboardData(): Observable<DashboardData> {

        console.log(this.http.get<DashboardData>(this.apiUrl));

        return this.http.get<DashboardData>(`${this.apiUrl}`);
    }
}