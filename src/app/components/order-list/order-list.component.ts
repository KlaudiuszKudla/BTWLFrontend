import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  email!: string;
  constructor(private orderService: OrderService, private authService: UserAuthService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const currentPath = urlSegments.join('/');
    this.getEmail();
    if (currentPath.includes('recipient')) {
      this.getOrdersForRecipient();
    } else if (currentPath.includes('sender')) {
      this.getOrdersForSender();
    }
  });
}

  getEmail(){
    this.email = this.authService.getUserEmail();
  }

    getOrdersForRecipient(){
      this.orderService.getOrdersForRecipient(this.email).subscribe(
        data => {
          this.orders = data;
        }
      )
    }

    getOrdersForSender(){
      this.orderService.getOrdersForSender(this.email).subscribe(
        data => {
          this.orders = data;
        }
      )
    }
    pickUpOrder(order: Order){
      let order2 = new Order;
      order2.id = order.id;
      order2.openCode = order.openCode;
      console.log(order2)
     this.orderService.pickUpOrder(order2).subscribe(
      {
        next: response => {
          alert(`Paczka została otwarta: ${response}`)
        }
      }
    );
  
    }
  
    confirmSubmit(order: Order) {
      const confirmed = window.confirm('Czy na pewno chcesz otworzyć pojemnik?');
      if (confirmed) {
        this.pickUpOrder(order);
      }
    }



}
