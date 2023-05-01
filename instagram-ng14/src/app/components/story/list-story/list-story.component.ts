import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StoryService } from '../story.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
  listStory: any = undefined;
  sliderImageWidth: Number | undefined = 631;
  sliderImageHeight: Number = 465;
  isvisible = false;
  images: any = []
  constructor(private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private storyservice: StoryService) {
    this.getAllStory()
  }

  addStory() {
    this.addstory = !this.addstory
  }

  modalClosed(isClosed: any) {
    console.log("isClosed : ", isClosed)
    this.addstory = isClosed;
  }

  getAllStory() {
    this.storyservice.listStory().subscribe((data: any) => {
      console.log(data)
      this.listStory = data['Allstory'].map((story: any) => {
        let img = this.imageUrl + '/' + story.imagePath;
        this.images.push({ path: img });
        return story;
      })
      console.log("-->:", this.images)
    })
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    // this.sliderImageWidth = this.postimg?.nativeElement.offsetWidth
    this.sliderImageWidth = window.innerWidth;
    this.sliderImageHeight = window.innerHeight;
  }

  viewStory() {
    this.ngxLoader.startLoader("listStory");

    this.isvisible = true

    this.ngxLoader.stopLoader("listStory");
  }
  goBackToPrevPage(): void {
    this.closeModal()
  }

  closeModal() {
    this.isvisible = false
  }

}
