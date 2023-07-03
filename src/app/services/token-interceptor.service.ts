import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { from, lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private authService: UserAuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
 
    // Only add an access token for secured endpoints
    const theEndpoint = environment.apiUrl + '/app/user/auth';
    const openBlackBoxEndpoint = environment.apiUrl + '/app/order/take';
    const makeOrderEndpoint = environment.apiUrl + '/app/order';
    const freeBlackBoxesEndpoint = environment.apiUrl + '/app/blackbox/free';
    const theUserLogINEndpoint = environment.apiUrl + '/app/user';
    const findOrdersEndpoint = environment.apiUrl + '/app/order/tracking/3b5e8a16-28bf-4419-ab56-bece07fe44bf';

    const findOrderEndpoint = [findOrdersEndpoint, makeOrderEndpoint];
    
    const unsecuredEndpoints = [theEndpoint,openBlackBoxEndpoint,findOrdersEndpoint,
                               freeBlackBoxesEndpoint, makeOrderEndpoint];

    if (request.method === 'POST') {
      unsecuredEndpoints.push(theUserLogINEndpoint);
    }

    if (!unsecuredEndpoints.some(url => request.urlWithParams.endsWith(url))) {

    // get access token
    const accessToken = this.authService.getToken();

    // clone the request and add new header with access token
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  }
  return await lastValueFrom(next.handle(request));
} 

/* private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

  // Only add an access token for secured endpoints
  const theEndpoint = environment.apiUrl + '/app/transport/{transportUserId}';
  const openBlackBoxEndpoint = environment.apiUrl + 'transport/drop/{id}';
  const theUserLogINEndpoint = environment.apiUrl + '/app/transport';
  
  const securedEndpoints = [theEndpoint,openBlackBoxEndpoint];

  if (request.method != 'POST') {
    securedEndpoints.push(theUserLogINEndpoint);
  }

  if (securedEndpoints.some(url => request.urlWithParams.endsWith(url))) {

  // get access token
  const accessToken = this.authService.getToken();

  // clone the request and add new header with access token
  request = request.clone({
    setHeaders: {
      Authorization: 'Bearer ' + accessToken
    }
  });
} */

}
