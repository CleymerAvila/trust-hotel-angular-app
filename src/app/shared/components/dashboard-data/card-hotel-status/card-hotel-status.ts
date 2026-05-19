import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-hotel-status',
    templateUrl: './card-hotel-status.html',
})
export class CardHotelStatusComponent {
    @Input() checkinsToday: number = 0;
    @Input() checkoutsToday: number = 0;
    @Input() reservas: number = 0;
    @Input() disponibles: number = 0;
}
