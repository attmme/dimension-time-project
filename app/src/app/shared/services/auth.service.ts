import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbService: FirebaseService) { }

  public login = (e, p) => this.fbService.login(e, p);

  public logout = () => {
    this.fbService.logout()
  };

  public setToken(token): void {
    localStorage.setItem('userId', token);
  }

  public getToken() {
    return localStorage.getItem('userId');
  }

  public getUserName() {
    return this.fbService.readDoc("users", this.getToken());
  }
}
