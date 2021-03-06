import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  logged: boolean;

  constructor(public afService: AuthService,
              public usersService: UsersService) { }

  ngOnInit() {
    this.usersService.user$.subscribe( user => this.user = user );
  }

  login() {
    this.afService.loginWithGoogle();
  }

  private logout() {
    this.afService.logout();
    this.usersService.logout();
  }

  getLogStatus(): boolean {
    return this.afService.haveUser();
  }
}
