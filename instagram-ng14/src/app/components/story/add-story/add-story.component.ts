import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common'
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

  constructor(private location: Location) { }
  selectFiles(event: any) {
    console.log(event)
    this.file = event.target.files[0];
    //this.product.photo = event.target.files[0]['name'];
    console.log("#####", this.file)
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    console.log(reader.result as string)
    reader.onload = () => {
      this.storyImageUrl = reader.result as string;
    };
    this.selected = true
  }


  goBackToPrevPage(): void {
    this.closeModal()
  }

  closeModal() {
    console.log("close call")
    this.onClose.emit(false);
  }

}
