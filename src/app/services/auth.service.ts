import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private notificationService: NotificationService
  ) {}

  isLoggedIn$ = this.loggedIn.asObservable();

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string, name: string }>(
        this.apiUrl + environment.loginEndpoint, 
        credentials
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.name);
        this.loggedIn.next(true);
        window.location.assign('/profile');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.notificationService.setShowLogoutToast(true);
    window.location.assign('/home?logout=true');
  }

  checkAuth(): void {
    console.log("checkAuth");
    const token = localStorage.getItem('token');
    this.loggedIn.next(!!token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}