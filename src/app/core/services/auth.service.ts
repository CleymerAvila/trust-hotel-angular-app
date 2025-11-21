import { CustomPayload } from './../models/custompayload.model';
import { jwtDecode } from 'jwt-decode';
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User} from '../models/user.model';



@Injectable({
  providedIn : 'root'
})
export class AuthService {
  private currentUserSubject : BehaviorSubject<User | null>;
  public currentUser: Observable<User | null >;

  constructor(private apiService: ApiService, private storage: StorageService, private router: Router){
    const storedUser = localStorage.getItem('current_user');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any>{
    return this.apiService.post('/auth/login', {email, password})
    .pipe(
      tap((response: any) => {
        this.storage.setToken(response.token);
        const user = this.saveUserFromToken(response.token)
        this.currentUserSubject.next(user)
      })
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    if(confirm('Estas seguro que quieres cerrar la sesion')){
      this.storage.clear();
      this.currentUserSubject.next(null);
      this.router.navigate(['/login'])
    }
  }

  isLoggeIn(): boolean {
    return this.storage.getToken() !== null;
  }

  saveUserFromToken(token: string): User | null{
      const payload = jwtDecode<CustomPayload>(token);

      const user: User = {
        username : payload.user,
        email: payload.sub,
        role: payload.role
      }
      console.log(user)
      this.storage.setUser(user);
      return user;
  }
}
