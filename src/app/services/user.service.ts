import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {RegistrationRequest} from '../models/RegistrationRequest';
import {LoginRequest} from '../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public registrationRequest: RegistrationRequest;
  public loginRequest: LoginRequest;

  constructor() {
    this.registrationRequest = {
      username: '',
      password: '',
      retypePassword: '',
      acceptedTerms: false,
      recaptchaResponse: ''
    };

    this.loginRequest = {
      username: '',
      password: '',
    };

    this.user = {
      id: null,
      username: ''
    };
  }

  clearForm(): void {
    this.registrationRequest.username = '';
    this.registrationRequest.password = '';
    this.registrationRequest.retypePassword = '';
    this.registrationRequest.acceptedTerms = false;
    this.registrationRequest.recaptchaResponse = '';
  }
}
