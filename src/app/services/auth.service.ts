import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin: boolean;
  private _userData: any;

  constructor(private _http: HttpClient) { }

  checkUser(data: any): Observable<any> {
    return this._http.post('api/users/login', data);
  }

  validateUser(data: any): Observable<any> {
    return this._http.post('api/users/verifyUser', data);
  }

  signUpUser(data: any): Observable<any> {
    return this._http.post('api/users/signUp', data);
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
