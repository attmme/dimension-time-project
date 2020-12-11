import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  ngOnInit(): void { }

  constructor(private trucazo_router: Router, private fbService: FirebaseService) { }

  // Formulari
  usuari: string;
  email: string;
  pass1: string;
  pass2: string;

  // Validació camps
  validUser: boolean;
  errorList = ['El campo está vacío', 'Introduce mínimo 6 carácteres', 'Introduce mínimo 8 carácteres']

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });


  submit() {
    this.validUser = true;
    this.checkUser(); // Mirar com guardar user després
    this.checkMail();
    this.checkPass1();
    this.checkPass2();

    if (this.validUser) {
      console.log("Enviar formulari ");
      this.fbService.registrar(this.usuari, this.email, this.pass1);
    }

    //if (this.form.valid) {
    //this.submitEM.emit(this.form.value);
    //}
    // trucazo
    // this.trucazo_router.navigateByUrl('/tasks');
  }

  checkUser() {
    let u = this.usuari;
    if (u == undefined || u.length <= 3 || u.length > 20) {
      this.validUser = false;
      console.log("Debug: error amb l'usuari.") // BORRAR
    }
  }

  checkMail() {
    let m = this.email;
    if (m == undefined) {
      this.validUser = false;
      console.log("Debug: error amb el mail.") // BORRAR
    }
  }

  checkPass1() {
    let p1 = this.pass1;
    if (p1 == undefined || p1.length < 6 || p1.length > 30) {
      this.validUser = false;
      console.log("Debug: error amb el primer pass.") // BORRAR
    }
  }

  checkPass2() {
    let p2 = this.pass2;
    if (p2 == undefined || p2 != this.pass1) {
      this.validUser = false;
      console.log("Debug: error amb el segon pass.") // BORRAR
    }


  }

}
