import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList: any[]
  get totalCost(): number {
    return this.cartList.reduce((total, v) => {
      return total + (v.qty * v.price);
    }, 0)
  };

  constructor(private cartService: CartService) {
    const cartList = this.cartService.getCartList();
    this.updateCartList(cartList);
    this.cartService.cartObservable.subscribe((data) => {
      this.cartList = Object.keys(data).map((v) => {
        return data[v];
      });
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
