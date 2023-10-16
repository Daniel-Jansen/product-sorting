import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ProductInfo } from 'src/shared/models/productInfo';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic cGlPNVNHVWRIeUdhNzcxdzpPbEZuUEhWRnJ4NWJJN2lK'
      })
    };
  }

  getProducts() {
    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });

    return this.http.get<any>('assets/test-interview-data.json', options).pipe(catchError(this.handleError));

    // The correct route for yarle website with auth code, but it doesn't work because of CORS
    // return this.http.get<ProductInfo[]>('https://yarle.com/test-interview-data', options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('There is an issue with the client or network: ', error.error);
    } else {
      console.error('Server-side error: ', error.error);
    }


    return throwError(() => new Error('Cannot retrieve wishes from the server. Please try again'))
  }
}
