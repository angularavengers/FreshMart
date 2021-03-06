import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList: any[] = [];

  get totalCost(): number {
    return this.cartList.length && this.cartList.reduce((total, v) => {
      return total + (v.itemQuantity * v.price);
    }, 0)
  };

  constructor(private cartService: CartService) {
    this.cartService.cartObservable.subscribe((data) => {
      if (data) {
        this.updateCartList(data);
      }
    });
    // this.cartList = [{
    //   titlaText: 'Onion',
    //   image: '../assets/vegitables/8-onion-png-image-thumb.png',
    //   price: 100,
    //   id: 10, 
    //   unit: '1 kg',
    //   productDetails: 'This is test product'
    // }];
  }

  ngOnInit() {
  }

  private updateCartList(cartList) {
    this.cartList = Object.keys(cartList).map((v) => {
      return cartList[v];
    });
  }

}
