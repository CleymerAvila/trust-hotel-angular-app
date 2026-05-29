import { Injectable, inject } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { RoomService, RoomServiceRequest } from './room-service.model';

@Injectable({
  providedIn: 'root',
})
export class RoomServiceService {
  endpoint = '/room-services';
  private apiService = inject(ApiService);

  getRoomServices(): Observable<RoomService[]> {
    return this.apiService.get<RoomService[]>(`${this.endpoint}`);
  }

  getRoomServiceById(id: number): Observable<RoomService> {
    return this.apiService.get<RoomService>(`${this.endpoint}/${id}`);
  }

  createRoomService(data: any): Observable<RoomService> {
    return this.apiService.post<RoomService>(`${this.endpoint}`, data);
  }

  updateRoomService(id: number, data: any): Observable<RoomService> {
    return this.apiService.put<RoomService>(`${this.endpoint}/${id}`, data);
  }

  deleteRoomService(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  getServiceRequests(): Observable<RoomServiceRequest[]> {
    return this.apiService.get<RoomServiceRequest[]>('/service-requests');
  }

  assignEmployee(requestId: number, employeeId: number): Observable<RoomServiceRequest> {
    return this.apiService.patch<RoomServiceRequest>('/service-requests/assign', {
      requestId,
      employeeId,
    });
  }
}
