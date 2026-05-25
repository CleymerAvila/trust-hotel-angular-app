import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@features/clients/client.service';
import { BookingFormService } from '../services/booking-form.service';
import { Client } from '@features/clients/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-select-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-client.html',
})
export class SelectClient implements OnInit{
  private router = inject(Router);
  private clientService = inject(ClientService);
  private bookingFormService = inject(BookingFormService);
  private notify = inject(NotificationService);
  private route = inject(ActivatedRoute);

  clients = signal<Client[]>([]);
  filteredClients = signal<Client[]>([]);
  searchTerm = signal('')
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.isLoading.set(true);
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients.set(clients);
        this.filteredClients.set(clients);
        this.notify.info('Clientes Cargados', 'Los datos de los clientes han sido obtenidos correctamente')
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.isLoading.set(false);
      }
    });
  }

  filterClients(): void {
    if(!this.searchTerm().trim()){
      this.filteredClients.set(this.clients());
      return;
    }
    const term = this.searchTerm().toLowerCase();
    this.filteredClients.set(
      this.clients().filter(client =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.dni.toLowerCase().includes(term)
      )
    );
  }

  selectClient(client: Client): void {
    this.bookingFormService.setSelectedClient({
      id: client.clientId,
      name: client.name,
    });
    this.router.navigate(['bookings', 'make-booking']);
  }

  closeModal(): void {
    this.router.navigate(['bookings','make-booking']);
  }
}
