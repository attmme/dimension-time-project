import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FakeBackendComponent } from './shared/helpers/fake-backend/fake-backend.component';
import { MaterialComponent } from './shared/material/material/material.component';



@NgModule({
  declarations: [RegisterFormComponent, UsersListComponent, UserDetailsComponent, RegisterComponent, UsersComponent, UserComponent, HeaderComponent, HeroComponent, SidebarComponent, FakeBackendComponent, MaterialComponent],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
