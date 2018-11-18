import { Router } from '@angular/router';
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

  constructor(public router: Router,
              public afService: AuthService,
              public userService: UsersService) { }

  ngOnInit() {
    // TODO
    //this.afService.user$.subscribe( user => this.user = user );
    this.userService.user$.subscribe( user =>{
      this.dbUser = user;
    });
    this.userService.isLoggedIn();
  }

  getLogStatus(): boolean {
    // TODO
    return this.afService.haveUser();
    return this.userService.isLoggedIn();
  }

  public actualPage() {
    var actualPage = this.router.url.split("/")[0];
    console.log(actualPage);
  }

}
