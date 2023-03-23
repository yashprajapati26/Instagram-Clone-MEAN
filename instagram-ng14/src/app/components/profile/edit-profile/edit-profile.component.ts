import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  user: any;
  userId:any;
  profileForm: FormGroup;

  constructor(
    private profileservice: ProfileService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private authservice: AuthService
  ) {
    let userID = this.activateRoute.snapshot.params['id'];
    this.fatchUserDetails(userID);
    this.profileForm = this.formBuilder.group({
      userId: ['',Validators.required],
      profile_img: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      bio:'',
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.patchValue()
  }

  patchValue(){
    
    this.profileForm.patchValue({
      username: "test",
      firstname: "test",
      lastname: "test",
      email: "test",
      mobile: "test",
    });
  }

  fatchUserDetails(userId: any) {
    this.authservice.getUserDetails(userId).subscribe((res:any)=>{
      this.user = res['user']
      this.userId = this.user['id']
    })
  }

  createProfile(data: any) {
    let profileData = {
      'userId':this.user['id'],
      'bio':data['bio'],
      'dob': data['dob'],
      'gender': data['gender'],
      'city': data['city'],
      'country': data['country'],
    } 
    this.profileservice.createProfile(profileData).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['profile',this.userId])
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
