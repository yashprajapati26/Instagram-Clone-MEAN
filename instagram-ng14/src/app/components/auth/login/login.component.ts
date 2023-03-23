import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username : new FormControl("yashprajapati26", Validators.required),
    password :new FormControl("Yash@123", Validators.required),
  })
  submitted:boolean = false


  constructor(private router:Router, private authservice:AuthService){}

  ngOnInit(){}


  login(data:object){
    this.submitted = true
    console.log(data)
    if(this.loginForm.valid){
        this.authservice.doLogin(data).subscribe((res:any)=>{
        if(res){
          this.authservice.saveToken(res['data']['auth_token'])
          let userId = res['data']['user'].id
          localStorage.setItem('userId',userId)
          this.router.navigate(['edit-profile',userId]);
        }
      })
    }
  }

  signup(){
    this.router.navigate(['signup'])
  }

  togglePassword(event:any){
    console.log("called",event)
  }
}
