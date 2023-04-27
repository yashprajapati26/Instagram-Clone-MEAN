import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent {
  otpForm = new FormGroup({
    otp: new FormControl("", Validators.required),
  })
  submitted: boolean = false
  msg: any;
  user: any;

  constructor(private authservice: AuthService, private router: Router, private ngxLoader: NgxUiLoaderService) {
  }

  submit(data: any) {
    this.submitted = true
    let mydata = {
      'otp': data['otp'],
      'userId': localStorage.getItem('userId')
    }
    if (this.otpForm.valid) {
      this.ngxLoader.start();
      this.authservice.doOtpVerify(mydata).subscribe((res: any) => {
        console.log(res)
        this.router.navigate(['login'])
      },(err: any) => {
          console.log(err)
          this.msg = err.error.msg
      })
    }
    this.ngxLoader.stop();
  }
}
