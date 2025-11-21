import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RoomService } from '../room.service';
import { Room } from '../room.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-rooms-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './rooms-list.html',
})
export class RoomsList {
  isOpen = signal(false)
  private roomService = inject(RoomService);

  rooms = signal<Room[]>([]);

  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms(): void {
    this.loading.set(true);
    this.error.set(null);

    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms.set(rooms);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las habitaciones.');
        this.loading.set(false);
        console.log(err, 'error loading rooms');
      }
    })
  }

  deleteRoom(roomId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      this.roomService.deleteRoomBy(roomId).subscribe({
        next: () => {
          alert('Habitación eliminada exitosamente.');
          this.loadRooms();
        },
        error: (err) => {
          alert('Error al eliminar la habitación asegurese que la habitacion se encuentre libre.');
          console.log(err, 'error deleting room');
        }
      });
    }
  }

  toggleDropdown(){
    this.isOpen.set(!this.isOpen())
  }
}
