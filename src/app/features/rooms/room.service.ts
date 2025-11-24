import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Room } from './room.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  endpoint = '/rooms'
  private apiService = inject(ApiService);

  getRooms(): Observable<Room[]> {
    return this.apiService.get<Room[]>(`${this.endpoint}`);
  }

  createRoom(roomData: any): Observable<Room> {
    return this.apiService.post<Room>(`${this.endpoint}`, roomData);
  }

  getRoomById(roomId: number): Observable<Room> {
    return this.apiService.get<Room>(`${this.endpoint}/${roomId}`);
  }

  editRoom(roomId: number, roomData: any): Observable<Room> {
    return this.apiService.put<Room>(`${this.endpoint}/${roomId}`, roomData);
  }

  deleteRoomBy(roomId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${roomId}`);
  }

  getAvailableRooms(startDate: string, endDate: string): Observable<Room[]> {
    const payload = {
      startDate,
      endDate
    }
    return this.apiService.post(`${this.endpoint}/available`, payload)
  }
}
