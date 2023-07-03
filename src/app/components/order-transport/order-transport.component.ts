import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Transport } from 'src/app/common/transport';
import { User } from 'src/app/common/user';
import { TransportService } from 'src/app/services/transport.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-transport',
  templateUrl: './order-transport.component.html',
  styleUrls: ['./order-transport.component.css']
})
export class OrderTransportComponent implements OnInit{

  
  transports: Transport [] = [];
  user!: User;

  constructor(private transportService: TransportService,
              private userAuthService: UserAuthService,
              private userService: UserService){}

  ngOnInit(): void {
    forkJoin({
      user: this.getUser()
    }).subscribe(response => {
      this.user = response.user;
      this.listTransports();
    });
  }

  getUser(): Observable<User> {
    let userID: string = this.userAuthService.getUserEmail();
    return this.userService.getUserByEmail(userID);
  }

    listTransports(){
      const userId = this.user?.id;
      if (userId)
      this.transportService.getTransportsByTransporterId(userId).subscribe(
        data => {
          this.transports = data
          console.log(this.transports)
        }
      )
    }
    
    leaveTransport(transportId?: string) {
      console.log(transportId);
      if (transportId) {
        this.transportService.leaveTransport(transportId).subscribe(
          {
            next: response => {
              alert(`Paczka została dostarczona:`);
            },
            error: error => {
              alert(`Wystąpił błąd podczas opuszczania transportu: ${error.error}`);
            }
          }
        );
      }
    }
    

}
