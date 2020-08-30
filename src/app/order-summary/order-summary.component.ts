import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/services/cart.service';
import { MatDialog } from '@angular/material';
import { AddressComponent } from 'app/address/address.component';
import { AuthService } from 'app/services/auth.service';
import { IAddress } from 'app/models/user.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  cartList: any[]
  addressList: IAddress[];
  deliveryDate: Date = new Date((new Date()).getTime() + 86400000);
  
  get totalCost(): number {
    return this.cartList.reduce((total, v) => {
      return total + (v.qty * v.price);
    }, 0)
  };

  constructor(private cartService: CartService,
    private authService: AuthService,
    private _dialog: MatDialog) {
    this.addressList = this.authService.getUserData().address;
    const cartList = this.cartService.getCartList();
    this.updateCartList(cartList);
    this.cartService.cartObservable.subscribe((data) => {
      this.updateCartList(data);
    });
  }

  ngOnInit() {
  }

  changeAddress(address: IAddress) {
    this._dialog.open(AddressComponent, {
      data: address
    });
  }

  addNewAddress() {
    this._dialog.open(AddressComponent);
  }

  private updateCartList(cartList) {
    this.cartList = Object.keys(cartList).map((v) => {
      return cartList[v];
    });
  }

}
