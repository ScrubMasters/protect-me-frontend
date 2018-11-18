import { AlertsService } from './../shared/services/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { User } from '../shared/models/user';
import { Alert } from '../shared/models/alert';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Message } from '../shared/models/message';
import { map } from 'rxjs/operators';
import { UsersService } from '../shared/services/users.service';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  childrenId: string;
  public message: string;
  public messages: Message[] = []


  constructor(public messageService: MessageService,
              private route: ActivatedRoute,
              private alertService: AlertsService,
              public userService: UsersService) { }

  ngOnInit() {
    interval(5000).subscribe(() => {
      this.childrenId = this.route.snapshot.paramMap.get('id');
      this.messageService.messages$.subscribe(res => {
        this.messages = res;
        this.messages = this.messages
          .filter(a => a.to.username == this.userService.authUser.username || a.from.username == this.userService.authUser.username)
          .sort((a, b) => {
          return b.createdAt.getDate() - a.createdAt.getDate()
        });
      });
    });
  }

  sendMessage(): void {
    console.log('Sending: ' + this.message + '...');
    // send message to subscribers via observable subject
    this.alertService.getAlert(this.childrenId).subscribe(
      (res: Alert) => {
        this.messageService.sendMessage(res.createdBy, this.message);
      }
    );
  }

  // getMessages() {
  //   //this.messages =
  //   this.alertService.getAlert(this.childrenId).subscribe(
  //     (res: Alert) => {
  //       this.messageService.getMessages(res.createdBy);
  //     }
  //   );
  // }
}

