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

// nou
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
//

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,

    LoginFormComponent,
    RegisterComponent,

    HeaderComponent,
    HomeComponent,
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
    MatDatepickerModule,

// nou
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
// nou
  ],
  exports: [CommonModule, MaterialModule, NgbModalModule, FlatpickrModule], // calen els dos últims(?)

  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
