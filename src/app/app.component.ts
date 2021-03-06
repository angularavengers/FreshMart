import { Component, OnInit } from '@angular/core';
import { sideBarPath, SideBar } from './const/side-nav';
import { CartService } from './services/cart.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;
  sidenavWidth = 4;
  cartCount = 0;
  sideBarPath: SideBar[];
  userData: IUser;
  isLogin: boolean;

  constructor(private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router,
    private _dialog: MatDialog) {
    this._cartService.cartObservable.subscribe((cartData) => {
      this.cartCount = cartData && Object.keys(cartData).length;
    });
    this._authService.authObservable.subscribe((data) => {
      if (data && this._authService.isLogin) {
        this.userData = this._authService.getUserData();
        this.isLogin = true;
      } else {
        this.userData = null;
        this.isLogin = false;
      }
    });
  }

  ngOnInit(): void {
    this.sideBarPath = sideBarPath;
  }

  openLoginDialog(isFromCart?: boolean) {
    const dialogRef = this._dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (isFromCart) {
        this.openCart();
      }
    });
  }

  openCart() {
    if (!this._authService.isLogin) {
      this.openLoginDialog(true);
    } else {
      this._router.navigate(['cart']);
    }
  }

  increase() {
    this.sidenavWidth = 15;
  }
  decrease(sidenav?) {
    if (sidenav) {
      sidenav.close()
    }
    this.sidenavWidth = 4;
  }
  toggleMoreButton(item: SideBar) {
    item.isMore = !item.isMore;
  }
  logout() {
    this._authService.logout();
  }

}
