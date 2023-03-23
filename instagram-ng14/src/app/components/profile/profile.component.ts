import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfile:any;
  userId:any;
  userPost:any;
  msg:any;
  imageUrl = environment.apiURL


  constructor(private router:Router, private activateRoute:ActivatedRoute, private profileservice:ProfileService){
    let userID = this.activateRoute.snapshot.params['id'];
    this.fatchUserDetails(userID);
    this.fatchUserPost(userID)
  }

  ngOnInit(){

  }



  fatchUserDetails(userId: any) {
    this.profileservice.getUserProfileDetails(userId).subscribe((res:any)=>{
      console.log(res['userProfile'])
      this.userProfile = res['userProfile']
      this.userId = this.userProfile['userId']
    })
  }


  fatchUserPost(userId:any){
    this.profileservice.getUserPost(userId).subscribe((res:any)=>{
      console.log(res)
      if(res['userPost']) this.userPost = res['userPost']
      else this.msg = res['msg']
    })
  }

}
