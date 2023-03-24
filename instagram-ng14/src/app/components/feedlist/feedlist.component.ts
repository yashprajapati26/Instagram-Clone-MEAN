import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FeedlistService } from './feedlist.service';

@Component({
  selector: 'app-feedlist',
  templateUrl: './feedlist.component.html',
  styleUrls: ['./feedlist.component.scss']
})
export class FeedlistComponent {
  
  feeds: any;
  imageUrl = environment.apiURL
  user: any;
  allUsers: any
  replyToggle: boolean = false;
  btnName:string = "follow"

  constructor(private router: Router, private feedlistservice: FeedlistService) { }

  ngOnInit() {
    this.fatchFeed();
    this.fatchUserDetails();
    this.fatchAllUsers();

    // this.allUsers = this.allUsers.filter((item:any) => item.id !== this.user.id);

    console.log(this.allUsers)
  }


  fatchFeed() {
    this.feedlistservice.getFeeds().subscribe((res: any) => {
      console.log(res)
      this.feeds = res['feeds']
    })
  }

  fatchUserDetails() {
    let userId = localStorage.getItem('userId')
    this.feedlistservice.getUserDetails(userId).subscribe((res: any) => {
      console.log(res)
      this.user = res['user']
    })
  }

  fatchAllUsers() {
    this.feedlistservice.getAllUsers().subscribe((res: any) => {
      this.allUsers = res['allusers']
    })
  }

  likedPost(event: any) {

    let Id = event.target.id || event.srcElement.id || event.currentTarget.id;
    let btn = document.getElementById(Id);

    let splitArray = Id.split("-");
    let postId = splitArray[1]

    if (btn?.getAttribute("fill") != "red") {
      btn?.setAttribute("fill", "red")
    } else {
      btn?.setAttribute("fill", "gray")
    }

    let userId = localStorage.getItem('userId')
    let data = { userId: userId, postId: postId }

    this.feedlistservice.likedDislikePost(data).subscribe((res: any) => {
      console.log(res)
    })
  }

  addComment(postId: any) {
    console.log(postId)
    this.router.navigate(['add-comment', postId])
  }

  openReplySection(cmtId: any) {
    let replyBox = document.getElementById(cmtId)
    console.log(replyBox)
    if (replyBox?.hasAttribute("hidden")) {
      console.log(1)
      replyBox?.removeAttribute("hidden")
    }
    else {
      console.log(2)
      replyBox?.setAttribute("hidden", "true")
    }

    console.log("reply on comment ")
  }

  

  doUndoFollowing(userId:any,event:any){
    event.target.textContent = "unfollow"
    let data = {
      userId : userId, 
      followerId : this.user.id
    }
    this.feedlistservice.doFollowing(data).subscribe((res)=>{
      console.log(res)
    })
  }
}
