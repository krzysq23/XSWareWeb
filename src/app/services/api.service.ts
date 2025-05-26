import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHandlerFn, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  userLogin(credentials: any): Observable<any> {
    return this.http.post<{ token: string, name: string }>(
        this.apiUrl + environment.loginEndpoint, 
        credentials
    ).pipe(
      // catchError(this.handleError)
    );
  }

  registerUser(registerForm: any): Observable<any> {
    return this.http.post<{ message: string }>(
        this.apiUrl + environment.registerEndpoint, 
        registerForm
    ).pipe(
      // catchError(this.handleError)
    );
  }

  tokenValid() : Observable<any> {
    return this.http.get(this.apiUrl + environment.tokenValidEndpoint).pipe();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Wystąpił błąd:', error);
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error(`Błąd klienta: ${error.error.message}`));
    } else {
      return throwError(() => new Error(`Błąd serwera: ${error.status} ${error.message}`));
    }
  }
  
  
}

export function authUnterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  return next(req);
}
