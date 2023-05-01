import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  footer = ["Meta",
    "About",
    "Blog",
    "Jobs",
    "Help",
    "API",
    "Privacy",
    "Terms",
    "Top accounts",
    "Locations",
    "Instagram Lite",
    "Contact uploading and non-users",
    "Meta", "Verified"]

  loginForm = new FormGroup({
    username: new FormControl("yashprajapati26", Validators.required),
    password: new FormControl("Yash@123", Validators.required),
  })
  submitted: boolean = false
  msg: any
  password: string = "password"
  constructor(private router: Router, private authservice: AuthService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() { }

  githubLogin() {
    console.log("login with github")
    this.authservice.doLoginViaGithub().subscribe((res: any) => {
    })
  }

  login(data: object) {
    this.ngxLoader.start();
    this.submitted = true
    console.log(data)
    if (this.loginForm.valid) {
      this.authservice.doLogin(data).subscribe((res: any) => {
        if (res) {
          console.log(res)
          localStorage.setItem('userId', res['data']['user'].id)
          this.authservice.saveToken(res['data']['auth_token'])
          if (res['data']['user'].isFirstTime) {
            this.router.navigate(['edit-profile']);
          }
          else { this.router.navigate(['profile']); }
        }
      }, (err: any) => {
        this.msg = err.error.msg
      })
    }
    this.ngxLoader.stop();

  }

  signup() {
    this.router.navigate(['signup'])
  }

  togglePassword(event: any) {

    if (this.password === 'password') {
      this.password = 'text';
      // this.show = true;
    } else {
      this.password = 'password';
      // this.show = false;
    }
  }
}
