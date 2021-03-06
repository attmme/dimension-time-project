import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class TaskGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  public canActivate() {
    if (this.authService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}