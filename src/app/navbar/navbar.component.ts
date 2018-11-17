import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;
  dbUser: User;
  logged: boolean;

  constructor(public afService: AuthService,
                private userService: UsersService) { }

  ngOnInit() {
    // TODO
    //this.afService.user$.subscribe( user => this.user = user );
    this.userService.user$.subscribe( user =>{
      this.dbUser = user;
      console.log(this.dbUser);
    });
  }

  getLogStatus(): boolean {
    // TODO
    return this.afService.haveUser();
    return this.userService.isLoggedIn();
  }
}
