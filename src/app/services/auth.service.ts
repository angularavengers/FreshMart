import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin: boolean;
  private _userData: any;
  public baseURL = 'https://freshmart-s.herokuapp.com';
  
  constructor(private _http: HttpClient) { }
// constructor(private _http: HttpClient) { }
  
  // loginUser(phoneNumber: string) {
  //   return this._http.post<any>(`${this.baseURL}/users/login`, {phoneNumber})
  // };

  checkUser(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}/users/login`, data);
  }

  validateUser(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}/users/verifyUser`, data);
  }

  signUpUser(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}/users/signUp`, data);
  }

  getAllUsers(): Observable<any> {
    return this._http.get('api/users/findAll');
  }

  public setUserData(data) {
    this._userData = data;
  }

  public getUserData() {
    return this._userData;
  }

}
