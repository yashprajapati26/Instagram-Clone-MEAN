import { Component } from '@angular/core';
import { CommanService } from './components/comman/comman.service';
import { environment } from 'src/environments/environment.development';
import { NotificationService } from './components/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instagram-ng14';
  searchUsers: any;
  imageUrl = environment.apiURL;

  constructor(private commanservice: CommanService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.commanservice.reciveSearchKey().subscribe((res: any) => {
      this.commanservice.searchUser(res).subscribe((res: any) => {
        this.searchUsers = res['users']
      });
    });

  }
}
