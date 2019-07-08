import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserApiService} from '../services/user-api.service';

declare var grecaptcha: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  captchaError = false;

  private succesfull = false;

  constructor(public userService: UserService, private userApiService: UserApiService) {
  }

  ngOnInit() {
    window['getResponseCaptcha'] = this.validCaptcha.bind(this);
    console.log(this.userService.loggedIn);
  }

  validCaptcha(): void {
    this.captchaError = false;
  }



}
