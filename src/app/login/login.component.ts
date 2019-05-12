import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserApiService} from '../services/user-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordInvalid = false;
  passwordInvalidMessage = '';

  usernameInvalid = false;
  usernameInvalidMessage = '';

  constructor(public userService: UserService, private router: Router, private userApiService: UserApiService) {
  }

  ngOnInit() {
  }

  loginUser(): void {

    this.userApiService.login(this.userService.loginRequest).subscribe(response => {
      if (response.status === 200) {
        this.userService.clearForm();
        console.log(response.headers.getAll('Authorization'));
      }
    });
  }

}
