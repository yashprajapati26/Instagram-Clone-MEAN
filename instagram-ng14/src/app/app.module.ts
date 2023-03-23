import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/comman/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OtpVerifyComponent } from './components/auth/otp-verify/otp-verify.component';
import { InterceptorService } from './interceptor/interceptor.service';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { FeedlistComponent } from './components/feedlist/feedlist.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddCommentComponent } from './components/posts/add-comment/add-comment.component';
import { FeedsComponent } from './components/comman/feeds/feeds.component';

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
    FeedsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
