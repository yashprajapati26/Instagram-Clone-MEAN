import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  createProfile(data:any){
    let url = environment.apiURL + "/createprofile"
    return this.http.post(url,data)
  }

  getUserDetails(userId:any){
    let url = environment.apiURL + "/userdetails/"+userId;
    return this.http.get(url)
  }

  getUserProfileDetails(data:any){
    let url = environment.apiURL + "/getuserprofile/" + data
    return this.http.get(url)
  }

  getUserPost(data:any){
    let url = environment.apiURL + "/getuserpost/" + data
    return this.http.get(url)
  }

  getUserFollowersFollowing(data:any){
    let url = environment.apiURL + "/getuser_accepted_followers_following/" + data
    return this.http.get(url)
  }

}
