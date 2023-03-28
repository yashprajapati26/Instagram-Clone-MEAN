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

  actionFollowRequest(requestId:any,followerId:any, status:any, event:any){

    let userId = this.authservice.getUserId()

    let data = {
      requestId: requestId,
      status : status,
      userId: userId,
      followerId : followerId
    }
    

    if(status=="Accept"){
      event.target.textContent = "following"
      document.getElementById("delete-"+requestId)?.setAttribute('hidden','true')

    }
    else{
      document.getElementById("action-"+requestId)?.setAttribute('hidden','true')
    }
    
    
    this.notificationservice.requestAccept(data).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
