import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  forgetForm = new FormGroup({
    username: new FormControl('', [Validators.required,])
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
  }

  submit(value:any){
    if(this.forgetForm.valid){
      console.log(value)
    }
  }
}
