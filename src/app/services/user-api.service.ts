import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RegistrationRequest} from '../models/RegistrationRequest';
import {LoginRequest} from '../models/LoginRequest';
import {Entry} from '../models/Entry';


@Injectable()
export class UserApiService {

  private token: string;

  private defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  // User
  public register(registrationRequest: RegistrationRequest): Observable<HttpResponse<User>> {
    return this.http.post<User>(environment.restURL + '/user/account/sign-up', registrationRequest, {
      observe: 'response',
      headers: this.defaultHeader
    });
  }

  public checkUsername(userName: string): Observable<boolean> {
    return this.http.post<boolean>(environment.restURL + '/user/account/username', userName, {headers: this.defaultHeader});
  }

  public login(loginRequest: LoginRequest) {
    return this.http.post('http://localhost:8080/login', loginRequest, {
      observe: 'response',
    })
  }

  public createEntry(message: string, token: string): Observable<HttpResponse<Entry>> {
    console.log(message);
    this.token = token;
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',  ` ${this.token}`)
    };
    return this.http.post<Entry>(environment.restURL + '/guestbook/entry', message, {
      observe: 'response',
      headers: header.headers
    })
  }

  getEntries(token: string): Observable<HttpResponse<Entry[]>> {
    console.log(token);
    this.token = token;
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization',  ` ${this.token}`)
    };
    return this.http.get<Entry[]>(environment.restURL + '/guestbook/entries', {
      observe: 'response',
      headers: header.headers
    });
  }
}
