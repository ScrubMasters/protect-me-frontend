import { AlertsComponent } from './alerts/alerts.component';
import { TeacherComponent } from './teacher/teacher.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './alerts/detail/detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'childrens', component: TeacherComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'alerts/:id', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
