import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { UserSessionService } from '../services/userSession.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor(
    private dataService: ApiService, 
    public toastr: ToastrService,
    private userSession: UserSessionService
  ) {}

  isLoggedIn$ = this.loggedIn.asObservable();

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: any) {
    this.dataService.userLogin(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        const user = {
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName
        };
        this.userSession.setUser(user);
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

  register(registerForm: any) {
    this.dataService.registerUser(registerForm).subscribe({
      next: (response) => {
        window.location.assign('/login?registered=true');
      },
      error: (response) => {
        this.toastr.error(response.error != null ? response.error.message : response.message, 'Błąd', {
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
    if(token) {
      this.loggedIn.next(true);
      this.dataService.tokenValid().subscribe({
        next: (response) => {
          // SUCCESS: Token is valid
        },
        error: (err) => {
          this.loggedIn.next(false);
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          window.location.assign('/home?logout=true');
        }
      });
    }

  }

}