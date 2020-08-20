import { Component } from '@angular/core';
import { sideBarPath, SideBar } from './const/side-nav';

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
  badgeCount = 5;
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
 
   increase() {
    this.sidenavWidth = 15;
  }
  decrease(sidenav?) {
    if(sidenav){
      sidenav.close()
    }
    this.sidenavWidth = 4;
  }

}
