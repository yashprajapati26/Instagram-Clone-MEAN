import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getFollowRequest(userId:any){
    let url = environment.apiURL + "/getfollowers/" + userId
    return this.http.get(url)
  }

  getLikedNotification(userId:any){
    let url = environment.apiURL + "/getliked/" + userId
    return this.http.get(url)
  }
  
  requestAccept(data:any){
    let url = environment.apiURL + "/updateFollowingRequest/"
    return this.http.post(url,data)
  }
}
