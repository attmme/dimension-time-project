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

  constructor(private trucazo_router: Router, private fbService: FirebaseService) {
    //this.pare_asd = 'test';
  }

  // Formulari
  pare_asd: string; // Fa falta?
  usuari: string;
  email: string;
  pass1: string;
  pass2: string;

  // Validació camps
  valid = false;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    this.checkUser(); // Mirar com guardar user després
    this.checkMail();
    this.checkPass1();
    this.checkPass2();
    //if (this.form.valid) {
    //this.submitEM.emit(this.form.value);
    //this.fbService.registrar('pepito@pepito.com', '123456'); APAGAT
    //}
    // trucazo
    // this.trucazo_router.navigateByUrl('/tasks');
  }

  checkUser() {

  }

  checkMail() {

  }

  checkPass1() {

  }

  checkPass2() {

  }


}
