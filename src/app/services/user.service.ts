import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public registerUsername: string;
  public registerPassword: string;
  public acceptedTerms: boolean;
  constructor() { }
}
