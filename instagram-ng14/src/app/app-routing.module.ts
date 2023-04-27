import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { OtpVerifyComponent } from './components/auth/otp-verify/otp-verify.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FeedlistComponent } from './components/feedlist/feedlist.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AddCommentComponent } from './components/posts/add-comment/add-comment.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { AddStoryComponent } from './components/story/add-story/add-story.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'otpVerification',
    component: OtpVerifyComponent
  },
  {
    path:'edit-profile',
    canActivate:[AuthguardGuard],
    component: EditProfileComponent
  },
  {
    path:'profile',
    canActivate:[AuthguardGuard],
    component: ProfileComponent
  },
  {
    path:'userprofile/:name/:id',
    canActivate:[AuthguardGuard],
    component: ProfileComponent
  },
  {
    path:'feed',
    canActivate:[AuthguardGuard],
    component: FeedlistComponent
  },
  {
    path:'create-post',
    canActivate:[AuthguardGuard],
    component: CreatePostComponent
  },
  {
    path:'add-comment/:id',
    canActivate:[AuthguardGuard],
    component: AddCommentComponent
  },
  {
    path:'view-post/:id',
    canActivate:[AuthguardGuard],
    component: AddCommentComponent
  },
  {
    path: 'notification',
    canActivate:[AuthguardGuard],
    component: NotificationComponent
  },
  {
    path: 'add-story',
    component : AddStoryComponent
  },
  {
    path:'**',
    component: NotFoundComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
