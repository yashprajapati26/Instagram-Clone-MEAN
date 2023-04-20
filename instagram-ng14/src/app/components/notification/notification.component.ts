import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { CommanService } from '../comman/comman.service';
import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';
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
  allnotifications: any;

  constructor(
    private notificationservice: NotificationService,
    private authservice: AuthService,
    private ngxLoader: NgxUiLoaderService,
    private commanservice: CommanService,
    private toastr: ToastrService) {
    this.userId = this.authservice.getUserId()
  }

  ngOnInit() {;
    this.ngxLoader.start()
    this.getLikedNotification();
    this.getFollowNotification()
    this.getCmtsNotification();
    this.ngxLoader.stop();
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

  sendNotificationNo() {
    let total = this.allLiked?.length + this.allCmts?.length + this.allFollowers?.length
    console.log("----!!!! ", total)
    this.commanservice.sendNotificationNo(total)
  }

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
      event.target.textContent = "Following"
      event.target.setAttribute('disabled','true')
      document.getElementById("delete-" + requestId)?.setAttribute('hidden', 'true')
      this.toastr.success('Request Accepted', 'Accepted!');
    }
    else {
      document.getElementById("action-" + requestId)?.setAttribute('hidden', 'true')
      this.toastr.error('Request Rejected', 'Rejected!');

    }

    this.notificationservice.requestAccept(data).subscribe((res: any) => {
      console.log(res)
    })
  }

}
