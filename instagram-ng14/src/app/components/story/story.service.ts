import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

  createStory(data: any): Observable<any> {
    let url = environment.apiURL + "/createStory";
    return this.http.post(url, data)
  }

}
