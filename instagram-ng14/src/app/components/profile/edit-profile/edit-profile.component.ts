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
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  userProfile: any;
  userId: any;
  profileForm: FormGroup;
  file: any;
  defaultImg = "src/assets/Logo-facebook.png";
  imageUrl = environment.apiURL;
  profile_img: any = undefined;

  constructor(
    private profileservice: ProfileService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private authservice: AuthService
  ) {
    let userID = this.authservice.getUserId()
    this.fatchUserProfileDetails(userID);
    this.profileForm = this.formBuilder.group({
      userId: ['', Validators.required],
      profile_img: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      bio: '',
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

  }

  ngOnInit() { }


  fatchUserProfileDetails(userId: any) {
    this.profileservice.getUserDetails(userId).subscribe((res: any) => {
      let userDetails = res['user']
      this.profileForm.patchValue({
        userId: userDetails.id,
        username: userDetails.username,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        email: userDetails.email,
        mobile: userDetails.mobile,
      })
    })

    this.profileservice.getUserProfileDetails(userId).subscribe((res: any) => {
      console.log(res)
      this.userProfile = res['userProfile']
      this.profile_img = this.userProfile.profile_img;
      this.profileForm.patchValue({
        bio: this.userProfile?.bio,
        dob: this.userProfile?.dob,
        gender: this.userProfile?.gender,
        city: this.userProfile?.city,
        country: this.userProfile?.country,
        profile_img: this.userProfile?.profile_img,
      });
      this.userId = this.userProfile['userId']
    })
  }

  selectFiles(event: any) {
    console.log(event)
    this.file = event.target.files[0];
    //this.product.photo = event.target.files[0]['name'];
    console.log("#####", this.file)
  }

  createProfile(data: any) {
    const formData = new FormData();
    const formValues = this.profileForm.getRawValue();
    console.log("formValues", formValues)
    Object.keys(formValues).forEach(key => {
      formData.append(key, formValues[key]);
    });
    if (this.file) {
      formData.append('file', this.file, this.file.name);
    }
    this.profileservice.createProfile(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['feed'])
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
