import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  setRole(role: string){
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role')
  }

  setUser(user: User): void {
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  getUser(): string | null {
    return localStorage.getItem('current_user');
  }


  clear() : void {
    localStorage.clear();
  }

}
