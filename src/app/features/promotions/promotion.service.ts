import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { Promotion } from '../../features/promotions/promotion.model';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  endpoint = '/promotions'
  private apiService = inject(ApiService);

  getPromotions(): Observable<Promotion[]> {
    return this.apiService.get<Promotion[]>(`${this.endpoint}`);
  }

  createPromotion(data: any): Observable<Promotion> {
    return this.apiService.post<Promotion>(`${this.endpoint}`, data);
  }

  getPromotionById(promotionId: number): Observable<Promotion> {
    return this.apiService.get<Promotion>(`${this.endpoint}/${promotionId}`);
  }

  updatePromotion(promotionId: number, data: any): Observable<Promotion> {
    return this.apiService.put<Promotion>(`${this.endpoint}/${promotionId}`, data);
  }

  deletePromotionBy(promotionId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${promotionId}`);
  }

  getActivePromotions(startDate: string, endDate: string): Observable<Promotion[]> {
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.apiService.get<Promotion[]>(`${this.endpoint}/active`, params);
  }
}
