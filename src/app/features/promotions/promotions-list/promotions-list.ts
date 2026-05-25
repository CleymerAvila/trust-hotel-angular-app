import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PromotionService } from '../promotion.service';
import { Promotion } from '../promotion.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-promotions-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './promotions-list.html',
})
export class PromotionsList {
  private promotionService = inject(PromotionService);
  private notify = inject(NotificationService);

  promotions = signal<Promotion[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.loading.set(true);
    this.error.set(null);

    this.promotionService.getPromotions().subscribe({
      next: (proms) => {
        this.promotions.set(proms);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las promociones.');
        this.loading.set(false);
        console.log(err, 'error loading promotions');
      }
    })
  }

  deletePromotion(promotionId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta promoción?')) {
      this.promotionService.deletePromotionBy(promotionId).subscribe({
        next: () => {
          this.notify.warning('Promoción Eliminada', 'La promoción ha sido eliminina exitosamente');
          this.loadPromotions();
        },
        error: (err) => {
          this.notify.error('Error al eliminar promoción', err?.error?.message);
          console.log(err, 'error deleting promotion');
        }
      });
    }
  }
}
