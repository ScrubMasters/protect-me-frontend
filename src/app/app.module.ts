// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { WellcomeComponent } from './application/wellcome/wellcome.component';
import { ProfileComponent } from './auth/profile/profile.component'

// Firebase Configs
import { firebaseConfig } from './firebase.config';

// Services
import { UsersService } from './shared/services/users.service';
import { TeacherComponent } from './teacher/teacher.component';
import { AlertsComponent } from './alerts/alerts.component';
import { DetailComponent } from './alerts/detail/detail.component';
import { MapComponent } from './alerts/detail/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    WellcomeComponent,
    ProfileComponent,
    TeacherComponent,
    AlertsComponent,
    DetailComponent,
    MapComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    // Bootstrap
    MDBBootstrapModule.forRoot(),
    // Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBVXjdqf6dk7i9ivXH-7zZHrLKWBwZNlE'
    })
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
