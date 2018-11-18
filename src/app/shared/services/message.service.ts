import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { User } from '../models/user';
import { UsersService } from './users.service';
import { all } from 'q';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessageService {

  messages:Message[] = [];
  public myMessages: BehaviorSubject<Message[]> = new BehaviorSubject([]);
  public theirMessage: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  private subject = new Subject<any>();
  private message: String;


  public messages$: Observable<Message[]>;

  constructor(private afStore: AngularFirestore,
              private auth: AuthService,
              private users: UsersService,
              private router: Router,
              private http: HttpClient) {
                afStore.firestore.settings({
                  timestampsInSnapshots: false
                })
      this.messages$ = afStore.collection<Message>('messages').valueChanges();
  }

  async sendMessage(user: User, message: string) {

    const data = {
      from: this.users.authUser,
      to: user,
      message: message,
      createdAt: Date.now(),
    }
    const docRef = await this.afStore.collection('messages').add(data);

  }

  public getMessages() {
    this.afStore.collection('messages').ref
  }

  // public getMessages(children: User) {
  //   var myMsgs: Message[] = [];
  //   var theirMsgs: Message[] = [];

  //   console.log('Getting msgs...')
  //   var messagesCollection = this.afStore.collection('messages').ref;
  //   console.log(messagesCollection);
  //   var allMessages = messagesCollection.get()
  //     .then(snapshot => {
  //       snapshot.forEach(doc => {
  //         var message = doc.data();
  //         if (doc.data().from.username == this.users.authUser.username) {
  //           console.log("MESSAGE_FOUND");
  //           myMsgs.push(this.messageFactory(message));
  //         } else if (doc.data().to.username == children.username) {
  //           console.log("MESSAGE_FOUND");
  //           theirMsgs.push(this.messageFactory(message));
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       console.error('Error getting documents', err)
  //     });
  //   this.myMessages.next(myMsgs)
  //   this.theirMessage.next(theirMsgs)
  // }

  messageFactory(any: any) {
    var factory_message: Message = {
      from: any.from,
      to: any.to,
      message: any.message,
      createdAt: any.createdAt
    }
    return factory_message;
  }

}
