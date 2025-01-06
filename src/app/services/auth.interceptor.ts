import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (
      request.url.endsWith('/auth/login') ||
      request.url.endsWith('/user/signup') ||
      request.url.endsWith('/health')
    ) {
      return next.handle(request).pipe(
        retry(1),
        timeout(5000),
        catchError((error) => {
          if (error.name === 'TimeoutError' || error.statusText === 'Unknown Error') {
            this.toastr.error(
              'Tente novamente em alguns minutos.',
              'Servidor indisponível'
            );
          }

          return throwError(() => error);
        })
      );
    }

    const expiresAt = parseInt(localStorage.getItem('expiresAt') || '0', 10);
    const currentTime = new Date().getTime();

    if (currentTime > expiresAt) {
      this.toastr.error('Faça login novamente.', 'Sessão expirada');
      this.router.navigate(['/login']);
    }

    if (token && token !== '') {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
        withCredentials: false,
      });
    }
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error('Faça login novamente.', 'Sessão expirada');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
