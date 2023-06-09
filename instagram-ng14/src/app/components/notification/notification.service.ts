import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  readNotification(userId:any):Observable<any>{
    let url = environment.apiURL + "/readNotification/" + userId
    return this.http.get(url)
  }

  getNewNotification(userId:any):Observable<any>{
    let url = environment.apiURL + "/newNotification/" + userId
    return this.http.get(url)
  }

  getFollowNotification(userId:any):Observable<any> {
    let url = environment.apiURL + "/getfollowerNotification/" + userId
    return this.http.get(url)
  }

  getLikedNotification(userId:any):Observable<any>{
    let url = environment.apiURL + "/getlikedNotification/" + userId
    return this.http.get(url)
  }

  getCmtsNotification(userId:any):Observable<any>{
    let url = environment.apiURL + "/getcmtsNotification/" + userId
    return this.http.get(url)
  }
  
  requestAccept(data:any):Observable<any>{
    let url = environment.apiURL + "/updateFollowingRequest/"
    return this.http.post(url,data)
  }
}
