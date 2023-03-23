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
  userProfile: any;
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
    this.fatchUserProfileDetails(userID);
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

  ngOnInit() {}


  fatchUserProfileDetails(userId: any) {
    this.profileservice.getUserProfileDetails(userId).subscribe((res:any)=>{
      this.userProfile = res['userProfile']
      this.profileForm.patchValue({
        userId: this.userProfile?.user.id,
        username: this.userProfile?.user.username,
        firstname:this.userProfile?.user.firstName,
        lastname:this.userProfile?.user.lastName,
        email: this.userProfile?.user.email,
        mobile: this.userProfile?.user.mobile,
        bio:this.userProfile?.bio,
        dob: this.userProfile?.dob,
        gender: this.userProfile?.gender,
        city: this.userProfile?.city,
        country: this.userProfile?.country,
      });
      this.userId = this.userProfile['userId']
    })
  }

 

  createProfile(data: any) {
   
    this.profileservice.createProfile(this.profileForm.value).subscribe(
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
