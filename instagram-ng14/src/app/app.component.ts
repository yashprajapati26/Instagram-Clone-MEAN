import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './components/auth/auth.service';
import { NotificationService } from './components/notification/notification.service';
import { CommanService } from './components/shared/shared.service';
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
  allUsers: any;
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
              if (element.status == 'Accept') user.isAlreadyFollowed = 'follow';
              else user.isAlreadyFollowed = 'pending';
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
      console.log("new count :",this.newCount)
    })
  }

  doUndoFollowing(userId: any, event: any) {
    if (event.target.textContent == 'follow') {
      event.target.textContent = 'requested';
      event.target.style.backgroundColor = 'rgb(75 85 99)';
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
      this.fatchAllUsers()
    });

  }

  fatchAllUsers() {
    // this.ngxLoader.start();
    this.feedlistservice.getAllUsers().subscribe((res: any) => {
      this.allUsers = res['allusers'].map((user: any) => {
        user.userFollowers.find((element: any) => {
          if (element.followerId == this.userId) {
            if (element.status == 'Accept') user.isAlreadyFollowed = 'follow';
            else user.isAlreadyFollowed = 'pending';
          }
        })
        return user
      })
      this.allUsers = this.allUsers.filter((obj: any) => {
        if (obj.id != this.userId) {
          return obj
        }
      })
      this.sendAllUsers()
      // this.ngxLoader.stop();
    });
  }

  sendAllUsers() {
    this.commanservice.sendAllUsers(this.allUsers)
  }

  sendNotification() {
    this.commanservice.sendNotificationNo(this.newCount)
  }

  closeSearchBox(){
    this.searchKey = undefined
  }
}
