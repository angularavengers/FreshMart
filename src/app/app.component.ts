import { Component } from '@angular/core';
import { sideBarPath, SideBar } from './const/side-nav';
import { CartService } from './services/cart.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;
  sidenavWidth = 4;
  cartCount = 0;
  sideBarPath: SideBar[] = [
    {
      title: 'Home',
      icon: 'home',
      heading: 'Home',
      path: '/home'
    },
    {
      title: 'test',
      icon: 'person_add',
      heading: 'test',
      path: '/home'
    },
    {
      title: 'test',
      icon: 'card_giftcard',
      heading: 'test',
      path: '/home'
    },
    {
      title: 'test',
      icon: 'help_outline',
      heading: 'test',
      path: '/home'
    },
    {
      title: 'test',
      icon: 'fastfood',
      heading: 'test',
      path: '/home'
    }
  ];

  public get isLogin() {
    return this.authService.isLogin;
  }

  constructor( private authService: AuthService,
    private cartServicce: CartService,
    private dialog: MatDialog) {
    this.cartServicce.carObservable.subscribe((cartData) => {
      this.cartCount = Object.keys(cartData).length;
    })
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCart() {
    if (!this.authService.isLogin) {
      this.openLoginDialog();
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

}
