import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedlistService {

  constructor(private http:HttpClient) { }

  getFeeds(){
    let url = environment.apiURL + "/getfeeds/"
    return this.http.get(url)
  }

  likedDislikePost(data:any){
    let url = environment.apiURL + "/like-dislike-post/" + data['postId'] +"/"+ data['userId']
    console.log(url)
    return this.http.get(url)
  }

  getUserDetails(data:any){
    let url = environment.apiURL + "/userdetails/" + data;
    return this.http.get(url)
  }

  getAllUsers(){
    let url = environment.apiURL + "/getallusers";
    return this.http.get(url)
  }

  doUndoFollowing(data:any){
    let url = environment.apiURL + "/do-undo-following";
    return this.http.post(url,data)
  }

}
