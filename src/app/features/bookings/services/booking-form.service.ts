import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SelectedClient {
  id: number;
  name: string;
}

export interface SelectedRoom {
  id: number;
  number: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

@Injectable({ providedIn: 'root' })
export class BookingFormService {
  // BehaviorSubject mantiene el último valor emitido
  private selectedClientSubject = new BehaviorSubject<SelectedClient | null>(null);
  private selectedRoomSubject = new BehaviorSubject<SelectedRoom | null>(null);
  private dateRangeSubject = new BehaviorSubject<DateRange | null >(null);

  // Exponemos estos como observables (lectura)
  selectedClient$: Observable<SelectedClient | null> = this.selectedClientSubject.asObservable();
  selectedRoom$: Observable<SelectedRoom | null> = this.selectedRoomSubject.asObservable();
  dateRange$: Observable<DateRange | null> = this.dateRangeSubject.asObservable();

  // Métodos para actualizar (escritura)
  setSelectedClient(client: SelectedClient): void {
    console.log('Cliente seleccionado en servicio:', client);
    this.selectedClientSubject.next(client);
  }

  setSelectedRoom(room: SelectedRoom): void {
    console.log('Habitación seleccionada en servicio:', room);
    this.selectedRoomSubject.next(room);
  }

  getRangeDate(): DateRange | null {
    return this.dateRangeSubject.value;
  }

  setDateRange(startDate: string, endDate: string): void {
    this.dateRangeSubject.next({startDate, endDate})
  }
  // Obtener valores actuales sin suscripción (útil a veces)
  getSelectedClient(): SelectedClient | null {
    return this.selectedClientSubject.value;
  }

  getSelectedRoom(): SelectedRoom | null {
    return this.selectedRoomSubject.value;
  }

  // Limpiar todo
  clearSelection(): void {
    this.selectedClientSubject.next(null);
    this.selectedRoomSubject.next(null);
    this.dateRangeSubject.next(null);
  }

  // Limpiar selección individual
  clearClient(): void {
    this.selectedClientSubject.next(null);
  }

  clearRoom(): void {
    this.selectedRoomSubject.next(null);
  }
}
