import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientService } from '../client.service';
import { Client } from '../client.model';

@Component({
  selector: 'app-clients-list',
  imports: [RouterLink],
  templateUrl: './clients-list.html',
})
export class ClientsList {
  isOpen = signal(false);
  private clientService = inject(ClientService);

  clients = signal<Client[]>([]);


  loading = signal(true);
  error = signal<string | null>(null);
  ngOnInit() {
    this.loadClients();
  }

  loadClients(): void {
    this.loading.set(true);
    this.error.set(null);
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients.set(clients);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los clientes.');
        this.loading.set(false);
        console.log(err, 'error loading clients');
      }
    })
  }

  toggleDropdown(){
    this.isOpen.set(!this.isOpen())
  }

  deleteClient(clientId: number): void {
    if(confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clientService.deleteClientBy(clientId).subscribe({
        next: () => {
          alert('Cliente eliminado exitosamente.');
          this.loadClients();
        },
        error: (err) => {
          alert('Error al eliminar el cliente asegurese que el cliente no tenga reservas asociadas.');
          console.log(err, 'error deleting client');
        }
      });
    }
  }
}
