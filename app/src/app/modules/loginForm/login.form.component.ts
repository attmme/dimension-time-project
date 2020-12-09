import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from 'events';

import { Router } from '@angular/router';

@Component({
  selector: 'app-loginForm',
  templateUrl: './login.form.component.html',
  styleUrls: ['./login.form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private trucazo_router: Router) {}

  ngOnInit(): void {}

  // <---- provar>
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    /* if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    } */

    // trucazo
    this.trucazo_router.navigateByUrl('/tasks');
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  // </---- provar>
}
