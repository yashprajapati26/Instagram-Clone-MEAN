import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FeedlistService } from '../../feedlist/feedlist.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent {

  @Input('feeds') feeds:any;
  @Input('user') user:any;

  imageUrl = environment.apiURL


  constructor(private router:Router, private feedlistservice:FeedlistService){}

  ngOnInit(){
    
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
}
