import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-create-promotion',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-promotion.html'
})
export class CreatePromotion {
  private promotionService = inject(PromotionService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  createForm: FormGroup;

  promotionTypes = [
    'Descuento',
    'Servicios Extra',
    'Noches Extra',
    'Páquete',
    'Adelanto Reserva',
    'Ascenso de Categoria',
    'Patrocinio',
    'Estadía Duradera',
    'Evento Especial',
    'Por Temporada'
  ];

  promotionStatus = ['Activo', 'Inactivo', 'Pendiente'];

  constructor() {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      maximumUse: [null]
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.promotionService.createPromotion(this.createForm.value).subscribe({
        next: () => {
          alert('Promoción creada exitosamente');
          this.router.navigate(['/promotions']);
        },
        error: (err) => {
          alert('Error al crear promoción');
          console.log(err);
        }
      });
    }
  }
}
