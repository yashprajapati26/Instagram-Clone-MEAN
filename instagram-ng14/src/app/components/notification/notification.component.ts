import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from './notification.service';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  userId: any;

  allFollowers: any;
  allLiked: any
  imageUrl = environment.apiURL
  allCmts: any;
  allnotifications:any;

  constructor(private notificationservice: NotificationService, private authservice: AuthService) {
    this.userId = this.authservice.getUserId()
  }

  ngOnInit() {
    // this.getFollowRequest()
    // this.getliked()
    this.getLikedNotification();
    this.getFollowNotification()
    this.getCmtsNotification();
  }

  ngOnChanges(changes: SimpleChanges){
    // if(changes){
    //   this.allnotifications = this.allLiked.concat(this.allCmts)
    // }
  }


  getLikedNotification() {
    this.notificationservice.getLikedNotification(this.userId).subscribe((res: any) => {
      console.log("like notification : ", res)
      this.allLiked = res['likesNotifications']
      console.log(res)
    })
  }
  getCmtsNotification() {
    this.notificationservice.getCmtsNotification(this.userId).subscribe((res: any) => {
      console.log("cmts notification : ", res)
      this.allCmts = res['cmtsNotifications']
      console.log(res)
    })
  }
  getFollowNotification() {
    this.notificationservice.getFollowNotification(this.userId).subscribe((res: any) => {
      console.log("follow notification : ", res)
      this.allFollowers = res['followNotifications']
      console.log(res)

    })
  }


  // getFollowRequest(){
  //   let userId = this.authservice.getUserId()
  //   this.notificationservice.getFollowRequest(userId).subscribe((res:any)=>{
  //     console.log(res)
  //     this.allFollowers = res['allFollowers']
  //   })
  // }

  // getliked(){
  //   let userId = this.authservice.getUserId()
  //   this.notificationservice.getLikedNotification(userId).subscribe((res:any)=>{
  //     console.log(res)
  //     this.allLiked = res['allLiked']
  //   })
  // }




  actionFollowRequest(requestId: any, followerId: any, status: any, event: any) {

    let userId = this.authservice.getUserId()

    let data = {
      requestId: requestId,
      status: status,
      userId: userId,
      followerId: followerId
    }
    console.log("data : ", data)

    if (status == "Accept") {
      event.target.textContent = "following"
      document.getElementById("delete-" + requestId)?.setAttribute('hidden', 'true')
    }
    else {
      document.getElementById("action-" + requestId)?.setAttribute('hidden', 'true')
    }


    this.notificationservice.requestAccept(data).subscribe((res: any) => {
      console.log(res)
    })
  }

}
