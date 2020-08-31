import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CartService } from 'app/services/cart.service';
import { HttpService } from 'app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;

  get cartList() {
    return this.cartService.getCartList();
  }

  constructor(
    private _http: HttpService,
    private cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef) {
      this.fetchProdcts();
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
  }

  private fetchProdcts() {
    this._http.get('api/products/findAllProducts').subscribe((resp) => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.obs = this.dataSource.connect();
      this.dataSource.paginator = this.paginator;

    });
  }

  isItemInCart(item) {
    return this.cartList[item._id];
  }

  addItemToCart(item) {
    this.cartService.addItemToCart(item);
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}


