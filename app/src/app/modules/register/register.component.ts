import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  pare_asd: string;

  constructor(private trucazo_router: Router) {
    this.pare_asd = 'test';
  }

  ngOnInit(): void { }

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

}
