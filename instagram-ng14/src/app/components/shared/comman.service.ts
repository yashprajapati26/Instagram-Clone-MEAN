import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor(private http:HttpClient) { }

  public searchSubject = new Subject<number>();
  public NoOfNotification = new Subject<number>();

  sendSearchKey(data: any) {
    this.searchSubject.next(data)
  }

  reciveSearchKey(): Observable<number> {
    return this.searchSubject.asObservable();
  }

  sendNotificationNo(data:any){
    console.log("send : ",data)
    this.NoOfNotification.next(data);
  }

  reciveNotification(): Observable<any> {
    return this.NoOfNotification.asObservable();

  }

  searchUser(searchkey:any){
    let url = environment.apiURL + "/searchuser/" + searchkey
    console.log(url)
    return this.http.get(url)
  }
}
