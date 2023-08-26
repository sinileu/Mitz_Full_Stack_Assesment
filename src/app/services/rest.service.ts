import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  fetchProductData(): Observable<any> {
    return this.http.get(this.baseUrl +'/api/products')
    .pipe(
      catchError(this.errorHandler)
    );;
  }

  fetchCustomerData(): Observable<any> {
    return this.http.get(this.baseUrl +'/api/customer_preference')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  fetchOrdersData(): Observable<any> {
    return this.http.get(this.baseUrl +'/api/orders')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  fetchPopularProduct(): Observable<any> {
    return this.http.get(this.baseUrl +'/api/most-popular-product')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  fetchMostOrderCustomer(): Observable<any> {
    return this.http.get(this.baseUrl +'/api/most-order-customer')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  fetchInexpensiveCustomer(): Observable<any> {
    return this.http.get(this.baseUrl +'/api/inexpensive-customer')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
