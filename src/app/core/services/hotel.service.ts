import { Injectable } from "@angular/core";
import { Hotel } from "@core/models/hotel.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  endpoint = '/hotels';
  private currentHotelSubject: BehaviorSubject<Hotel| null>;
  public currentHotel$: Observable<Hotel | null>;


  constructor(private apiService: ApiService) {
    const storedHotel = localStorage.getItem('current_hotel');
    this.currentHotelSubject = new BehaviorSubject<Hotel | null>(
      storedHotel ? JSON.parse(storedHotel) : null
    );
    this.currentHotel$ = this.currentHotelSubject.asObservable();
  }

  getCurrentHotel(): Observable<Hotel | null> {
    return this.apiService.get<Hotel>(`${this.endpoint}/get-hotel-info`).pipe(
      tap((hotel: Hotel) => {
        this.currentHotelSubject.next(hotel);
        localStorage.setItem('current_hotel', JSON.stringify(hotel));
      })
    )
  }
}
