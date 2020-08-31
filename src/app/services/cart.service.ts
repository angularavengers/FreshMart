import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartList: any = {};
  private _cartSubject: Subject<any> = new BehaviorSubject(null);
  private _itemAddedRemovedSubject: Subject<any> = new BehaviorSubject(null);
  public cartObservable: Observable<any> = this._cartSubject.asObservable();

  constructor(private _http: HttpService,
    private _authService: AuthService) {
    this._authService.authObservable.subscribe(data => {
      let cart = localStorage.getItem('FreshMartCart');
      if (cart) {
        cart = JSON.parse(cart);
        this._cartList = cart;
      } else {
        this._cartList = {}
      }
      this._cartSubject.next(this._cartList);
    });
    this._itemAddedRemovedSubject.pipe(debounceTime(2000),
      switchMap(data => {
        if (data && this._authService.getUserData()) {
          const item = data.item;
          if (data.isAdded) {
            if (this._authService.getUserData().phoneNumber) {
              const request = {
                phoneNumber: this._authService.getUserData().phoneNumber,
                productItemId: item._id,
                itemQuantity: this._cartList[item._id].itemQuantity
              };
              return this._http.post('api/users/addItemToCart', request, true);
            }
          } else {
            if (this._authService.getUserData().phoneNumber) {
              let obs;
              if (this._cartList[item._id]) {
                const request = {
                  phoneNumber: this._authService.getUserData().phoneNumber,
                  productItemId: item._id,
                  itemQuantity: this._cartList[item._id].itemQuantity
                };
                obs = this._http.post('api/users/addItemToCart', request, true);
              } else {
                const request = {
                  phoneNumber: this._authService.getUserData().phoneNumber,
                  productItemId: item._id
                };
                obs = this._http.post('api/users/removeItemFromCard', request, true)
              }
              return obs;
            }
          }
        }
        return of(null);

      })).subscribe((data) => {
        console.log(data);
      });
  }

  public addItemToCart(item, qty?:number) {
    if (!qty && this._cartList[item._id] && this._cartList[item._id].itemQuantity) {
      this._cartList[item._id].itemQuantity = this._cartList[item._id].itemQuantity + 1;
    } else {
      this._cartList[item._id] = { ...item, itemQuantity: qty ? qty : 1};
    }
    this._cartList = { ...this._cartList };
    this._itemAddedRemovedSubject.next({
      isAdded: true,
      item: item
    });
    localStorage.setItem('FreshMartCart', JSON.stringify(this._cartList));
    this._cartSubject.next(this._cartList);
  }

  public removeItemFromCart(item) {
    if (this._cartList[item._id]) {
      if (this._cartList[item._id].itemQuantity > 1) {
        this._cartList[item._id].itemQuantity = this._cartList[item._id].itemQuantity - 1;
      } else {
        delete this._cartList[item._id];
      }
    }
    this._itemAddedRemovedSubject.next({
      isAdded: false,
      item: item
    });
    localStorage.setItem('FreshMartCart', JSON.stringify(this._cartList));
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
