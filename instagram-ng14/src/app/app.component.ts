import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './components/auth/auth.service';
import { NotificationService } from './components/notification/notification.service';
import { CommanService } from './components/shared/comman.service';
import { FeedlistService } from './components/feedlist/feedlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instagram-ng14';
  searchUsers: any;
  searchKey: string | undefined;
  imageUrl = environment.apiURL;
  userId: any
  newCount: any
  constructor(
    private feedlistservice: FeedlistService,
    private commanservice: CommanService,
    private notificationservice: NotificationService,
    private ngxLoader: NgxUiLoaderService,
    private authservice: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = this.authservice.getUserId()
    this.commanservice.reciveSearchKey().subscribe((res: any) => {
      this.searchKey = res;
      this.commanservice.searchUser(res).subscribe((res: any) => {
        this.searchUsers = res['users']
        this.searchUsers = res['users'].map((user: any) => {
          user.userFollowers.find((element: any) => {
            if (element.followerId == this.userId) {
              user.isAlreadyFollowed = true
            }
          })
          return user
        })
      });
    });
    this.getNewNotification()

  }


  getNewNotification() {
    this.notificationservice.getNewNotification(this.userId).subscribe((res: any) => {
      this.newCount = res['count']
      this.sendNotification()
    })
  }

  doUndoFollowing(userId: any, event: any) {
    console.log(event.target.textContent)
    if (event.target.textContent == 'follow') {
      event.target.textContent = 'unfollow';
      event.target.style.backgroundColor = 'rgb(75 85 99)';
      console.log("1")
      this.toastr.success('Sent Follow request to user', 'Success!');

    } else {
      event.target.textContent = 'follow';
      event.target.style.backgroundColor = 'rgb(37 99 235)';

      this.toastr.warning('unfollow user', 'Success!');

    }
    let data = {
      userId: userId,
      followerId: this.userId,
    };
    this.feedlistservice.doUndoFollowing(data).subscribe((res) => {
      console.log(res);
    });
  }

  sendNotification() {
    this.commanservice.sendNotificationNo(this.newCount)
  }
}
