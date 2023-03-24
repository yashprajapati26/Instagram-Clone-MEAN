import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  allFollowers:any;
  allLiked:any
  imageUrl = environment.apiURL


  constructor(private notificationservice:NotificationService, private authservice:AuthService){}

  ngOnInit(){
    this.getFollowRequest()
    this.getliked()
  }

  getFollowRequest(){
    let userId = this.authservice.getUserId()
    this.notificationservice.getFollowRequest(userId).subscribe((res:any)=>{
      console.log(res)
      this.allFollowers = res['allFollowers']
    })
  }

  getliked(){
    let userId = this.authservice.getUserId()
    this.notificationservice.getLikedNotification(userId).subscribe((res:any)=>{
      console.log(res)
      this.allLiked = res['allLiked']
    })
  }

}
