import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomServiceService } from '../room-service.service';
import { RoomServiceRequest, REQUEST_STATUSES } from '../room-service.model';
import { EmployeeService } from '../../employees/employee.service';
import { Employee } from '../../employees/employee.model';
import { ClientService } from '../../clients/client.service';
import { Client } from '../../clients/client.model';
import { RoomService as ServiceModel } from '../room-service.model';
import { StayingService } from '../../stayings/staying.service';
import { Staying } from '../../stayings/staying.model';
import { RoomService } from '../../rooms/room.service';
import { Room } from '../../rooms/room.model';
import { NotificationService } from '@core/services/notification.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-requests-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './service-requests-list.html',
})
export class ServiceRequestsList {
  private roomServiceService = inject(RoomServiceService);
  private employeeService = inject(EmployeeService);
  private clientService = inject(ClientService);
  private stayingService = inject(StayingService);
  private roomsService = inject(RoomService);
  private notify = inject(NotificationService);

  // Lists from APIs
  requests = signal<RoomServiceRequest[]>([]);
  employees = signal<Employee[]>([]);
  clients = signal<Client[]>([]);
  services = signal<ServiceModel[]>([]);
  stayings = signal<Staying[]>([]);
  rooms = signal<Room[]>([]);

  // Status mapping
  statusMap = REQUEST_STATUSES;

  // View States
  loading = signal(true);
  error = signal<string | null>(null);

  // Modal State
  selectedRequest = signal<RoomServiceRequest | null>(null);
  showAssignModal = signal(false);
  assigning = signal(false);
  employeeSearchQuery = signal('');

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading.set(true);
    this.error.set(null);

    // Load everything in parallel
    forkJoin({
      requests: this.roomServiceService.getServiceRequests(),
      employees: this.employeeService.getEmployees(),
      clients: this.clientService.getClients(),
      services: this.roomServiceService.getRoomServices(),
      stayings: this.stayingService.getAllStayings(),
      rooms: this.roomsService.getRooms(),
    }).subscribe({
      next: (res) => {
        this.requests.set(res.requests);
        this.employees.set(res.employees);
        this.clients.set(res.clients);
        this.services.set(res.services);
        this.stayings.set(res.stayings);
        this.rooms.set(res.rooms);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la información de solicitudes.');
        this.loading.set(false);
        console.error(err, 'error loading request views data');
      },
    });
  }

  // Reload requests only (e.g. after assign)
  refreshRequests(): void {
    this.roomServiceService.getServiceRequests().subscribe({
      next: (reqs) => {
        this.requests.set(reqs);
      },
      error: (err) => {
        console.error(err, 'error refreshing requests');
      },
    });
  }

  // Helper resolvers
  getClientName(clientId: number): string {
    const client = this.clients().find((c) => c.clientId === clientId);
    return client ? client.name : `Cliente #${clientId}`;
  }

  getServiceName(serviceId: number): string {
    const svc = this.services().find((s) => s.roomServiceId === serviceId);
    return svc ? svc.name : `Servicio #${serviceId}`;
  }

  getEmployeeName(employeeId: number | null | undefined): string {
    if (!employeeId) return 'No asignado';
    const emp = this.employees().find((e) => e.employeeId === employeeId);
    return emp ? emp.name : `Empleado #${employeeId}`;
  }

  getRoomNumber(stayingId: number): string {
    const staying = this.stayings().find((s) => s.stayingId === stayingId);
    if (!staying) return `Estadía #${stayingId}`;
    const room = this.rooms().find((r) => r.roomId === staying.roomId);
    return room ? `Habitación ${room.number}` : `Habitación ID: ${staying.roomId}`;
  }

  // Assignment Modal
  openAssignModal(request: RoomServiceRequest): void {
    this.selectedRequest.set(request);
    this.employeeSearchQuery.set('');
    this.showAssignModal.set(true);
  }

  closeModal(): void {
    this.showAssignModal.set(false);
    this.selectedRequest.set(null);
  }

  getFilteredEmployees(): Employee[] {
    const query = this.employeeSearchQuery().toLowerCase().trim();
    if (!query) return this.employees();

    return this.employees().filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.dni.includes(query) ||
        (emp.department && emp.department.toLowerCase().includes(query))
    );
  }

  assignEmployeeToRequest(employeeId: number): void {
    const req = this.selectedRequest();
    if (!req) return;

    this.assigning.set(true);
    this.roomServiceService.assignEmployee(req.requestId, employeeId).subscribe({
      next: (updatedRequest) => {
        this.notify.success(
          'Empleado Asignado',
          `La solicitud #${req.requestId} ha sido asignada a ${this.getEmployeeName(
            employeeId
          )} exitosamente.`
        );
        this.assigning.set(false);
        this.closeModal();
        this.refreshRequests();
      },
      error: (err) => {
        this.notify.error(
          'Error de Asignación',
          err?.error?.message || 'No se pudo completar la asignación.'
        );
        this.assigning.set(false);
      },
    });
  }
}
