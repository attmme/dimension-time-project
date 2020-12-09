import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

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
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [CommonModule, MaterialModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
