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
  private authUser: User = null;

  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<User> {
    return this.httpClient.post(this.url + "/login", { username, password }).pipe(
      map((res: any) => {
        let user = this.userFromRes(res.user);
        user.token = res.token;
        this.saveUser();
        this.user$.next(user);
        return this.authUser;
      })
    );
  }

  public signUp(user: any): Observable<User> {
    return this.httpClient.post(this.url, user).pipe(
      map((res: any) => res.user),
      map(this.userFromRes)
    );
  }

  private userFromRes(res: any): User {
    let user: User = {
      username: res.username,
      displayName: res.displayName,
      email: res.email, // TODO: Backend should consider store emails
      password: res.password,
      photoURL: res.photoURL,
      roles: { subscriber: true },
      uid: res._id,
      since: new Date().getTime()
    };

    if (!user.displayName)
      user.displayName = (res.firstName && res.lastName) ? res.firstName + " " + res.lastName : res.username;
  
    return user;
  }

  private getAuthHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.authUser.token
    });
    return { headers };
  } 

  public isLoggedIn(): boolean {
    let user = localStorage.getItem("user");
    if(user)
      this.authUser = JSON.parse(user);
    
    return this.authUser != null;
  }

  public logout() {
    this.authUser = null;
    localStorage.removeItem("user");
  }

  private saveUser() {
    localStorage.setItem("user", JSON.stringify(this.authUser));
  }
}