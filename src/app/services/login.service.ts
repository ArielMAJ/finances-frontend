import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterModel } from '../Models/RegisterModel';
import { LoginModel } from '../Models/LoginModel';
import { LoginResponseModel } from '../Models/LoginResponseModel';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment.endPoint;

  userLogin(payload: LoginModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(`${this.baseUrl}/auth/login`, payload);
  }

  userRegister(payload: RegisterModel): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/user/signup`, payload);
  }

  findUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}/user/selecionaruser/${id}`
    );
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/user/me`, userData);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/user/me`, {
      responseType: 'text',
    });
  }
}
