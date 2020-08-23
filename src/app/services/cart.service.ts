import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartList: any = {};
  private cartSubject: Subject<any> = new Subject();
  public cartObservable: Observable<any> = this.cartSubject.asObservable();

  constructor() { }

  public addItemToCart(item) {
    if (this.cartList[item.id]) {
      this.cartList[item.id].qty = this.cartList[item.id].qty + 1;
    } else {
      this.cartList[item.id] = {...item, qty: 1};
    }
    this.cartList = {...this.cartList}
    this.cartSubject.next(this.cartList);
  }

  public removeItemFromCart(item) {
    if (this.cartList[item.id]) {
      if (this.cartList[item.id].qty > 1) {
        this.cartList[item.id].qty = this.cartList[item.id].qty - 1;
      } else {
        delete this.cartList[item.id];
      }
    }
    this.cartSubject.next(this.cartList);
  }

  public getCartList() {
    // const cartList = [];
    // Object.keys(this.cartList).forEach((v) => {
    //   cartList.push(this.cartList[v]);
    // });
    return this.cartList;
  }
}
