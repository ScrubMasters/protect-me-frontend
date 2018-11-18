import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = environment.BACKEND_URL + "/users";
  public authUser: User = null;

  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  public login(username: string, password: string): Observable<User> {
    return this.httpClient.post(this.url + "/login", { username, password }).pipe(
      map((res: any) => {
        let user = this.userFromRes(res.user);
        user.token = res.token;
        this.user$.next(user);
        this.authUser = user;
        this.saveUser();
        // volunteers this.router.navigate(['/childrens']);
        return this.authUser;
      })
    );
  }

  public signUp(user: any): Observable<User> {
    return this.httpClient.post(this.url + '/signup', user).pipe(
      map((res: any) => res.user),
      map(this.userFromRes)
    );
  }

  public userFromRes(res: any): User {
    let photo: string = res.userImage.replace(/PNG/g, "png");
    if(!photo.startsWith("http")) {
      photo = environment.BACKEND_URL + "/" + photo;
    }
    let user: User = {
      username: res.username,
      displayName: res.displayName,
      email: res.email, // TODO: Backend should consider store emails
      password: res.password,
      photoURL: photo,
      roles: res.userRole || "Volunteer",
      uid: res._id,
      since: new Date().getTime()
    };

    if (!user.displayName)
      user.displayName = (res.firstName && res.lastName) ? res.firstName + " " + res.lastName : res.username;

    return user;
  }

  public getAuthHeaders() {
    const httpOptions = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + this.authUser.token)
    };
    return httpOptions;
  }

  public isLoggedIn(): boolean {
    let user = localStorage.getItem("user");
    if (user) {
      this.authUser = JSON.parse(user);
      this.user$.next(this.authUser);
    }

    return this.authUser != null;
  }

  public logout() {
    this.authUser = null;
    this.user$.next(this.authUser);
    localStorage.removeItem("user");
    this.router.navigate(['/']);
  }

  private saveUser() {
    localStorage.setItem("user", JSON.stringify(this.authUser));
  }
}
