import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor( private cookieService: CookieService, private http: Http) { }
  public processImageUrlLink(userData) {
    const token:string = this.cookieService.get('token');
    let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:4000/api/v1/profile/saveProfile',userData).toPromise().then((resp) => {
            if(resp.status == 200) {
              return Promise.resolve(resp);
            } else {
              return Promise.reject();
            }
      });
  }
}
