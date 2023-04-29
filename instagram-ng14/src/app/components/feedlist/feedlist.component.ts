import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.development';
import { CommanService } from '../shared/shared.service';
import { FeedlistService } from './feedlist.service';
import { ToastrService } from 'ngx-toastr';

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
  limit: any = 0;
  userId: any;

  constructor(
    private router: Router,
    private feedlistservice: FeedlistService,
    private commanservice: CommanService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.fatchUserDetails();
    this.fatchFeed();
    this.fatchAllUsers();
    this.reciveAllUsers();

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
    this.ngxLoader.start();
    this.limit = this.limit + 5;
    let params = { 'offset': 0, 'limit': this.limit }
    this.feedlistservice.getFeeds(params).subscribe((res: any) => {
      this.feeds = res['feeds'];
      this.ngxLoader.stop();
    });
  }

  fatchUserDetails() {
    this.userId = localStorage.getItem('userId');
    this.feedlistservice.getUserDetails(this.userId).subscribe((res: any) => {
      this.user = res['user'];
    });
  }

  fatchAllUsers() {
    this.ngxLoader.start();

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
      this.ngxLoader.stop();

    }, (err: any) => {
      console.log(err);
      this.ngxLoader.stop();
      this.router.navigate(['login'])
    });
  }

  reciveAllUsers() {
    this.commanservice.reciveAllUsers().subscribe((res: any) => {
      this.allUsers = res;
    });
  }

  addComment(postId: any) {
    console.log(postId);
    this.router.navigate(['add-comment', postId]);
  }

  openReplySection(cmtId: any) {
    let replyBox = document.getElementById(cmtId);
    if (replyBox?.hasAttribute('hidden')) {
      replyBox?.removeAttribute('hidden');
    } else {
      replyBox?.setAttribute('hidden', 'true');
    }
  }

  doUndoFollowing(userId: any, event: any) {
    if (event.target.textContent === 'follow') {
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
      followerId: this.user.id,
    };
    this.feedlistservice.doUndoFollowing(data).subscribe((res) => {
      console.log(res);
    });
  }
}
