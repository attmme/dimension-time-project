import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginForm',
  templateUrl: './login.form.component.html',
  styleUrls: ['./login.form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  //
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  // <nou>
  registerForm: FormGroup;
  submitted = false;
  // </nou>
  //--------------------------------------------------nou
  constructor(
    private trucazo_router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // <nou>
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // </nou>
  }
  // <nou>
  get f() { // mirem el tema d'errors en password/email, tamanys, etc
    return this.registerForm.controls;
  }
  // </nou>

  // <---- provar>
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    /* if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    } */

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // trucazo
    this.trucazo_router.navigateByUrl('/tasks');
  }

  // </---- provar>
}
