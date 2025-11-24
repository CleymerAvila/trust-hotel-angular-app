import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";
import { Staying } from "./staying.model";


@Injectable({
  providedIn: 'root'
})
export class StayingService {
  private endpoint = '/stayings'
  private apiService = inject(ApiService);

  getAllStayings(): Observable<Staying[]> {
    return this.apiService.get(`${this.endpoint}`)
  }

  checkOut(stayingId: number): Observable<Staying>{
    return this.apiService.get(`${this.endpoint}/check-out/${stayingId}`);
  }

  confirmCheckOut(stayingId: number): Observable<string>{
    return this.apiService.get(`${this.endpoint}/confirm-check-out/${stayingId}`);
  }

  revertCheckOut(): Observable<string> {
    return this.apiService.get(`${this.endpoint}/check-out/undo`);
  }
}
