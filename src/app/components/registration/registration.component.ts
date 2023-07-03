import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router){}

  ngOnInit(): void {
    
    this.registrationFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
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
        password: new FormControl('',
                            [Validators.required,
                            Validators.minLength(5),
                            Validators.pattern('[a-zA-Z0-9]+')]),
        confirmPassword: new FormControl('',
                                          [Validators.required,
                                          CustomValidators.passwordMissMatch]),                                                             
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]) 
      }),
      address: this.formBuilder.group({
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

  });

}
get userFirstName() { return this.registrationFormGroup.get('user.firstName'); }
get userLastName() { return this.registrationFormGroup.get('user.lastName'); }
get userEmail() { return this.registrationFormGroup.get('user.email'); }
get userPhoneNumber() { return this.registrationFormGroup.get('user.phoneNumber'); }
get userPassword() { return this.registrationFormGroup.get('user.password'); }
get userConfirmPassword() { return this.registrationFormGroup.get('user.confirmPassword'); }


get addressStreet() { return this.registrationFormGroup.get('address.street'); }
get addressHouseNumber() { return this.registrationFormGroup.get('address.houseNumber'); }
get addressDescription() { return this.registrationFormGroup.get('address.description'); }
get addressCity() { return this.registrationFormGroup.get('address.city'); }
get addressZipCode() { return this.registrationFormGroup.get('address.zipCode'); }

onSubmit() {
  console.log("Handling the submit button");

  if (this.registrationFormGroup.invalid) {
    this.registrationFormGroup.markAllAsTouched();
    return;
  }

  let user = new User();

  user.firstName = this.userFirstName?.value;
  user.lastName = this.userLastName?.value;
  user.email = this.userEmail?.value;
  user.password = this.userPassword?.value;
  user.phone = this.userPhoneNumber?.value;
  user.role = "USER";

  user.address = this.registrationFormGroup.controls['address'].value;

  console.log(user);

  this.userService.signIn(user).subscribe(
    {
      next: response => {
        alert(`Zostałeś zarejestrowany`);
        this.router.navigate(['/login']);
      }
    }
  )
}

}
