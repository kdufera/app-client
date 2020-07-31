import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private cookieService: CookieService, private http: Http) { }

  public processLogin(userData) {
    this.cookieService.deleteAll('/');
    let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/v1/auth/login',userData).toPromise().then((resp) => {
            if(resp.status == 200) {
              return Promise.resolve(resp);
            } else {
              return Promise.reject(resp);
            }
        });
  }
}
