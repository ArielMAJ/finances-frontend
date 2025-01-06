import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private readonly apiUrl = `${environment.endPoint}/`;

  constructor(private httpClient: HttpClient) {}

  healthCheck(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'health');
  }
}
