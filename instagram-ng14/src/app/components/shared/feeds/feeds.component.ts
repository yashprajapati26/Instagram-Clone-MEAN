import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../../auth/auth.service';
import { FeedlistService } from '../../feedlist/feedlist.service';
import { PostService } from '../../posts/post.service';
import { CommanService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent implements OnChanges {
  @Input('feeds') feeds: any = [];
  @Input('user') user: any;
  @ViewChild('postimg') postimg: ElementRef | undefined;

  imageUrl = environment.apiURL;
  sliderImageWidth: Number = 591;
  sliderImageHeight: Number = 435;
  userId: any;
  msg: any;
  savedPosts: any;

  cmtForm = new FormGroup({
    postId: new FormControl('', Validators.required),
    cmtBy: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    parentId: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private feedlistservice: FeedlistService,
    private postservice: PostService,
    private authservice: AuthService,
    private commanservice: CommanService,
    private toastr: ToastrService

  ) {
    console.log("feeds : ", this.feeds)
    this.userId = this.authservice.getUserId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['feeds']) {
      this.listSavedPost();
      this.checkLiked();
      this.SetSliderImages();
    }
  }

  SetSliderImages() {
    this.feeds = this.feeds?.map((feed: any) => {
      feed.imageObject = [];
      feed.postImages.map((obj: any) => {
        let image = this.imageUrl + '/' + obj.imagePath;
        let thumbImage = image;
        feed.imageObject.push({ image, thumbImage });
      });
      return feed;
    });
  }

  checkLiked() {
    this.feeds = this.feeds?.map((element: any) => {
      element.likedPosts.find((ele: any) => {
        if (ele.likedBy == this.userId) {
          element.isAlreadyLiked = true;
        }
      });
      return element;
    });
  }

  likeHover(feedId: any) {
    let heart = document.getElementById('heart-' + feedId);
    heart?.classList.add("active")
    setTimeout(() => {
      heart?.classList.remove('active');
    }, 1000);
  }

  likedPost(feedId: any) {
    let postId = feedId
    let btn = document.getElementById("feed-" + postId);
    let count = document.getElementById("like-" + postId);
    if (btn?.getAttribute('fill') != 'red') {
      this.likeHover(feedId)
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

  addComment(postId: any) {
    console.log(postId);
    this.router.navigate(['add-comment', postId]);
  }

  addReply(postId: any, cmtId: any) {
    this.cmtForm.patchValue({
      postId: postId,
      cmtBy: this.user.id,
      parentId: cmtId,
    });
    this.postservice.createComment(this.cmtForm.value).subscribe((res: any) => {
      this.msg = res['msg'];
    });
    this.cmtForm.reset();
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

  savePost(PostId: number, event: any) {
    let btn = event.target
    console.log("save btn : ", btn)
    if (btn?.getAttribute('fill') != 'black') {
      btn?.setAttribute('fill', 'black');
    }
    else {
      btn?.setAttribute('fill', 'white');
    }
    console.log("saved : ", PostId);
    let data = { "postId": PostId, "userId": this.userId }

    this.commanservice.savedUnsavedPost(data).subscribe((res: any) => {
      console.log(res)
      if(res.removed){
        this.toastr.error("Post remove successfully", "Removed")

      }else{
      this.toastr.success("Post Saved successfully", "Saved")
      }
    })
  }

  listSavedPost() {
    this.commanservice.fatchAllSavedPosts(this.userId).subscribe((res: any) => {
      console.log(res)
      this.savedPosts = res['allSaved']
      this.feeds = this.feeds?.map((feed: any) => {
        this.savedPosts?.find((ele: any) => {
          if (ele.postId == feed.id) {
            feed.saved = true;
          }
        });
        return feed;
      })
    })
    console.log("feeds=== : ",this.feeds)
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.sliderImageWidth = this.postimg?.nativeElement.offsetWidth
  }
}
