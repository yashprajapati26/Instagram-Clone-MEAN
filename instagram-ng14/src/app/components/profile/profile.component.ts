import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ProfileService } from './profile.service';
import { PostService } from '../posts/post.service';
import { ToastrService } from 'ngx-toastr';
import { FeedlistService } from '../feedlist/feedlist.service';
import { CommanService } from '../shared/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfile: any | undefined;
  userId: string | undefined;
  userPost: any;
  msg: any;
  imageUrl = environment.apiURL

  userFollowers: any;
  userFollowing: any;
  title!: string;
  data: any
  self: boolean = true;
  user: any;
  savedPost: any;

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService,

    private router: Router,
    private activateRoute: ActivatedRoute,
    private profileservice: ProfileService,
    private feedlistservice: FeedlistService,
    private commanService: CommanService) {
      
    if (this.activateRoute.snapshot.params['name'] && this.activateRoute.snapshot.params['id']) {
      let userId = this.activateRoute.snapshot.params['id']
      this.fatchUserProfileDetails(userId);
      this.fatchUserPost(userId)
      this.fatchUserDetails(userId)
      if (userId != localStorage.getItem('userId')) this.self = false;
      console.log("other user ")
    }
    else {
      let userID = localStorage.getItem('userId')
      this.fatchUserProfileDetails(userID);
      this.fatchUserPost(userID)
      console.log("login user ")
    }
  }

  ngOnInit() {
  }

  show(title: any) {
    this.title = title
    let model = document.querySelector('.model');
    model?.classList.remove('hidden')
    this.profileservice.getUserFollowersFollowing(this.userId).subscribe((res: any) => {
      this.userFollowers = res['followers']
      this.userFollowing = res['following']

      res = this.userFollowing.filter((item: any) => item.userId = this.userId)

      this.userFollowers = this.userFollowers.map((ele: any) => {
        this.userFollowing.map((item: any) => {
          if (item.asuser.id == ele.followerId) {
            ele.isFollowing = true;
          } else {
            ele.isFollowing = false;
          }
        });
        return ele
      });
      this.data = title == "Following" ? this.userFollowing : this.userFollowers

    })


  }

  closemodel() {
    let model = document.querySelector('.model');
    model?.classList.add('hidden')
  }


  fatchUserProfileDetails(userId: any) {
    this.profileservice.getUserProfileDetails(userId).subscribe((res: any) => {
      this.userProfile = res['userProfile']
      this.userId = this.userProfile['userId']
    })
  }


  fatchUserPost(userId: any) {
    this.profileservice.getUserPost(userId).subscribe((res: any) => {
      if (res['userPost']) this.userPost = res['userPost']
      else this.msg = res['msg']
    })
  }

  deletePost(postId: any) {
    if (confirm("are you sure you want to delete")) {
      this.postService.deletePost(postId).subscribe((res: any) => {
        this.fatchUserPost(this.userId)
        this.router.navigate(['profile'])
      })
      this.toastr.success('Post Deleted', 'Deleted!');
    }
  }



  fatchUserDetails(userId: any) {
    this.feedlistservice.getUserDetails(userId).subscribe((res: any) => {
      this.user = res['user'];
      console.log("user", this.user)
      let logginuser = localStorage.getItem('userId')
      this.user.userFollowers.find((element: any) => {
        if (element.followerId == logginuser) {
          if (element.status == 'Accept') this.user.isAlreadyFollowed = 'follow';
          else this.user.isAlreadyFollowed = 'pending';
        }
      })
    });

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
    let logginuser = localStorage.getItem('userId')
    let data = {
      userId: userId,
      followerId: logginuser,
    };
    this.feedlistservice.doUndoFollowing(data).subscribe((res) => {
      console.log(res);
    });
  }

  savedPostList() {
    this.ngxLoader.start();
    this.commanService.fatchAllSavedPosts(this.userId).subscribe((res: any) => {
      this.savedPost = res['allSaved']
      console.log("savedPost ", this.savedPost)
      this.ngxLoader.stop();
    })
  }
}
