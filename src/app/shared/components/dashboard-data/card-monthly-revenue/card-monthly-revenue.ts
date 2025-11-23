import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-monthly-revenue',
    imports: [DecimalPipe, CurrencyPipe],
    templateUrl: './card-monthly-revenue.html',
})
export class CardMonthlyRevenueComponent {
    @Input() revenue: number = 0;
    @Input() monto: number = 0;
}
