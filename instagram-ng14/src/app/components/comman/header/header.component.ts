import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CommanService } from '../comman.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  searchKey:string | undefined;
  searchUsers: any;

  constructor(private router:Router,private authservice:AuthService, private commanservice:CommanService){}

  ngOnInit(){
    console.log("helolo")
  }

  searchUser(){
    console.log(this.searchKey)
    // this.authservice.searchUser(this.searchKey).subscribe((res:any)=>{
    //   this.searchUsers = res['users']
    // })
    let model = document.querySelector('.searchmodel');
    model?.classList.remove('hidden')
    this.commanservice.sendSearchKey(this.searchKey)
  }


  createPost(){
    this.router.navigate(['create-post'])
  }

  gotoProfile(){
    this.router.navigate(['profile'])
  }

  logout(){
    this.authservice.removeToken();
    this.router.navigate(['login'])
  }

  notifications(){
    this.router.navigate(['notification'])
  }

}
