import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL='https://akademi-cp.bitlo.com/api/interview/auth';

  constructor(private http:HttpClient) {}
    login(username:string,password:string):Observable<any>{
      const res={
        identifier:username,
        password:password
      };

      return this.http.post(`${this.BASE_URL}/login`,res);
    }
   }

