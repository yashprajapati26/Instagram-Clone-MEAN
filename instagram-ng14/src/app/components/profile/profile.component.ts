import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ProfileService } from './profile.service';
import { PostService } from '../posts/post.service';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private postService: PostService, private toastr: ToastrService,
    private router: Router, private activateRoute: ActivatedRoute, private profileservice: ProfileService) {
    console.log("this.activateRoute.params", this.activateRoute.snapshot)
    if (this.activateRoute.snapshot.params['name'] && this.activateRoute.snapshot.params['id']) {
      let userId = this.activateRoute.snapshot.params['id']
      this.fatchUserProfileDetails(userId);
      this.fatchUserPost(userId)
      this.self = false;
    }
    else {
      let userID = localStorage.getItem('userId')
      this.fatchUserProfileDetails(userID);
      this.fatchUserPost(userID)
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
      console.log(this.userFollowing)

      res = this.userFollowing.filter((item: any) => item.userId = this.userId)
      console.log("res", res)

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
      console.log(this.userFollowers)
      // console.log(this.userFollowing)
      this.data = title == "Following" ? this.userFollowing : this.userFollowers

    })


  }

  closemodel() {
    let model = document.querySelector('.model');
    model?.classList.add('hidden')
  }


  fatchUserProfileDetails(userId: any) {
    this.profileservice.getUserProfileDetails(userId).subscribe((res: any) => {
      console.log(res['userProfile'])
      this.userProfile = res['userProfile']
      this.userId = this.userProfile['userId']
    })
  }


  fatchUserPost(userId: any) {
    this.profileservice.getUserPost(userId).subscribe((res: any) => {
      console.log(res)
      if (res['userPost']) this.userPost = res['userPost']
      else this.msg = res['msg']
    })
  }

  deletePost(postId: any) {
    console.log("delete...", postId)
    confirm("are you sure you want to delete");
    this.postService.deletePost(postId).subscribe((res: any) => {
      this.fatchUserPost(this.userId)
      this.router.navigate(['profile'])
    })
    this.toastr.success('Post Deleted', 'Deleted!');
  }

}
