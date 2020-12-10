import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  pare_asd: string;

  constructor(private trucazo_router: Router, private fbService: FirebaseService) {
    this.pare_asd = 'test';
  }

  ngOnInit(): void { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.fbService.registrar('pepito@pepito.com', '123456');
    }

    // trucazo
    // this.trucazo_router.navigateByUrl('/tasks');
  }
}
