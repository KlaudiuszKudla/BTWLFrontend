import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Address } from 'src/app/common/address';
import { BlackBox } from 'src/app/common/black-box';
import { Order } from 'src/app/common/order';
import { User } from 'src/app/common/user';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  blackBoxes: BlackBox[] = [];
  selectedBlackBox!: BlackBox;
  user?: User;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userAuthService: UserAuthService,
              private userService: UserService,
              private checkoutService: CheckoutService){
              }

ngOnInit(): void {
  if (this.userAuthService.isLoggedIn()) {
    this.getUserAndBlackBoxes();
  } else {
    this.getBlackBoxes();
  }
}
              private getUserAndBlackBoxes(): void {
                forkJoin({
                  user: this.getUser(),
                  blackBoxes: this.getFreeBlackBoxes()
                }).subscribe(response => {
                  this.user = response.user;
                  this.blackBoxes = response.blackBoxes;
                  this.createForm();
                });
              }
              private getBlackBoxes(): void {
                forkJoin({
                  blackBoxes: this.getFreeBlackBoxes()
                }).subscribe(response => {
                  this.blackBoxes = response.blackBoxes;
                  this.createForm();
                });
              }

    createForm(){

      console.log(this.user)
      console.log(this.blackBoxes)
    this.checkoutFormGroup = this.formBuilder.group({
      blackBox: this.formBuilder.group({
        id: new FormControl('')
      }),
      sender: this.formBuilder.group({
        firstName: new FormControl(this.user?.firstName,
                            [Validators.required,
                            Validators.minLength(2),
                            CustomValidators.notOnlyWhitespace]),

        lastName: new FormControl(this.user?.lastName,
                            [Validators.required,
                            Validators.minLength(2),
                            CustomValidators.notOnlyWhitespace]),
        email: new FormControl(this.user?.email,
                            [Validators.required,
                             Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

        phoneNumber: new FormControl(this.user?.phone, [Validators.required, Validators.pattern('[0-9]{9}')])
      }),
      recipient: this.formBuilder.group({
        firstName: new FormControl('',
                            [Validators.required,
                            Validators.minLength(2),
                            CustomValidators.notOnlyWhitespace]),

        lastName: new FormControl('',
                            [Validators.required,
                            Validators.minLength(2),
                            CustomValidators.notOnlyWhitespace]),

        email: new FormControl('',
                            [Validators.required,
                             Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

        phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')])
      }),

      deliveryAddress: this.formBuilder.group({
        street: new FormControl('',
                               [Validators.required,
                               Validators.minLength(2),
                               CustomValidators.notOnlyWhitespace]),
        houseNumber: new FormControl('',
                              [Validators.required,
                               CustomValidators.notOnlyWhitespace]),


        city: new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               CustomValidators.notOnlyWhitespace]),

        zipCode: new FormControl('',
                              [Validators.required,
                              Validators.pattern('[0-9]{2}-[0-9]{3}')]),
        description: new FormControl('',
                              [Validators.maxLength(50)])

      }),
      pickupAddress: this.formBuilder.group({
        street: new FormControl(this.user?.address?.street,
                               [Validators.required,
                               Validators.minLength(2),
                               CustomValidators.notOnlyWhitespace]),
        houseNumber: new FormControl(this.user?.address?.houseNumber,
                              [Validators.required,
                               CustomValidators.notOnlyWhitespace]),

        city: new FormControl(this.user?.address?.city,
                              [Validators.required,
                               Validators.minLength(2),
                               CustomValidators.notOnlyWhitespace]),

        zipCode: new FormControl(this.user?.address?.zipCode,
                              [Validators.required,
                              Validators.pattern('[0-9]{2}-[0-9]{3}')]),
        description: new FormControl(this.user?.address?.description,
                              [Validators.maxLength(50)])
    })
  });
}

getUser(): Observable<User> {
  let userEmail: string = this.userAuthService.getUserEmail();
  return this.userService.getUserByEmail(userEmail);
}

getFreeBlackBoxes(): Observable<BlackBox[]> {
  return this.checkoutService.getFreeBlackBoxes();
}

selectBlackBox(blackBox: BlackBox) {
  this.selectedBlackBox = blackBox;
}

isLoggedIn(){
  return this.userAuthService.isLoggedIn();
}


  get id() { return this.checkoutFormGroup.get('blackBox.id'); }


  get senderFirstName() { return this.checkoutFormGroup.get('sender.firstName'); }
  get senderLastName() { return this.checkoutFormGroup.get('sender.lastName'); }
  get senderEmail() { return this.checkoutFormGroup.get('sender.email'); }
  get senderPhoneNumber() { return this.checkoutFormGroup.get('sender.phoneNumber'); }



  get recipientFirstName() { return this.checkoutFormGroup.get('recipient.firstName'); }
  get recipientLastName() { return this.checkoutFormGroup.get('recipient.lastName'); }
  get recipientEmail() { return this.checkoutFormGroup.get('recipient.email'); }
  get recipientPhoneNumber() { return this.checkoutFormGroup.get('recipient.phoneNumber'); }

  get deliveryAddressStreet() { return this.checkoutFormGroup.get('deliveryAddress.street'); }
  get deliveryAddressHouseNumber() { return this.checkoutFormGroup.get('deliveryAddress.houseNumber'); }
  get deliveryAddressDescription() { return this.checkoutFormGroup.get('deliveryAddress.description'); }
  get deliveryAddressCity() { return this.checkoutFormGroup.get('deliveryAddress.city'); }
  get deliveryAddressZipCode() { return this.checkoutFormGroup.get('deliveryAddress.zipCode'); }

  get pickupAddressStreet() { return this.checkoutFormGroup.get('pickupAddress.street'); }
  get pickupAddressHouseNumber() { return this.checkoutFormGroup.get('pickupAddress.houseNumber'); }
  get pickupAddressDescription() { return this.checkoutFormGroup.get('pickupAddress.description'); }
  get pickupAddressCity() { return this.checkoutFormGroup.get('pickupAddress.city'); }
  get pickupAddressZipCode() { return this.checkoutFormGroup.get('pickupAddress.zipCode'); }


  onSubmit() {
    console.log("Handling the submit button");

  /*  if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    } */

    let order = new Order();

    order.blackBox = this.checkoutFormGroup.controls['blackBox'].value;
    order.sender = this.checkoutFormGroup.controls['sender'].value;
    order.recipient = this.checkoutFormGroup.controls['recipient'].value;
   // order.startingAddress = this.checkoutFormGroup.controls['pickupAddress'].value;

   console.log(this.selectedBlackBox?.currentPickupAddress?.city);
   console.log(this.selectedBlackBox?.currentPickupAddress);
   console.log(order.startingAddress)
   console.log(order.blackBox)

    // order.startingAddress = this.selectedBlackBox?.currentPickupAddress;
    if (!order.startingAddress) {
      order.startingAddress = {}; // Inicjalizacja jako pusty obiekt, jeśli jest undefined
    }

    order.startingAddress!.city = this.selectedBlackBox?.currentPickupAddress?.city ?? order.startingAddress!.city;
    order.startingAddress!.street = this.selectedBlackBox?.currentPickupAddress?.street;
    order.startingAddress!.houseNumber = this.selectedBlackBox?.currentPickupAddress?.houseNumber;
    order.startingAddress!.zipCode = this.selectedBlackBox?.currentPickupAddress?.zipCode;
    order.startingAddress!.description = this.selectedBlackBox?.currentPickupAddress?.street;



    order.targetAddress = this.checkoutFormGroup.controls['deliveryAddress'].value;

    console.log(order);
    console.log(order.sender);
    console.log(order.recipient);
    console.log("stargin addres poniżej")
    console.log(order.startingAddress);
    console.log(order.targetAddress);
    console.log(order.blackBox);
    console.log(order)

    this.checkoutService.placeOrder(order).subscribe(
      {
        next: response => {
          alert(`Udało ci się złożyć zamówienie!`);
          this.router.navigate(['/']);
        },
      error: error => {
        alert(`Wystąpił błąd podczas składania zamówienia: ${error.error}`);
      }
      }
    );

  }
}
