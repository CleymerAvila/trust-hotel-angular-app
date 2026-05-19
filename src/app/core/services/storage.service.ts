import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../models/custompayload.model';
import { User } from './../models/user.model';

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

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = jwtDecode<CustomPayload>(token);
      if (!payload.exp) {
        return true;
      }

      const isValid = payload.exp * 1000 > Date.now();
      if (!isValid) {
        this.clear();
      }
      return isValid;
    } catch (error) {
      this.clear();
      return false;
    }
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
