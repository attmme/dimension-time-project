import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbService: FirebaseService) { }
  isLogged = false;

  public login(e, p) {
    return this.fbService.login(e, p);
  }

  public canviarEstat(estat: boolean){
    this.isLogged = estat;
  }
}
