import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from "ngx-ui-loader";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FeedsComponent } from './components/shared/feeds/feeds.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { InterceptorService } from './interceptor/interceptor.service';
import { AddStoryComponent } from './components/story/add-story/add-story.component';
import { ListStoryComponent } from './components/story/list-story/list-story.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {IvyCarouselModule} from 'angular-responsive-carousel';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  // fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  pbColor: "#DD2A7B",
  fgsColor:"#DD2A7B"

};
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
    AddStoryComponent,
    ListStoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    PickerModule,
    IvyCarouselModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
