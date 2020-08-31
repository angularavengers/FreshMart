import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageSpinnerService } from './page-spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient,
    private spinner: PageSpinnerService) { }

  post(url: string, data: any, skipSpinner?: boolean): Observable<any> {
    if (!skipSpinner) {
      this.spinner.start();
    }
    return this._http.post(url, data).pipe(finalize(() => {
      if (!skipSpinner) {
        this.spinner.stop();
      }
    }));
  }
  get(url: string, skipSpinner?: boolean): Observable<any> {
    if (!skipSpinner) {
      this.spinner.start();
    }
    return this._http.get(url).pipe(finalize(() => {
      if (!skipSpinner) {
        this.spinner.stop();
      }
    }));
  }

}
