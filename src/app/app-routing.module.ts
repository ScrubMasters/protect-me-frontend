import { VolunteerGuard } from './guards/volunteer.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { MessageComponent } from './message/message.component';
import { AlertsComponent } from './alerts/alerts.component';
import { TeacherComponent } from './teacher/teacher.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './alerts/detail/detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'childrens', component: TeacherComponent, canActivate: [TeacherGuard] },
  { path: 'alerts', component: AlertsComponent, canActivate: [VolunteerGuard]  },
  { path: 'alerts/:id', component: DetailComponent, canActivate: [VolunteerGuard]  },
  { path: 'volunteers/chat/:id', component: MessageComponent, canActivate: [VolunteerGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
