import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPipe } from './pages/login.pipe';



@NgModule({
  declarations: [LoginFormComponent, LoginPipe],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
