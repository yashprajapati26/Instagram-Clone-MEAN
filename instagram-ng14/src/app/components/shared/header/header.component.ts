import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CommanService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  searchKey: string = "";
  searchUsers: any;
  totNotification: any = 0

  constructor(private router: Router, private authservice: AuthService, private commanservice: CommanService) { }

  ngOnInit() {
    this.commanservice.reciveNotification().subscribe((data: any) => {
      console.log("---->",data)
      this.totNotification = data
    })
  }

  searchUser() {
    console.log(this.searchKey)
    this.commanservice.sendSearchKey(this.searchKey)
  }
  onFocus() {
    let model = document.querySelector('.searchmodel');
    model?.classList.remove('hidden')
  }
  onFocusout() {
    let model = document.querySelector('.searchmodel');
    model?.classList.add('hidden')
  }

  createPost() {
    this.router.navigate(['create-post'])
  }

  gotoProfile() {
    this.router.navigate(['profile'])
  }

  logout() {
    this.authservice.removeToken();
    this.router.navigate(['login'])
  }

  notifications() {
    this.router.navigate(['notification'])
  }



}
