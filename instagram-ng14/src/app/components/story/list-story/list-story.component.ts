import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-story',
  templateUrl: './list-story.component.html',
  styleUrls: ['./list-story.component.scss']
})
export class ListStoryComponent {

  @Input('allUsers') allUsers: any = [];
  @Input('user') user: any;
  imageUrl = environment.apiURL;
  addstory: boolean = false;


  constructor(private router: Router) { }

  addStory() {
    this.addstory = !this.addstory
  }
  modalClosed(isClosed: any) {
    console.log("isClosed : ", isClosed)
    this.addstory = isClosed;
  }

}
