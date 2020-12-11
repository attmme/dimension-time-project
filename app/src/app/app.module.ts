import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // CUSTOM_ELEMENTS_SCHEMA

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './modules/tasks/task-list/task-list.component';
import { TaskComponent } from './modules/tasks/task/task.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginFormComponent } from './modules/loginForm/login.form.component';
import { MaterialModule } from './shared/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './modules/header/header.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from './shared/fireBase.auth';
import { AuthService } from './shared/services/auth.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RegisterFormComponent } from './modules/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,

    LoginFormComponent,
    RegisterComponent,
    TaskComponent,
    HeaderComponent,
    HomeComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatMomentDateModule,
    MatDatepickerModule
  ],
  exports: [CommonModule, MaterialModule],

  providers: [AuthService], // cal?
  bootstrap: [AppComponent]
})
export class AppModule { }
