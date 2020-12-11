import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

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
    private formBuilder: FormBuilder,
    private fbService: FirebaseService
  ) { }

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
    // Fer logueo
    console.log("Enviar formulari ");
    let email = this.registerForm.value.email;
    let pass = this.registerForm.value.password;

    this.fbService.login(email, pass).then(() => {
      this.trucazo_router.navigateByUrl('/tasks');
    }).catch(() => {
      // Retornar usuari incorrecte
      console.log("USUARI INCORRECTE")
    });

    // Possiblement BORRAR

    /* if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    } */

    // Possiblement BORRAR
    this.submitted = true;

    // Possiblement BORRAR
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

  }

}