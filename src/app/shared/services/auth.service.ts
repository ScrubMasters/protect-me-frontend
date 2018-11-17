import { Injectable } from '@angular/core';
import { of as observableOf, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user';
import * as firebase from 'firebase/app';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  private uid;
  isAdmin = observableOf(true);

  constructor(private afAuth: AngularFireAuth,
              private afStore: AngularFirestore,
              private usersService: UsersService) {
    this.user$ = afAuth.authState.pipe(switchMap( user => {
      if (user) {
        this.uid = firebase.auth().currentUser.uid;
        return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    } ));
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( (credential) => {
      this.updateUser(credential.user);
    });
  }

  public loginWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then( (credential) => {
      this.updateUser(credential.user);
    });
  }

  public logout() {
    this.afAuth.auth.signOut();
    this.usersService.logout();
  }

  public haveUser(): boolean {
    return firebase.auth().currentUser != null;
  }

  private updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc<User>(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      username: user.displayName.replace(/ /g, '-'),  // Generate username
      password: this.generatePassword(),              // Generate random password for firebase users
      photoURL: user.photoURL,
      roles: {
        subscriber: true,
      },
      since: this.getTime()
    };

    userRef.get().subscribe((doc: any) => {
      if (!doc.exists) { // If not exists create new user on firebase storage
        // Register to our backend too
        console.log('REGISTER NEW USER');
        // this.usersService.signUp(data).subscribe(
        //   () => userRef.set(Object.assign({}, data)),
        //   err => console.error(err)
        // );
        // Store user document to firebase backend
        userRef.set(Object.assign({}, data));
      } else {
        // Get the existing password
        data.password = doc.data().password;
        console.log('LOGGING EXISTING USER');
        // Login with user service too
        // this.usersService.login(user.displayName, user.password).subscribe(
        //   res => userRef.set(Object.assign({}, res)),
        //   err => console.error(err)
        // );
      }
    });
  }

  private getTime(): number {
    return new Date().getTime();
  }

  private generatePassword(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
