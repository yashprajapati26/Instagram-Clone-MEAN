import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getFollowNotification(userId:any){
    let url = environment.apiURL + "/getfollowerNotification/" + userId
    return this.http.get(url)
  }

  getLikedNotification(userId:any){
    let url = environment.apiURL + "/getlikedNotification/" + userId
    return this.http.get(url)
  }

  getCmtsNotification(userId:any){
    let url = environment.apiURL + "/getcmtsNotification/" + userId
    return this.http.get(url)
  }
  
  requestAccept(data:any){
    let url = environment.apiURL + "/updateFollowingRequest/"
    return this.http.post(url,data)
  }
}
