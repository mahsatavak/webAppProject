import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RequestLogin} from '../models/requestLogin';
import { RequestSignUp } from '../models/RequestSignUp';
import { Response } from '../models/response';


const AUTH_API = 'http://localhost:8081/api/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http: HttpClient) { }

  login(req: RequestLogin): Observable<Response> {
    return this.http.post<Response>( AUTH_API + 'login',req);

  }

  register(req: RequestSignUp): Observable<Response> {
    return this.http.post<Response>(AUTH_API + 'signup',req);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { });
  }


}
