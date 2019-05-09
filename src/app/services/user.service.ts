import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {RegisterRequest} from '../models/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public registerRequest: RegisterRequest;

  constructor() {
    this.registerRequest = {
      username: '',
      password: '',
      retypePassword: '',
      acceptedTerms: false
    };

    this.user = {
      id: null,
      username: ''
    };
  }

  clearForm(): void {
    this.registerRequest.username = '';
    this.registerRequest.password = '';
    this.registerRequest.retypePassword = '';
    this.registerRequest.acceptedTerms = false;
  }
}
