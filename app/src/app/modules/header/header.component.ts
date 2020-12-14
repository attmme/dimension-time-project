import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //
  @Input() fill_dada: string;

  constructor(
    private trucazo_router: Router,
    private service: AuthService
  ) { }

  ngOnInit(): void { }

  isLogged = () => localStorage.getItem('userId');

  clickResumen() { }

  clickLogout() {
    this.service.logout();
    this.trucazo_router.navigateByUrl('/login');
  }

  clickLogin() {
    this.service.logout();
    this.trucazo_router.navigateByUrl('/login');
  }

}
