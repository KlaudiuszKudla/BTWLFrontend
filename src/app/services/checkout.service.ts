import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../common/order';
import { BlackBox } from '../common/black-box';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private orderUrl = environment.apiUrl + '/app/order';
  private blackBoxUrl = environment.apiUrl + '/app/blackbox';



  constructor(private httpClient: HttpClient) { }

  placeOrder(order: Order): Observable<any> {
    return this.httpClient.post<Order>(this.orderUrl, order);
  }

  getFreeBlackBoxes():Observable<BlackBox[]> {
    const BlackBoxFreeUrl = `${this.blackBoxUrl}/free`;
    return this.httpClient.get<BlackBox[]>(BlackBoxFreeUrl)
  }
}
