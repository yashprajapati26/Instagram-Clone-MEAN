import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { CommanService } from '../shared/shared.service';
import { NotificationService } from './notification.service';
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
    private toastr: ToastrService
  ) {
    this.userId = this.authservice.getUserId()
    this.getNotification();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.readNorification();
  }

  readNorification() {
    this.notificationservice.readNotification(this.userId).subscribe((res: any) => {
      console.log(res)
    })
  }

  getNotification() {
    this.notificationservice.getLikedNotification(this.userId).subscribe((res: any) => {
      this.ngxLoader.start()
      this.allLiked = res['likesNotifications'];
      this.allLiked = this.allLiked.filter((ele: any) => ele.likedPost != null);
    })
    this.notificationservice.getCmtsNotification(this.userId).subscribe((res: any) => {
      this.allCmts = res['cmtsNotifications']
      this.allCmts = this.allCmts.filter((ele: any) => ele.cmtPost != null);
      this.allnotifications = this.allLiked.concat(this.allCmts)
      this.allnotifications = this.allnotifications.sort((a: any, b: any) => {
        return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      });
    })
    this.notificationservice.getFollowNotification(this.userId).subscribe((res: any) => {
      this.allFollowers = res['followNotifications']
      console.log(res)
      this.allFollowers = this.allFollowers.filter((ele: any) => ele.userFollower != null);

      this.ngxLoader.stop();
    })

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
      event.target.setAttribute('disabled', 'true')
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
