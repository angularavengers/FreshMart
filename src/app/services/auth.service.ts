import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin: boolean;
  public baseURL= 'http://localhost:3000'
  constructor(private _http: HttpClient) { }
  
  loginUser(phoneNumber: string) {
    return this._http.post<any>(`${this.baseURL}/users/login`, {phoneNumber})
  };

}
