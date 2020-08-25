import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class Authguard implements CanActivate {
    constructor(private _authService: AuthService,
        private _router: Router) {
    }
    canActivate() {
        if (!this._authService.isLogin) {
            this._router.navigate(['home']);
            return false;
        }
        return true;
    }
}
