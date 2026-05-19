import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-edit-promotion',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-promotion.html'
})
export class EditPromotion {
  private promotionService = inject(PromotionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  editForm: FormGroup;
  loading = signal(true);

  promotionTypes = [
    'DISCOUNT',
    'EXTRA_SERVICES',
    'EXTRA_NIGHTS',
    'PACK',
    'ADVANCE_BOOKING',
    'UPGRADE',
    'PARTNER',
    'LONG_STAY',
    'SPECIAL_EVENT',
    'PER_SEASON'
  ];

  promotionStatus = ['ACTIVE', 'INACTIVE', 'PENDING'];

  promotionId: number | null = null;

  constructor() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      maximumUse: [null]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.promotionId = id;
        this.loading.set(true);
        this.promotionService.getPromotionById(id).subscribe({
          next: (p) => {
            console.log('Promotion loaded:', p);
            this.editForm.patchValue(p);
            this.loading.set(false);
          },
          error: (err) => {
            console.error('Error loading promotion:', err);
            this.loading.set(false);
            alert('Error al cargar la promoción');
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.promotionId) {
      this.promotionService.updatePromotion(this.promotionId, this.editForm.value).subscribe({
        next: () => {
          alert('Promoción actualizada exitosamente');
          this.router.navigate(['/promotions']);
        },
        error: (err) => {
          alert('Error al actualizar promoción');
          console.error(err);
        }
      });
    }
  }
}
