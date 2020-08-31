import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'app/services/cart.service';
import { PageSpinnerService } from 'app/services/page-spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.scss']
})
export class PageSpinnerComponent implements OnInit {
  isLoading: boolean;
  private subscription: Subscription;

  constructor(private _pageSpinnerService: PageSpinnerService) {

  }

  ngOnInit() {
    this.subscription = this._pageSpinnerService.loaderState.subscribe(value => {
      this.isLoading = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
