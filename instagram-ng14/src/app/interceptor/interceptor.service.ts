import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private authservice:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth_token = this.authservice.getToken();
    
    if(auth_token != null){
      const authRequest = req.clone({
        headers : req.headers.set('auth_token',auth_token)
      })
      return next.handle(authRequest);
    }

    return next.handle(req);

  }
}
