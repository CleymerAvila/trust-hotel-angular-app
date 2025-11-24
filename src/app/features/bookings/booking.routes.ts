import { Routes } from "@angular/router";
import { SelectClient } from "./select-client/select-client";
import { SelectRoom } from "./select-room/select-room";
import { CreateBooking } from "./create-booking/create-booking";


export const BOOKINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/bookings/booking-list/booking-list').then(b => b.BookingList)
  },
  {
    path: 'make-booking',
    component: CreateBooking,
    children: [
      {
        path: 'select-client',
        component: SelectClient
      },
      {
        path: 'select-room',
        component: SelectRoom
      }
    ]
  },
]
