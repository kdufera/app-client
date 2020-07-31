import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ng2-cookies';
import { Router } from "@angular/router";
import {HomeService} from "./home.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private homeService:HomeService,private cookieService: CookieService, private router:Router) { }

  public displayUrlForm:boolean;
  public selectedUrlType:String;
  public displayFinalView:boolean;
  public displayMainView:boolean;
  public submitButtonState:boolean;
  private token: string;
  public displaySpinner:boolean;
  public displayError:boolean;


  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    if(!this.token) {
     this.router.navigate(['']);
    } else  {
      this.displayUrlForm = false;
      this.displayFinalView = false;
      this.submitButtonState = false;
      this.displaySpinner = false;
      this.displayMainView = true;
      this.displayError = false;
     }
  }

  public onSubmit(f: NgForm): void {
    let userData = {
      imageType: this.selectedUrlType,
      imageUrl:f.value.url,
      token:this.token
    }
    this.displayMainView = false;
    this.displaySpinner = true;
    this.homeService.processImageUrlLink(userData).then((resp) => {

      if(resp) {
        setTimeout(() => {
            this.displaySpinner = false;
            this.displayFinalView = true;
        },1000); 
        setTimeout(() => {
          this.displayFinalView = false;
          this.displayMainView = true;
        },4000);
    }
    });
  }

  public processImageUrl(urlType):void {
    this.displayUrlForm = true;
    this.selectedUrlType = urlType;
  }

  public validateUrl(event): void {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    this.displayError = !regexp.test(event.target.value);
    this.submitButtonState =  regexp.test(event.target.value);
  }

  public logout():void {
    this.cookieService.deleteAll('/');
    this.router.navigate(['']);
  }

}
