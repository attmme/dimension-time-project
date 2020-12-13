import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/register/register.component';
import { TaskComponent } from './modules/tasks/task/task.component';
import { TaskGuard } from './shared/guards/task.guard';
import { HomeGuard } from './shared/guards/home.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent/* , canActivate: [HomeGuard] */ },
  { path: 'register', component: RegisterComponent/* , canActivate: [HomeGuard] */ },
  { path: 'tasks', component: TaskComponent /* , canActivate: [TaskGuard] */ },

  /* { path: '', redirectTo: 'home', pathMatch: 'full' }, */ // Es pot borrar, no hi ha cap canvi
  { path: '**', component: HomeComponent/* , canActivate: [HomeGuard] */ },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
