import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../Models/User';
import { UserUpdateRequest } from '../Models/UserUpdateRequest';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.endPoint}/user/me`;

  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl);
  }
  updateCurrentUser(updatedUserPayload: UserUpdateRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl, updatedUserPayload);
  }
  deleteCurrentUser(): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl);
  }
}
