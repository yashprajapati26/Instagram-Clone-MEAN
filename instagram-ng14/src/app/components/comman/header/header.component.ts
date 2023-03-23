import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router:Router,private authservice:AuthService){}

  createPost(){
    this.router.navigate(['create-post'])
  }

  gotoProfile(){
    let userId = localStorage.getItem('userId')
    if(userId) this.router.navigate(['profile',userId])
    else this.router.navigate(['login'])
  }

  logout(){
    this.authservice.removeToken();
    this.router.navigate(['login'])
  }

}
