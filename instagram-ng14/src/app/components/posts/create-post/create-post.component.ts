import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  postForm = new FormGroup({
    content : new FormControl("", Validators.required),
    files : new FormControl("")
  })
  filesToUpload: Array<File> = [];
  msg:any;
  userId:any = localStorage.getItem('userId')

  constructor(private postservice:PostService){}


  createPost(data:any){
    console.log(data)
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    formData.append("content", data['content'])
    formData.append("userId",this.userId)

    for(let i =0; i < files.length; i++){
        formData.append("files", files[i], files[i]['name']);
    }
    if(this.postForm.valid){
      this.postservice.createPost(formData).subscribe((res:any)=>{
        console.log(res)
        this.msg = res['msg']
      },
      (err)=>{
        console.log(err)
      })
    }
  }

  selectFiles(event:any){
    console.log(event)
    this.filesToUpload = <Array<File>>event.target.files;
    //this.product.photo = event.target.files[0]['name'];

    console.log("#####",this.filesToUpload)
  }

}
