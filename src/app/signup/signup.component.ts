import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserApiService} from '../services/user-api.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordInvalid = false;
  passwordInvalidMessage = '';

  retypePasswordInvalid = false;
  retypePasswordInvalidMessage = '';

  usernameInvalid = false;
  usernameInvalidMessage = '';

  termsInvalid = false;

  captchaError = false;

  private succesfull = false;

  constructor(public userService: UserService, private userApiService: UserApiService) {
  }

  ngOnInit() {
    window['getResponseCaptcha'] = this.validCaptcha.bind(this);
  }

  validCaptcha(): void {
    this.captchaError = false;
  }

  passwordIsValid(password: string): boolean {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+\|§°¦}{\'_=!\-*()@%&]).{8,100}$');
    if (password.length === 0) {
      this.passwordInvalidMessage = '*';
      this.passwordInvalid = true;
    } else if (password.match(regex)) {
      this.passwordInvalid = false;
    } else {
      this.passwordInvalidMessage = '(At least 8 characters. lower-, upper case, special characters)';
      this.passwordInvalid = true;
    }
    this.retypePasswordIsValid(this.userService.registrationRequest.retypePassword);
    return !this.passwordInvalid;
  }

  retypePasswordIsValid(retypePassword: string): boolean {
    if (retypePassword.length === 0) {
      this.retypePasswordInvalidMessage = '*';
      this.retypePasswordInvalid = true;
    } else {
      this.retypePasswordInvalidMessage = 'Passwords do not match';
      retypePassword === this.userService.registrationRequest.password ? this.retypePasswordInvalid = false : this.retypePasswordInvalid = true;
    }
    return !this.retypePasswordInvalid;
  }

  usernameIsValid(username: string): boolean {
    if (username.length === 0) {
      this.usernameInvalid = true;
      this.usernameInvalidMessage = '*';
    } else {
      if (username.indexOf(' ') >= 0) {
        this.usernameInvalidMessage = '(No Whitespace allowed )';
        this.usernameInvalid = true;
      } else {
        this.userApiService.checkUsername(username).subscribe(valid => {
          this.usernameInvalidMessage = '(Dieser Nutzername ist bereits vergeben)';
          this.usernameInvalid = !valid;
        });
      }
    }
    return !this.usernameInvalid;
  }

  termsIsValid(valid: boolean) {
    valid === false ? this.termsInvalid = true : this.termsInvalid = false;
    return !this.termsInvalid;
  }


  registerUser(): void {
    this.succesfull = true;

    if (!this.usernameIsValid(this.userService.registrationRequest.username)) {
      this.succesfull = false;
    }
    if (!this.passwordIsValid(this.userService.registrationRequest.password)) {
      this.succesfull = false;
    }
    if (!this.retypePasswordIsValid(this.userService.registrationRequest.retypePassword)) {
      this.succesfull = false;
    }
    if (!this.termsIsValid(this.userService.registrationRequest.acceptedTerms)) {
      this.succesfull = false;
    }

    const response = grecaptcha.getResponse();
    if (response.length === 0) {
      this.captchaError = true;
      this.succesfull = false;
    }

    this.userService.registrationRequest.recaptchaResponse = response;

    if (this.succesfull) {
      this.userApiService.register(this.userService.registrationRequest).subscribe(user => {
        if (user.status === 200) {
          this.userService.clearForm();
        }
      });
    }
    grecaptcha.reset();
  }
}
