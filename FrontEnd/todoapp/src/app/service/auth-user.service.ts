import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RequestLogin} from '../models/requestLogin';
import { RequestSignUp } from '../models/RequestSignUp';
import { Response } from '../models/response';
import { CookieService } from 'ngx-cookie-service';


const AUTH_API = 'http://localhost:8081/api/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(req: RequestLogin): Observable<Response> {
    return this.http.post<Response>( AUTH_API + 'login',req, { withCredentials: true });

  }

  register(req: RequestSignUp): Observable<Response> {
    return this.http.post<Response>(AUTH_API + 'signup',req);
  }

  logout(): Observable<any> {
    // Entferne das Cookie
    //this.cookieService.delete('username', '/');
    return this.http.post(AUTH_API + 'logout', {}, { withCredentials: true });


  }
  getUsername(): string {
    // Lese den Benutzernamen aus dem Cookie
    return this.cookieService.get('username');
  }

}
