import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router){}

  ngOnInit(): void {

    this.userAuthService.clear();
    
    this.loginFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        email: new FormControl(''),
        password: new FormControl('')
      })
    })
  }

  get userEmail() {return this.loginFormGroup.get('user.email');}
  get userPassword() {return this.loginFormGroup.get('user.password');}

  onSubmit(){
    let user = new User();

    user = this.loginFormGroup.controls['user'].value;

    console.log(user);
    this.userAuthService.setUserEmail(user?.email || '');
    this.userService.login(user).subscribe(
      (response: any) =>{
        console.log(response);
        console.log(response.token)
        this.userAuthService.setToken(response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
