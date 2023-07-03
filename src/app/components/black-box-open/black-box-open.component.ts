import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-black-box-open',
  templateUrl: './black-box-open.component.html',
  styleUrls: ['./black-box-open.component.css']
})
export class BlackBoxOpenComponent implements OnInit{

  blackBoxFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService){}

  ngOnInit(): void {
      this.blackBoxFormGroup = this.formBuilder.group({
        order: this.formBuilder.group({
          id: new FormControl(''),
          openCode: new FormControl('')
        })
      })
  }

  onSubmit(){
    let order = new Order();
    order = this.blackBoxFormGroup.controls['order'].value;
    console.log(order)

   this.orderService.pickUpOrder(order).subscribe(
    {
      next: response => {
        alert(`Paczka została otworzona`)
      },
      error: error => {
        alert(`Wystąpił błąd podczas opuszczania transportu: ${error.error}`);
      }
    }
  );

  }

  confirmSubmit() {
    const confirmed = window.confirm('Czy na pewno chcesz otworzyć pojemnik?');
    if (confirmed) {
      this.onSubmit();
    }
  }

}
