import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-qty-plus-minus',
  templateUrl: './qty-plus-minus.component.html',
  styleUrls: ['./qty-plus-minus.component.scss']
})
export class QtyPlusMinusComponent implements OnInit {
  @Input() item: any;
  get cartList() {
    return this.cartService.getCartList();
  }

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addItemToCart(item) {
    this.cartService.addItemToCart(item);
  }

  removeItemFromCart(item) {
    this.cartService.removeItemFromCart(item);
  }

}
