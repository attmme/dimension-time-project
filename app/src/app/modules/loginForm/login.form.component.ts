//import { EventEmitter } from 'events';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-loginForm',
  templateUrl: './login.form.component.html',
  styleUrls: ['./login.form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() error: string | null;
  //@Output() submitEM = new EventEmitter();

  constructor(
    public trucazo_router: Router,
    public formBuilder: FormBuilder,
    public service: AuthService
  ) {}

  // Variables
  registerForm: FormGroup;
  submitted = false;
  resposta_server = 0;

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

      this.service.login(e, p).then(el => {
        this.resposta_server = 0; // resetejem

        console.log("Element: " );
        this.service.setToken(JSON.stringify(el.user.uid))

        this.trucazo_router.navigateByUrl('/tasks');
      })
      .catch((err) => {
        if (err.code == 'auth/user-not-found') {
          this.resposta_server = 1;
        } else if (err.code == 'auth/wrong-password') {
          this.resposta_server = 2;
        }
      });
    } else {
      return; // No envia res si el form és incorrecte
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
