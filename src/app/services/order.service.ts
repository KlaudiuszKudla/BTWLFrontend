import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../common/order';
import { map } from 'rxjs/operators'
import { UserAuthService } from './user-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private baseUrl = environment.apiUrl + '/app/order'
 
  constructor(private httpClient: HttpClient,
              private authService: UserAuthService) { }

              /* wszystkie ordery
  getOrders(): Observable<Order[]> {

    return this.httpClient.get<Order[]>(this.baseUrl);
  }
*/
getOrdersForSender(email: string): Observable<Order[]> {
  const orderUrl = `${this.baseUrl}/sender/${email}`;
  return this.httpClient.get<Order[]>(orderUrl);
}

getOrdersForRecipient(email: string): Observable<Order[]> {
  const orderUrl = `${this.baseUrl}/recipient/${email}`;
  return this.httpClient.get<Order[]>(orderUrl);
}

  getOrderById(theOrderId: string): Observable<Order>{

    const orderUrl = `${this.baseUrl}/${theOrderId}`;
    return this.httpClient.get<Order>(orderUrl)
  }
  getOrderByTrackingCode(theOrderTrackingCode: string): Observable<Order>{

    const orderUrl = `${this.baseUrl}/tracking/${theOrderTrackingCode}`;
    return this.httpClient.get<Order>(orderUrl)
  }

  getFreeOrders(): Observable<Order[]>{
    const OrderFreeUrl = `${this.baseUrl}/free`;
    return this.httpClient.get<Order[]>(OrderFreeUrl)
  }

  pickUpOrder(order: Order): Observable<any> {
    
    const pickUpOrderUrl = `${this.baseUrl}/take`;
    return this.httpClient.patch<Order>(pickUpOrderUrl, order);
  }


}


