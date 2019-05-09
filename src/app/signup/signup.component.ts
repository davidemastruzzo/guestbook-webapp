import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserApiService} from '../services/user-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private passwordInvalid = false;
  private passwordInvalidMessage = '';

  private retypePasswordInvalid = false;
  private retypePasswordInvalidMessage = '';

  private usernameInvalid = false;
  private usernameInvalidMessage = '';

  private termsInvalid = false;

  private succesfull = false;

  constructor(public userService: UserService, private userApiService: UserApiService) {
  }

  ngOnInit() {
  }

  passwordIsValid(password: string): boolean {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+\|§°¦}{'_=!\-*()@%&]).{8,100}$");
    if (password.length === 0) {
      this.passwordInvalidMessage = '*';
      this.passwordInvalid = true;
    } else if (password.match(regex)) {
      this.passwordInvalid = false;
    } else {
      this.passwordInvalidMessage = '(At least 8 characters. lower-, upper case, special characters)';
      this.passwordInvalid = true;
    }
    this.retypePasswordIsValid(this.userService.registerRequest.retypePassword);
    return !this.passwordInvalid;
  }

  retypePasswordIsValid(retypePassword: string): boolean {
    if (retypePassword.length === 0) {
      this.retypePasswordInvalidMessage = '*';
      this.retypePasswordInvalid = true;
    } else {
      this.retypePasswordInvalidMessage = 'Passwords do not match';
      retypePassword === this.userService.registerRequest.password ? this.retypePasswordInvalid = false : this.retypePasswordInvalid = true;
    }
    return !this.retypePasswordInvalid;
  }

  usernameIsValid(username: string): boolean {
    console.log('username test');
    if (username.length === 0) {
      this.usernameInvalid = true;
      this.usernameInvalidMessage = '*';
    } else {
      this.usernameInvalidMessage = '(Dieser Nutzername ist bereits vergeben)';
      this.userApiService.checkUsername(username).subscribe(valid => {
        this.usernameInvalid = !valid;
      });
    }
    return !this.usernameInvalid;
  }

  termsIsValid(valid: boolean) {
    valid === false ? this.termsInvalid = true : this.termsInvalid = false;
    return !this.termsInvalid;
  }

  registerUser(): void {
    this.succesfull = true;
    if (!this.usernameIsValid(this.userService.registerRequest.username)) {
      this.succesfull = false;
    }
    if (!this.passwordIsValid(this.userService.registerRequest.password)) {
      this.succesfull = false;
    }
    if (!this.retypePasswordIsValid(this.userService.registerRequest.retypePassword)) {
      this.succesfull = false;
    }
    if (!this.termsIsValid(this.userService.registerRequest.acceptedTerms)) {
      this.succesfull = false;
    }

    if (this.succesfull) {
      this.userApiService.register(this.userService.registerRequest).subscribe(user => {
        this.userService.user = user;
        this.userService.clearForm();
      });
    }
  }
}
