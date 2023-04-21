import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../../auth/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  sliderImageWidth: Number = 545;
  sliderImageHeight: Number = 425;

  html = ""
  post: any
  imageUrl = environment.apiURL
  loggedUser: any | undefined;
  msg: any
  replies: any;
  postId: any;
  comments: any;
  cmtForm = new FormGroup({
    postId: new FormControl("", Validators.required),
    cmtBy: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.required),
    parentId: new FormControl(null, Validators.required),

  })
  nestedCmts: any[] = []
  new: any;
  constructor(private postservice: PostService, private activateRoute: ActivatedRoute, private authservice: AuthService) { }

  ngOnInit() {
    this.postId = this.activateRoute.snapshot.params['id']
    this.fatchPost(this.postId)
    this.fatchLoginUserDetails()
  }

  SetSliderImages() {
    // {{feed.postImages[0].imagePath | json}}
    this.post.imageObject = [];
    this.post.postImages.map((obj: any) => {
      let image = this.imageUrl + '/' + obj.imagePath;
      let thumbImage = image;
      this.post.imageObject.push({ image, thumbImage });
    });
    console.log(this.post);

  }

  fatchPost(postId: any) {
    this.postservice.getPostDetails(postId).subscribe((res: any) => {
      this.post = res['post']
      this.comments = this.post['cmtPosts']
      this.comments.map((commit: any) => {
        commit.reply = []
        if (commit.parentId) {
          let temp = this.comments.find((item: any) => item.id === commit.parentId);
          temp.reply.push(commit);
        }
      });

      this.comments = this.comments.filter((element: any) => {
        if (element.parentId === null) {
          console.log(element)
          return element
        }
      });
      console.log("new : ", this.comments)
      this.SetSliderImages();
    })
  }



  fatchLoginUserDetails(): void {
    let userId = localStorage.getItem("userId")
    this.authservice.getUserDetails(userId).subscribe((res: any) => {
      this.loggedUser = res['user']
    })
  }

  addCmt() {
    this.cmtForm.patchValue({
      postId: this.post.id,
      cmtBy: this.loggedUser.id,
    })
    this.postservice.createComment(this.cmtForm.value).subscribe((res: any) => {
      this.msg = res['msg']
      this.fatchPost(this.postId)
    })
    this.cmtForm.reset();
  }

  addReply(cmtId: any) {
    this.cmtForm.patchValue({
      postId: this.post.id,
      cmtBy: this.loggedUser.id,
      parentId: cmtId
    })
    console.log(this.cmtForm.value)
    this.postservice.createComment(this.cmtForm.value).subscribe((res: any) => {
      this.msg = res['msg']
    })
    this.cmtForm.reset();
  }

  openReplySection(cmtId: any) {
    let replyBox = document.getElementById("cmt-" + cmtId)
    if (replyBox?.hasAttribute("hidden")) {
      console.log(1)
      replyBox?.removeAttribute("hidden")
    }
    else {
      console.log(2)
      replyBox?.setAttribute("hidden", "true")
    }
    // this.fatchReplies(7)
  }

  // fatchReplies(cmtId: any) {
  //   let cmt_id = cmtId
  //   let replies = this.post.cmtPosts.filter((comment: any) => comment.parentId === cmt_id).sort((a: any, b: any) =>
  //     new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //   );
  // }


}
