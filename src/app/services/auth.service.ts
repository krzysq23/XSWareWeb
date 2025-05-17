import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor(
    private dataService: ApiService, 
    public toastr: ToastrService
  ) {}

  isLoggedIn$ = this.loggedIn.asObservable();

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: { email: string; password: string }) {
    this.dataService.userLogin(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.name);
        this.loggedIn.next(true);
        window.location.assign('/profile');
      },
      error: (err) => {
        this.toastr.error(err.error != null ? err.error : err.message, 'Błąd', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.assign('/home?logout=true');
  }

  checkAuth(): void {
    console.log("checkAuth");
    const token = localStorage.getItem('token');
    this.loggedIn.next(!!token);
  }

}