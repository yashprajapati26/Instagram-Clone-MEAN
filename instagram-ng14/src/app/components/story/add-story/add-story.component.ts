import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StoryService } from '../story.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent {

  @Input("user") user: any;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  selected: boolean = false
  file: any;
  storyImageUrl: any = false
  imageUrl = environment.apiURL;

  constructor(private storyservice: StoryService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService


  ) { }
  selectFiles(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.storyImageUrl = reader.result as string;
    };
    this.selected = true
  }

  createStory() {
    this.ngxLoader.start();

    const formData: any = new FormData();

    formData.append("file", this.file)
    formData.append("userId", this.user.id)

    this.storyservice.createStory(formData).subscribe((res: any) => {
      console.log(res)
      this.ngxLoader.stop();
      this.closeModal();
      this.toastr.success('story uploded sucessfully', 'Success!');
      this.router.navigate(['feed'])

    },(err:any)=>{
      this.closeModal();
      this.toastr.error('story uploading fail', 'Failure!');
    })
  }

  goBackToPrevPage(): void {
    this.closeModal()
  }

  closeModal() {
    this.onClose.emit(false);
  }

}
