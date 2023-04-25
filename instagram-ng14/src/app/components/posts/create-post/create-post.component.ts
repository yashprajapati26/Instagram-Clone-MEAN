import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  filesToUpload: Array<File> = [];
  msg: any;
  userId: any = localStorage.getItem('userId')
  imageUrls: Array<string> = []
  isHidden:boolean = false
  sliderImageWidth: Number = 585;
  sliderImageHeight: Number = 435;
  imageObject: any = [];
  imageUrl = environment.apiURL;

  constructor(private postservice: PostService, private router: Router) { }

  ngOnInit() { }

  createPost(data: any) {
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
      },
        (err) => {
          console.log(err)
        })
    }
  }

  selectFiles(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
    for (let i = 0; i < this.filesToUpload.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(this.filesToUpload[i]);
      reader.onload = async () => {
        this.imageUrls[i] = reader.result as string;
      };
    }
  }


}
