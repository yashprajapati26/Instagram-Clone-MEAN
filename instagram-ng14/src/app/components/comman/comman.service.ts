import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor() { }

  public searchSubject = new Subject<number>();


  sendSearchKey(data: any) {
    this.searchSubject.next(data)
  }

  reciveSearchKey():Observable<number>{
    return this.searchSubject.asObservable();
  }
  
}
