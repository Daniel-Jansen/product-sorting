import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, } from '@angular/common/http';
import { catchError, throwError, Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cachedProducts: Product[] | null = null;

  constructor(private http: HttpClient) {}

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      }),
    };
  }

  getProducts(): Observable<Product[]> {
    if (this.cachedProducts) {
      // If data is already cached, return it
      return of(this.cachedProducts);
    } else {
      let options = this.getStandardOptions();

      options.params = new HttpParams({
        fromObject: {
          format: 'json',
        },
      });

      return this.http
        .get<Product[]>('assets/test-interview-data.json', options)
        .pipe(
          catchError(this.handleError),
          tap((data: Product[]) => {
            // Cache the retrieved data
            this.cachedProducts = data;
          })
        );
    }

    // The correct route for yarle website with auth code, but it doesn't work because of CORS
    // return this.http.get<ProductInfo[]>('https://yarle.com/test-interview-data', options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(
        'There is an issue with the client or network: ',
        error.error
      );
    } else {
      console.error('Server-side error: ', error.error);
    }

    return throwError(
      () =>
        new Error('Cannot retrieve wishes from the server. Please try again')
    );
  }
}

export interface Product {
  name: string;
  country_name: string;
  currency: string;
  categories: string[];
  packages: RangeInfo;
}

export interface RangeInfo {
  max: number;
}