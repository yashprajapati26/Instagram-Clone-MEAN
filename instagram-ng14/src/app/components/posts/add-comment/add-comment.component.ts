import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../../auth/auth.service';
import { FeedlistService } from '../../feedlist/feedlist.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  sliderImageWidth: Number = 545;
  sliderImageHeight: Number = 425;

  post: any
  imageUrl = environment.apiURL
  loggedUser: any | undefined;
  msg: any
  replies: any;
  postId: any;
  comments: any;
  userId = localStorage.getItem("userId")

  cmtForm = new FormGroup({
    postId: new FormControl("", Validators.required),
    cmtBy: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.required),
    parentId: new FormControl(null, Validators.required),

  })
  nestedCmts: any[] = []
  new: any;
  constructor(private postservice: PostService,
    private activateRoute: ActivatedRoute,
    private authservice: AuthService,
    private feedlistservice: FeedlistService,
    private toastr: ToastrService
  ) { }

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
      this.checkLiked();

    })
  }



  fatchLoginUserDetails(): void {
    this.authservice.getUserDetails(this.userId).subscribe((res: any) => {
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
    this.toastr.success('comment added sucessfully', 'Comment');
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
      this.fatchPost(this.postId)

    })
    this.toastr.success('comment added sucessfully', 'Comment');
    this.cmtForm.reset();
  }

  openReplySection(cmtId: any) {
    console.log("cmt Id:", cmtId)
    let replyBox = document.getElementById("cmt-" + cmtId)
    if (replyBox?.hasAttribute("hidden")) {
      replyBox?.removeAttribute("hidden")
    }
    else {
      replyBox?.setAttribute("hidden", "true")
    }
  }

  checkLiked() {
    console.log(this.post)
    this.post.likedPosts.filter((ele: any) => {
      if (ele.likedBy == this.userId) {
        this.post.isAlreadyLiked = true;
      }
      return ele
    });
    console.log(this.post)
  }

  likedPost(event: any) {
    let Id = event.target.id || event.srcElement.id || event.currentTarget.id;
    let btn = document.getElementById(Id);
    let count = document.getElementById("like-" + Id.split('-')[1]);
    console.log("like : ", count?.innerText)
    let splitArray = Id.split('-');
    let postId = splitArray[1];

    if (btn?.getAttribute('fill') != 'red') {
      btn?.setAttribute('fill', 'red');
      let no = null
      no = count?.innerText
      if (no) no = (parseInt(no) + 1).toString()
      if (count) count.innerText = no ? no : ""
    } else {
      btn?.setAttribute('fill', 'none');
      let no = null
      no = count?.innerText
      if (no) no = (parseInt(no) - 1).toString()
      if (count) count.innerText = no ? no : ""
    }

    let userId = localStorage.getItem('userId');
    let data = { userId: userId, postId: postId };

    this.feedlistservice.likedDislikePost(data).subscribe((res: any) => {
      console.log(res);
    });
  }


  showReplies(id: number, event: any) {
    let reply = document.getElementById('replies-' + id);
    if (reply?.hasAttribute("hidden")) {
      reply?.removeAttribute("hidden")
      event.target.textContent = "hide replies"
    }
    else {
      reply?.setAttribute("hidden", "true")
      event.target.textContent = "show replies"
    }
  }



}
