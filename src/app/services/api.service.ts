import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  userLogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string, name: string }>(
        this.apiUrl + environment.loginEndpoint, 
        credentials
    ).pipe(
      // catchError(this.handleError)
    );
  }

  tokenValid() {
    this.http.get(this.apiUrl + environment.loginEndpoint).subscribe(data => {
      console.log(data)
    });
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

@Injectable()
export class Apinterceptor implements HttpInterceptor {
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