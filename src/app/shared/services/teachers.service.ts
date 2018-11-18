import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, filter } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  private children: User[];
  private url: string = environment.BACKEND_URL;

  constructor(private httpClient: HttpClient) { }

  public getChildren(): Observable<User[]> {
    return this.httpClient.get(this.url + "/users").pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      map((res: any) =>
        res.users.map(this.userFromRes)
      ),
      map((res: User[]) => res.filter(u => u.roles == "Children")),
    );
  }

  private userFromRes(res: any): User {
    let user: User = {
      username: res.username,
      displayName: res.displayName,
      email: res.email, // TODO: Backend should consider store emails
      password: res.password,
      photoURL: environment.BACKEND_URL + '/' + res.userImage.replace('PNG', 'png'),
      roles: res.userRole,
      uid: res._id,
      since: new Date().getTime()
    };

    if (!user.displayName)
      user.displayName = (res.firstName && res.lastName) ? res.firstName + " " + res.lastName : res.username;

    return user;
  }

}
