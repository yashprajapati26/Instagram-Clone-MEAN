import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = new FormGroup({
    username : new FormControl("yashprajapati26", Validators.required),
    firstname : new FormControl("yash", Validators.required),
    lastname : new FormControl("prajapati", Validators.required),
    email: new FormControl('yash260801agmail.com', [Validators.required, Validators.email]),
    mobile: new FormControl('9327561065', [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    password: new FormControl('Yash@123', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")])
  })
  submitted = false
  msg:any
 
  constructor(private router:Router, private authservice:AuthService){}

  signup(data:object){
    this.submitted = true
    console.log(data)
    if(this.signupForm.valid){
      this.authservice.doSignup(data).subscribe((res:any)=>{
        console.log(res)
        if(res) this.router.navigate(['otpVerification'],res['data']);
      },
      (err:any)=>{
        this.msg = err.error.msg
      });
    }
  }

  login(){
    this.router.navigate(['login'])
  }

  togglePassword(event:any){
    console.log("called",event)
  }

}
