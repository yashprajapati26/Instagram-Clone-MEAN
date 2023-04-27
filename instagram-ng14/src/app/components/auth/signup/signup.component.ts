import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = new FormGroup({
    username: new FormControl("yashprajapati26", Validators.required),
    firstname: new FormControl("yash", Validators.required),
    lastname: new FormControl("prajapati", Validators.required),
    email: new FormControl('yash260801agmail.com', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    mobile: new FormControl('9327561065', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    password: new FormControl('Yash@123', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")])
  })
  submitted = false
  msg: any
  password:string = "password"
  visible:boolean = false

  constructor(private router: Router, private authservice: AuthService,
    private ngxLoader: NgxUiLoaderService) { }

  signup(data: object) {
    this.ngxLoader.start();
    this.submitted = true
    console.log(data)
    if (this.signupForm.valid) {
      this.authservice.doSignup(data).subscribe((res: any) => {
        let userId = res['data'].id
        localStorage.setItem('userId',userId)

        if (res) this.router.navigate(['otpVerification']);
      },
        (err: any) => {
          this.msg = err.error.msg
        });
    }
    this.ngxLoader.stop();

  }

  login() {
    this.router.navigate(['login'])
  }

  togglePassword(event: any) {
    
    if (this.password === 'password') {
      this.password = 'text';
      this.visible = true;
    } else {
      this.password = 'password';
      this.visible = false;
    }
  }

}
