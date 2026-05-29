import { Routes } from '@angular/router';

export const ROOM_SERVICES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/room-services/room-services-list/room-services-list').then(
        (m) => m.RoomServicesList
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/room-services/create-room-service/create-room-service').then(
        (m) => m.CreateRoomService
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('@features/room-services/edit-room-service/edit-room-service').then(
        (m) => m.EditRoomService
      ),
  },
  {
    path: 'requests',
    loadComponent: () =>
      import('@features/room-services/service-requests-list/service-requests-list').then(
        (m) => m.ServiceRequestsList
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
