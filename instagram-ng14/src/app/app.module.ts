import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { OtpVerifyComponent } from './components/auth/otp-verify/otp-verify.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FeedsComponent } from './components/comman/feeds/feeds.component';
import { HeaderComponent } from './components/comman/header/header.component';
import { FeedlistComponent } from './components/feedlist/feedlist.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AddCommentComponent } from './components/posts/add-comment/add-comment.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InterceptorService } from './interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ProfileComponent,
    OtpVerifyComponent,
    EditProfileComponent,
    FeedlistComponent,
    CreatePostComponent,
    NotFoundComponent,
    AddCommentComponent,
    FeedsComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
