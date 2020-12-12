import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  // <nou>
  registerForm: FormGroup;
  submitted = false;
  // </nou>


  constructor(private trucazo_router: Router, private fbService: FirebaseService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      usuari_form: ['', [Validators.required, Validators.minLength(2)]],
      email_form: ['', [Validators.required, Validators.email]],
      password_form: ['', [Validators.required, Validators.minLength(6)]],
      password_check_form: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  get funcio_formulari() { // mirem el tema d'errors en password/email, tamanys, etc
    return this.registerForm.controls;
  }

  // Validació camps
  validUser: boolean;

  submit() {

    // Si és invàlid no seguim
    if (!this.registerForm.invalid) {
      this.fbService.registrar(
        this.registerForm.value.usuari_form,
        this.registerForm.value.email_form,
        this.registerForm.value.password_form).catch((err) => {
          if (err.code == "auth/email-already-in-use")
            console.log('El mail ja existeix.'); // Treure pel front-end
        })
    } else {
      return;
    }
    //this.trucazo_router.navigateByUrl('/tasks'); // trucazo
    // this.submitted = true;
  }


}
