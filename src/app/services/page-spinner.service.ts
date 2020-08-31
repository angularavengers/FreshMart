import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageSpinnerService {
  private loaderCount = 0;
  private showloaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderState: Observable<boolean> = this.showloaderSubject.asObservable();

  get isLoading(): boolean {
    return this.loaderCount > 0;
  }

  start() {
    if (!this.loaderCount) {
      this.showloaderSubject.next(true);
    }
    this.loaderCount++;
  }

  stop() {
    this.loaderCount = this.loaderCount ? this.loaderCount - 1 : 0;
    if (!this.loaderCount) {
      this.showloaderSubject.next(false);
    }
  }
}
