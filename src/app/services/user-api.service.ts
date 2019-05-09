import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RegisterRequest} from '../models/RegisterRequest';


@Injectable()
export class UserApiService {

  private defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
  }

  // User
  public register(registerRequest: RegisterRequest): Observable<User> {
    return this.http.post<User>(environment.restURL + '/user/account/sign-up', registerRequest, {headers: this.defaultHeader});
  }

  public checkUsername(userName: string): Observable<boolean> {
    return this.http.post<boolean>(environment.restURL + '/user/account/username', userName, {headers: this.defaultHeader});
  }

}
