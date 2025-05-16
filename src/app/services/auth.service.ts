import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string, name: string }>(
        this.apiUrl + environment.loginEndpoint, 
        credentials
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.name);
        this.router.navigateByUrl('/profile');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
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