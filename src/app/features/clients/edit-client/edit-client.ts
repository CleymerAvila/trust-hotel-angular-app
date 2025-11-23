import { Component, inject } from '@angular/core';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-client.html',
})
export class EditClient {
  clientToEdit: Client | null = null;

  clientService = inject(ClientService);
  route = inject(Router);
  activedRoute = inject(ActivatedRoute);
  clientId: number = 0;

  editForm = new FormGroup( {
    email: new FormControl(this.clientToEdit?.email),
    address: new FormControl(this.clientToEdit?.address),
    phone: new FormControl(this.clientToEdit?.phone),
  })

  constructor() { }

  ngOnInit(): void {
    this.clientId = Number(this.activedRoute.snapshot.paramMap.get('id'));
    this.clientService.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.clientToEdit = client;
        console.log('Cliente a editar:', client);
        this.editForm.setValue({
          email: client.email,
          address: client.address,
          phone: client.phone,
        });
      },
      error: (error) => {
        alert('Error al obtener el cliente');
        console.error('Error al obtener el cliente:', error);
        this.route.navigate(['/clients']);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const clientData = {
        ...this.editForm.value,
      };
      console.log('Datos del cliente a editar:', clientData);
      // Aqui puedes agregar la logica para enviar los datos al servidor
    }
  }

}
