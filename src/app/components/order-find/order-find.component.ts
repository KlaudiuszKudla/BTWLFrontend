import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-find',
  templateUrl: './order-find.component.html',
  styleUrls: ['./order-find.component.css']
})
export class OrderFindComponent implements OnInit {

  blackBoxFormGroup!: FormGroup;
  order?: Order;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private router: Router){}

  ngOnInit(): void {
      this.blackBoxFormGroup = this.formBuilder.group({
        order: this.formBuilder.group({
          trackingNumber: new FormControl(''),
        })
      })
  }

  onSubmit(){
    let orderTrackingNumber = this.blackBoxFormGroup.get('order.trackingNumber')?.value;
    console.log(orderTrackingNumber);

    this.orderService.getOrderByTrackingCode(orderTrackingNumber).subscribe(
      data => {
        this.order = data;
        // this.router.navigate(['/order', this.order?.id]);
      }
    ) 
    //this.router.navigate(['/order', this.order?.id]);
    // this.router.navigate(['/order/tracking', orderTrackingNumber, 'map']);
  
  }

}
