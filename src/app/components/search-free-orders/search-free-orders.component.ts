import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { Transport } from 'src/app/common/transport';
import { User } from 'src/app/common/user';
import { OrderService } from 'src/app/services/order.service';
import { TransportService } from 'src/app/services/transport.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-free-orders',
  templateUrl: './search-free-orders.component.html',
  styleUrls: ['./search-free-orders.component.css']
})
export class SearchFreeOrdersComponent implements OnInit {

  orders: Order[] = [];
  user?: User;

  constructor(private orderService: OrderService,
              private transportService: TransportService,
              private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router){}

  ngOnInit(): void {
      this.getFreeOrders();
      this.getUser();
      console.log(this.user)

  }

    getFreeOrders(){
      this.orderService.getFreeOrders().subscribe(
        data => {
          this.orders = data;
        }
      )
    }

    getUser(){
      let userEmail : string;
      userEmail = this.userAuthService.getUserEmail();

      this.userService.getUserByEmail(userEmail).subscribe(
        data => {
          this.user = data;
        }
      )
    }


    createTransport(order: Order){
      console.log(this.user);

      let user2 = new User();
      user2.id = this.user?.id;

      let order2 = new Order();
      order2.id = order.id

      let transport = new Transport();
      transport.order = order2;
      transport.transportUser = user2;

      console.log(transport)

      this.transportService.takeOrder(transport).subscribe(
        {
          next: response => {
            alert(`Udało Ci się przyjąć zlecenie!`);
            this.router.navigate(['/']);
          },
          error: error => {
            alert(`Wystąpił błąd podczas przyjmowania zlecenia: ${error.error}`);
          }
        }
      );
    }


}
