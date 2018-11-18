import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class MessageService {

  messages$: Observable<User>;
  private subject = new Subject<any>();
  private message: String;

  constructor(private afStore: AngularFirestore,
              private auth: AuthService,
              private users: UsersService,
              private router: Router ) {
  }

  async createMsg(user: User) {

    const data = {
      from: this.users.authUser,
      to: user,
      message: this.message,
      createdAt: Date.now(),
    }

    const docRef = await this.afStore.collection('messages').add(data);

  }

  async sendMessage(chatId, content) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afStore.collection('chats').doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

}
