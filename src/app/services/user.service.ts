import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + '/app/user';

  constructor(private httpClient: HttpClient) { }

  public login(user: User){
    return this.httpClient.post<User>(this.baseUrl + "/auth", user);
}
  public signIn(user: User){
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  public getUserByEmail(email: string){
    const UserUrl = `${this.baseUrl}/email/${email}`;
    return this.httpClient.get<User>(UserUrl);
  }
}
