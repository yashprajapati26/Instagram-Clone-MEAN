import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  
  createPost(data:object):Observable<any>{
    let url = environment.apiURL + "/createpost"
    return this.http.post(url,data)
  }

  getPostDetails(data:any):Observable<any>{
    let url = environment.apiURL + "/getsinglepost/" + data
    return this.http.get(url)
  }

  createComment(data:any):Observable<any>{
    let url = environment.apiURL + "/add-comment"
    return this.http.post(url,data)
  }

  deletePost(postId:any):Observable<any>{
    let url = environment.apiURL + "/deletepost/" + postId;
    return this.http.delete(url);
  }

}
