import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  registerUser(): void {
    if (this.userService.registerUsername != null &&
        this.userService.registerPassword != null &&
        this.userService.acceptedTerms !== false) {
    }
  }

}
