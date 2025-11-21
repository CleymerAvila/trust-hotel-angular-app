import { Routes } from '@angular/router'

export const ROOMS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/rooms/rooms-list/rooms-list').then(m => m.RoomsList),
  },
  // {
  //   path: 'details/:id',
  //   loadComponent: () => import('@features/rooms/rooms-details/rooms-details').then(m => m.RoomsDetails),
  // },
  {
    path: 'create',
    loadComponent: () => import('@features/rooms/create-room/create-room').then(m => m.CreateRoom),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('@features/rooms/edit-room/edit-room').then(m => m.EditRoom),
  },
  {
      path: '',
      redirectTo: 'rooms',
      pathMatch: 'full'
  }
]
