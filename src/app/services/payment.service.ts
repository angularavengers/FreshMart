import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

/* using widnow ref we will call payment vendor  */
function _window(): any {
    // return the global native browser window object
    return window;
}
@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    public baseURL = 'http://localhost:5000';
    public isLogin: boolean;
    constructor(private _http: HttpService,
        private _router: Router) { }

    get getWindow(): any {
        return _window();
    }

    createOrder(data: any): Observable<any> {
        return this._http.post(`${this.baseURL}/payments/createOrder`, data);
    }

}
