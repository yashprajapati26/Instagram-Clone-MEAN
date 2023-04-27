import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FeedlistService } from '../../feedlist/feedlist.service';
import { PostService } from '../post.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  
  postForm = new FormGroup({
    content: new FormControl("", Validators.required),
    files: new FormControl("")
  })

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  filesToUpload: Array<File> = [];
  msg: any;
  userId: any = localStorage.getItem('userId')
  user : any;
  imageUrls: Array<string> = []
  isHidden:boolean = false
  sliderImageWidth: Number = 300;
  sliderImageHeight: Number = 300;
  imageObject: any = [];
  imageUrl = environment.apiURL;
  next:boolean = false;
  counter:number = 0;

  textArea: string ="";

  public isEmojiPickerVisible: boolean = false;

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  constructor(private postservice: PostService, private router: Router, private feedlistservice:FeedlistService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService
    ) { }

  ngOnInit() { 
    this.fatchUserDetails(this.userId);
  }

  createPost(data: any) {
    this.ngxLoader.start();

    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    formData.append("content", data['content'])
    formData.append("userId", this.userId)

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i]['name']);
    }
    if (this.postForm.valid) {
      this.postservice.createPost(formData).subscribe((res: any) => {
        this.msg = res['msg']
        this.router.navigate(['feed']);
        this.ngxLoader.stop();
        this.toastr.success('Post Sucessfully uploded', 'Success!');

      },
        (err) => {
          console.log(err)
        })
    }
  }

  fatchUserDetails(userId: any) {
    this.feedlistservice.getUserDetails(userId).subscribe((res: any) => {
      this.user = res['user'];
     

    })
  }

  selectFiles(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
    for (let i = 0; i < this.filesToUpload.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(this.filesToUpload[i]);
      reader.onload = async () => {
        let image = reader.result as string;
        this.imageUrls[i] = reader.result as string;
        this.imageObject.push({image, thumbImage:i});
      };
    }
    this.isHidden = true;
    console.log(this.imageObject)
    this.next = true;
  }

  nextAction(){
    this.next = true;
  }
  countLength(event:any){
    console.log(event.target.value.length)
    this.counter = event.target.value.length;
  }
  closeModal() {
    console.log("close call")
    this.onClose.emit(false);
  }

}
