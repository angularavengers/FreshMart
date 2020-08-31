import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { IUser } from 'app/models/user.model';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userData: IUser;
  private _authSubject: BehaviorSubject<IUser> = new BehaviorSubject(null);
  public isLogin: boolean;
  public authObservable = this._authSubject.asObservable();
  public baseURL = 'http://localhost:3000';
  
  constructor(private _http: HttpService,
    private _router: Router) {
    this.checkSession();
  }

  public checkSession() {
    const FreshMartUserData = localStorage.getItem('FreshMartUserData');
    if (FreshMartUserData) {
      this.setUserData(JSON.parse(FreshMartUserData));
      this.isLogin = true;
    }
  }

  logout() {
    localStorage.removeItem('FreshMartUserData');
    localStorage.removeItem('FreshMartCart');
    this.isLogin = false;
    this.setUserData(null);
    this._router.navigate(['/home']);
    
  }

  checkUser(data: any): Observable<any> {
    return this._http.post(`api/users/login`, data);
  }

  validateUser(data: any): Observable<any> {
    return this._http.post(`api/users/verifyUser`, data);
  }

  signUpUser(data: any): Observable<any> {
    return this._http.post(`api/users/signUp`, data);
  }

  getAllUsers(): Observable<any> {
    return this._http.get('api/users/findAll');
  }

  public setUserData(data: IUser) {
    this._userData = data;
    this._authSubject.next(data);
    if (data) {
      localStorage.setItem('FreshMartUserData', JSON.stringify(this._userData));
    }
  }

  public getUserData(): IUser {
    return this._userData;
  }

}
