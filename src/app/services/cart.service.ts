import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartList: any = {};
  private _cartSubject: Subject<any> = new Subject();
  public cartObservable: Observable<any> = this._cartSubject.asObservable();

  constructor() { }

  public addItemToCart(item) {
    if (this._cartList[item.id]) {
      this._cartList[item.id].qty = this._cartList[item.id].qty + 1;
    } else {
      this._cartList[item.id] = {...item, qty: 1};
    }
    this._cartList = {...this._cartList}
    this._cartSubject.next(this._cartList);
  }

  public removeItemFromCart(item) {
    if (this._cartList[item.id]) {
      if (this._cartList[item.id].qty > 1) {
        this._cartList[item.id].qty = this._cartList[item.id].qty - 1;
      } else {
        delete this._cartList[item.id];
      }
    }
    this._cartSubject.next(this._cartList);
  }

  public getCartList() {
    // const _cartList = [];
    // Object.keys(this._cartList).forEach((v) => {
    //   _cartList.push(this._cartList[v]);
    // });
    return this._cartList;
  }
}
