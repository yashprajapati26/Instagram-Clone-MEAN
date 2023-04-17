import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CommanService } from '../comman/comman.service';
import { FeedlistService } from './feedlist.service';

@Component({
  selector: 'app-feedlist',
  templateUrl: './feedlist.component.html',
  styleUrls: ['./feedlist.component.scss'],
})
export class FeedlistComponent {
  feeds: any;
  imageUrl = environment.apiURL;
  user: any;
  allUsers: any;
  replyToggle: boolean = false;
  searchUsers: any;

  constructor(
    private router: Router,
    private feedlistservice: FeedlistService,
    private commanservice: CommanService
  ) {}

  ngOnInit() {
    this.fatchUserDetails();
    this.fatchFeed();
    this.fatchAllUsers();

    // this.allUsers = this.allUsers.filter((item:any) => item.id !== this.user.id);

    this.commanservice.reciveSearchKey().subscribe((res: any) => {
      this.searchUsers = this.allUsers.filter((user: any) =>
        user.username.includes(res)
      );
      console.log(this.searchUsers);
    });
  }

  closemodel() {
    let model = document.querySelector('.searchmodel');
    model?.classList.add('hidden');
  }

  fatchFeed() {
    this.feedlistservice.getFeeds().subscribe((res: any) => {
      console.log('feed:', res);
      this.feeds = res['feeds'];
    });
  }

  fatchUserDetails() {
    let userId = localStorage.getItem('userId');
    this.feedlistservice.getUserDetails(userId).subscribe((res: any) => {
      console.log("user : ",res);
      this.user = res['user'];
    });
  }

  fatchAllUsers() {
    this.feedlistservice.getAllUsers().subscribe((res: any) => {
      console.log(res['allusers'])
      this.allUsers = res['allusers'].map((user:any)=>{
        user.userFollowers.find((element:any)=>{
          if(element.followerId == this.user.id){
            user.isAlreadyFollowed = true
          }
        })
        return user
      })
      console.log(this.allUsers ,"------------------------")
      this.allUsers= this.allUsers.filter((obj:any)=>{
        console.log(obj.id, this.user.id)
        if(obj.id !== this.user.id){
          return obj
        }
      })
    });
  }

  addComment(postId: any) {
    console.log(postId);
    this.router.navigate(['add-comment', postId]);
  }

  openReplySection(cmtId: any) {
    let replyBox = document.getElementById(cmtId);
    console.log(replyBox);
    if (replyBox?.hasAttribute('hidden')) {
      console.log(1);
      replyBox?.removeAttribute('hidden');
    } else {
      console.log(2);
      replyBox?.setAttribute('hidden', 'true');
    }

    console.log('reply on comment ');
  }

  doUndoFollowing(userId: any, event: any) {
    if (event.target.textContent == 'follow') {
      event.target.textContent = 'unfollow';
    } else {
      event.target.textContent = 'follow';
    }
    let data = {
      userId: userId,
      followerId: this.user.id,
    };
    this.feedlistservice.doUndoFollowing(data).subscribe((res) => {
      console.log(res);
    });
  }
}
