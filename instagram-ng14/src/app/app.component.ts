import { Component } from '@angular/core';
import { CommanService } from './components/comman/comman.service';
import { environment } from 'src/environments/environment.development';
import { NotificationService } from './components/notification/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instagram-ng14';
  searchUsers: any;
  imageUrl = environment.apiURL;
  userId: any
  newCount:any
  constructor(private commanservice: CommanService, private notificationservice: NotificationService,
    private ngxLoader: NgxUiLoaderService, private authservice: AuthService) { }

  ngOnInit() {
    this.userId = this.authservice.getUserId()
    this.commanservice.reciveSearchKey().subscribe((res: any) => {
      this.commanservice.searchUser(res).subscribe((res: any) => {
        this.searchUsers = res['users']
      });
    });
    this.getNewNotification()
   
  }


  getNewNotification() {
    this.notificationservice.getNewNotification(this.userId).subscribe((res:any)=>{
      this.newCount = res['count']
      this.sendNotification()
    })
  }


  sendNotification() {
    this.commanservice.sendNotificationNo(this.newCount)
  }
}
