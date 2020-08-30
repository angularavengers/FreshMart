import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { IUser } from 'app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userData: IUser;
  private _authSubject: BehaviorSubject<IUser> = new BehaviorSubject(null);
  public isLogin: boolean;
  public authObservable = this._authSubject.asObservable();
  public baseURL = 'http://localhost:3000';
  
  constructor(private _http: HttpClient) {
    this.checkSession();
  }

  public checkSession() {
    const userData = localStorage.getItem('UserData');
    if (userData) {
      this.setUserData(JSON.parse(userData));
      this.isLogin = true;
    }
  }
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

  public setUserData(data: IUser) {
    this._userData = data;
    data.address = [];
    data.address[0] = {
      firstName: 'Lokesh',
      lastName: 'Badgujar',
      addressLine1: 'B502',
      addressLine2: 'Aashman',
      landMark: 'Munimji',
      city: 'Pune',
      state: 'MH',
      pincode: '412101',
      isdefault: true,
      phoneNumber: '9404745225'
    };
    this._authSubject.next(data);
    localStorage.setItem('UserData', JSON.stringify(this._userData));
  }

  public getUserData(): IUser {
    return this._userData;
  }

}
