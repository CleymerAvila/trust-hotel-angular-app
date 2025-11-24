import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { DatePipe } from '@angular/common';
import { InvoiceDetails } from './invoice-details.model';
import { HotelService } from '@core/services/hotel.service';

export interface Hotel {
    hotelId: number;
    name: string;
    category: number;
    address: string;
    phone: string;
    floors: number;
}

@Component({
    selector: 'invoice-details',
    standalone: true,
    imports: [ DatePipe ],
    templateUrl: './invoice-details.html',
})
export class InvoicesDetails implements OnInit {

    hotel = signal<Hotel | null>(null);

    invoice = signal<InvoiceDetails | null>(null);
    issueDateFixed = signal<Date | null>(null);

    loading = signal(false);
    error = signal(false);

    constructor(
        private route: ActivatedRoute,
        private invoiceService: InvoiceService,
        private hotelService: HotelService
    ) {}

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.loadInvoice(id);
        this.loadHotel();
    }

    loadInvoice(id: number) {
        this.loading.set(true);
        this.error.set(false);

        this.invoiceService.getInvoiceDetails(id).subscribe({
            next: (data: InvoiceDetails) => {

                this.invoice.set(data);
                this.issueDateFixed.set(this.fixDate(data.issueDate));

                this.loading.set(false);
            },
            error: () => {
                this.error.set(true);
                this.loading.set(false);
            }
        });
    }

    loadHotel() {
        this.hotelService.getHotelById(1).subscribe({
            next: (data) => this.hotel.set(data),
            error: () => console.error("Error cargando hotel")
        });
    }


    fixDate(value: number[]): Date {
        if (Array.isArray(value) && value.length === 6) {
            return new Date(
                value[0],
                value[1] - 1,
                value[2],
                value[3],
                value[4],
                value[5]
            );
        }
        return new Date();
    }
}
