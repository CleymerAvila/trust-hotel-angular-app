import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";
import { Booking } from "../booking.model";

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  endpoint = '/bookings';
  private apiService = inject(ApiService);


  getBookings(): Observable<Booking[]> {
    return this.apiService.get<Booking[]>(`${this.endpoint}`);
  }

  createBooking(bookingData: any): Observable<Booking> {
    return this.apiService.post(`${this.endpoint}`, bookingData);
  }
  deleteBookingBy(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  checkIn(id: number): Observable<Booking>{
    return this.apiService.get(`${this.endpoint}/check-in/${id}`)
  }

  cancelBooking(id: number): Observable<Booking> {
    return this.apiService.delete<Booking>(`${this.endpoint}/cancel/${id}`)
  }

  confirmCheckIn(id: number): Observable<Booking>{
    return this.apiService.get(`${this.endpoint}/confirm-check-in/${id}`)
  }
}
