import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { CookieService } from 'ng2-cookies';
import { Router } from "@angular/router";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]

})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private cookieService: CookieService, 
    private router:Router) {}

  ngOnInit(): void {
    const token: string = this.cookieService.get('token');
    if(token){
      this.router.navigate(['home']);
    }
  }

  public onSubmit(f: NgForm) {
    let userData = { //TODO: need to be passed securely via header 
      username:f.value.email,
      password:f.value.password
    }
    this.loginService.processLogin(userData).then((resp)=> {
      if(resp) {
        let postData = JSON.parse(JSON.parse(JSON.stringify(resp))._body);
        this.cookieService.deleteAll('/')
        this.cookieService.set('token', postData.token);
        this.router.navigate(['home']);
      }
    });
  }


}
