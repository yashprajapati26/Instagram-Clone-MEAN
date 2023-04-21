import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FeedlistService } from '../../feedlist/feedlist.service';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent implements OnChanges {
  @Input('feeds') feeds: any = [];
  @Input('user') user: any;

  imageUrl = environment.apiURL;
  sliderImageWidth: Number = 545;
  sliderImageHeight: Number = 425;

  cmtForm = new FormGroup({
    postId: new FormControl('', Validators.required),
    cmtBy: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    parentId: new FormControl(null, Validators.required),
  });
  msg: any;

  constructor(
    private router: Router,
    private feedlistservice: FeedlistService,
    private postservice: PostService
  ) {
    console.log("feeds : ", this.feeds)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    if (changes['feeds']) {
      this.checkLiked();
      this.SetSliderImages();
    }
  }

  SetSliderImages() {
    // {{feed.postImages[0].imagePath | json}}
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
    console.log(this.user)

    this.feeds = this.feeds?.map((element: any) => {
      element.likedPosts.find((ele: any) => {
        // console.log(ele , "ele")
        if (ele.likedBy == this.user['id']) {
          element.isAlreadyLiked = true;
        }
      });
      return element;
    });
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
    console.log(this.cmtForm.value);
    this.postservice.createComment(this.cmtForm.value).subscribe((res: any) => {
      this.msg = res['msg'];
    });
    this.cmtForm.reset();
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
}
