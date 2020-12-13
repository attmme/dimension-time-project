import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/register/register.component';
import { TaskComponent } from './modules/tasks/task/task.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskComponent /* , canActivate: [AuthGuard] */  }, // apagat per a debuggear

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
