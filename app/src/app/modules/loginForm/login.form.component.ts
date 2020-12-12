//import { EventEmitter } from 'events';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-loginForm',
  templateUrl: './login.form.component.html',
  styleUrls: ['./login.form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() error: string | null;
  //@Output() submitEM = new EventEmitter();

  constructor(
    private trucazo_router: Router,
    private formBuilder: FormBuilder,
    private fbService: FirebaseService
  ) { }

  // Variables
  registerForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Es miren els errors en password/email, tamanys, etc
  get f() {
    return this.registerForm.controls;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    // Si el format és vàlid, fa l'intent de login
    if (!this.registerForm.invalid) {
      let e = this.registerForm.value.email;
      let p = this.registerForm.value.password;

      this.fbService.login(e, p).then(() => {
        this.trucazo_router.navigateByUrl('/tasks');
      }).catch(() => {
        console.log("USUARI INCORRECTE") // Treure pel front-end
      });
    } else {
      return; // No es deixa continuar
    }

    // Possiblement BORRAR
    /*     
    if (this.form.valid) {
      console.log("Dins del form valid")

      this.submitEM.emit(this.form.value);
    } else {
      console.log("Dins del else form valid")
    }
     */
    // Possiblement BORRAR
    this.submitted = true;

  }

}