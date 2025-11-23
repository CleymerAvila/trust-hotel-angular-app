import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/services/api.service";
import { Observable } from "rxjs";
import { Client } from "./client.model";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  endpoint = '/clients';
  private apiService  = inject(ApiService);

  getClients(): Observable<Client[]> {
    return this.apiService.get<Client[]>(`${this.endpoint}`);
  }

  deleteClientBy(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  createCliente(clientData: any): Observable<Client> {
    return this.apiService.post<Client>(`${this.endpoint}`, clientData);
  }

  getClientById(id: number): Observable<Client> {
    return this.apiService.get<Client>(`${this.endpoint}/${id}`);
  }

  updateClient(id: number, clientData: any): Observable<Client> {
    return this.apiService.put<Client>(`${this.endpoint}/${id}`, clientData);
  }
}
