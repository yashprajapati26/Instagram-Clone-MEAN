import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent {
  otpForm = new FormGroup({
    otp : new FormControl("", Validators.required),
  })
  submitted:boolean = false
  msg : any;
  user : any;

  constructor(private authservice:AuthService, private router:Router){
    console.log("--user>",this.router.getCurrentNavigation()?.extras);
    this.user = this.router.getCurrentNavigation()?.extras
  }

  submit(data:any){
    this.submitted = true
    console.log(data)

    // let formData = new FormData();
    // formData.append('otp',data['otp']);
    // formData.append('userId',this.user.id)

    let mydata = {
      'otp':data['otp'],
      'userId':this.user.id
    }
    
    if(this.otpForm.valid){
      this.authservice.doOtpVerify(mydata).subscribe((res:any)=>{
        this.router.navigate(['login'])
      }),
      (err:any)=>{
        this.msg = err.error.msg
      }
    }
  }

}
