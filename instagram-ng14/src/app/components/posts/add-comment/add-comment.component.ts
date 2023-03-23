import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { PostService } from '../post.service';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {

  post: any
  imageUrl = environment.apiURL
  loggedUser: any | undefined;
  msg: any
  replies:any;

  cmtForm = new FormGroup({
    postId: new FormControl("", Validators.required),
    cmtBy: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.required),
    parentId: new FormControl(null, Validators.required),

  })

  constructor(private postservice: PostService, private activateRoute: ActivatedRoute, private authservice: AuthService) { }

  ngOnInit() {
    let postId = this.activateRoute.snapshot.params['id']
    this.fatchPost(postId)
    this.fatchLoginUserDetails()
  }

  fatchPost(postId: any) {
    this.postservice.getPostDetails(postId).subscribe((res: any) => {
      console.log(res)
      this.post = res['post']
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
    console.log(this.cmtForm.value)
    this.postservice.createComment(this.cmtForm.value).subscribe((res: any) => {
      this.msg = res['msg']
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
    this.fatchReplies(7)

  }

  fatchReplies(cmtId:any){
    let cmt_id = cmtId
    console.log("-->",this.post)
    let replies = this.post.cmtPosts.filter((comment:any) => comment.parentId === cmt_id).sort((a:any, b:any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    console.log("------------------replies------------------------")
    console.log(replies)
  }

}
