import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  doLogin(data:object):Observable<any>{
    let url = environment.apiURL + "/login"
    return this.http.post(url,data)
  }
  
  doSignup(data:object):Observable<any>{
    let url = environment.apiURL + "/signup"
    return this.http.post(url,data)
  }

  doOtpVerify(data:any):Observable<any>{
    let url = environment.apiURL +"/otpverify"
    return this.http.post(url,data)
  }

  getUserDetails(data:any){
    let url = environment.apiURL + "/userdetails/" + data;
    return this.http.get(url)
  }


  // token services 

  saveToken(token:string){
    localStorage.setItem('AUTH_TOKEN',token)
  }

  removeToken(): void {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('userId');

  }

  getToken(): string | null {
    if (localStorage.getItem('AUTH_TOKEN')) {
      return localStorage.getItem('AUTH_TOKEN');
    }
    return null;
  }

  getUserId(): string | null {
    if (localStorage.getItem('userId')) {
      return localStorage.getItem('userId');
    }
    return null;
  }

}
