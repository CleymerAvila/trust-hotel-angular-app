import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-create-client',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-client.html',
})
export class CreateClient {
  clientService = inject(ClientService);
  route = inject(Router);

  createForm = new FormGroup( {
    dni: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })

  constructor() {}

  onSubmit(): void {
    if (this.createForm.valid) {
      const clientData = {
        ...this.createForm.value,
      };
      console.log('Datos del cliente a crear:', clientData);

      this.clientService.createCliente(clientData).subscribe({
        next: (client) => {
          this.createForm.reset();
          alert('Cliente creado exitosamente');
          this.route.navigate(['/clients']);
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
          alert('Error al crear cliente. Por favor, intenta de nuevo.');
        }
      });
    }
  }
}
