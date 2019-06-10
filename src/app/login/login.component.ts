import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserApiService} from '../services/user-api.service';
import {Router} from '@angular/router';
import {BookService} from '../services/book.service';
import {Entry} from '../models/Entry';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin = false;
  messages: Entry[];
  token: string;

  constructor(public userService: UserService, private router: Router, private userApiService: UserApiService, private bookService: BookService) {
  }

  ngOnInit() {
    window['onSignIn'] = this.onSignIn.bind(this);
  }

  loadEntries() {
    this.userApiService.getEntries(this.token).subscribe(response => {
      this.messages = response.body;
    })
  }

  loginUser(): void {
    this.userApiService.login(this.userService.loginRequest).subscribe(response => {
      if (response.status === 200) {
        this.userService.user.token = response.headers.get("Authorization");
        this.token = this.userService.user.token;
        this.userService.loggedIn = true;
        this.invalidLogin = false;
        this.loadEntries();
      }
    }, error => {
      this.invalidLogin = true;

    });
  }

  onSignIn(googleUser): void {
    const profile = googleUser.getBasicProfile();
    this.userService.loggedIn = true;
  }

  signOut(): void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
  }

  logout(): void {
    gapi.auth2.getAuthInstance().signOut();
    this.userService.loggedIn = false;
  }

  createEntry(): void {
    this.userApiService.createEntry(this.bookService.message, this.userService.user.token).subscribe(response => {
      this.loadEntries();
    });
  }
}
