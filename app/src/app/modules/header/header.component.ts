import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private trucazo_router: Router) {}

  ngOnInit(): void {}

  clickResumen() {}

  clickLogout() {
    this.trucazo_router.navigateByUrl('/login');
  }
}
