import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order?: Order;


  constructor(private orderService: OrderService,
              private route: ActivatedRoute){
  }

  ngOnInit(): void {
   
      this.handleProductDetails();
      console.log( this.order?.orderSamples?.[this.order?.orderSamples!.length-1]?.geoPosition?.latitude );
  }
  handleProductDetails() {
    const theOrderId: string =this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderById(theOrderId).subscribe(
      data => {
        this.order = data;
      }
    )
    }
}
