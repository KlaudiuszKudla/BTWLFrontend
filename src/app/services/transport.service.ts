import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Order } from '../common/order';
import { Observable } from 'rxjs';
import { Transport } from '../common/transport';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private transportUrl = environment.apiUrl + '/app/transport';

  constructor(private httpClient: HttpClient,
              private authService: UserAuthService) { }

  takeOrder(transport: Transport): Observable<any>{
         let token = this.authService.getToken();
    console.log(token);
    let head_obj = new HttpHeaders().set(
      'Authorization', 'Bearer ' + token
    ); 
    
    console.log(head_obj);  
    return this.httpClient.post<Transport>(this.transportUrl, transport,{headers:head_obj});
  }

  getTransportsByTransporterId(theTransporterId: string): Observable<Transport[]>{
    const orderUrl = `${this.transportUrl}/user/${theTransporterId}`;
    return this.httpClient.get<Transport[]>(orderUrl)
  }

  leaveTransport(transportId: string): Observable<any> {
    const leaveTransportUrl = `${this.transportUrl}/drop/${transportId}`;
    return this.httpClient.patch<Transport>(leaveTransportUrl,null)
  }

}
