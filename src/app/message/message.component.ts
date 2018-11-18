import { AlertsService } from './../shared/services/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { Alert } from '../shared/models/alert';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Message } from '../shared/models/message';
import { UsersService } from '../shared/services/users.service';
import { interval } from 'rxjs/internal/observable/interval';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  childrenId: string;
  public children: User = undefined;
  public message: string;
  public messages: Message[] = []


  constructor(public messageService: MessageService,
              private route: ActivatedRoute,
              private alertService: AlertsService,
              public userService: UsersService) { }

  ngOnInit() {
    this.childrenId = this.route.snapshot.paramMap.get('id');
    this.alertService.getAlert(this.childrenId).subscribe(
      (res: Alert) => {
        this.children = res.createdBy;
      }
    );
    interval(3000).subscribe(() => {
      this.messageService.messages$.subscribe(res => {
        this.messages = res;
        this.messages = this.messages
          .filter(a => a.to.username == this.userService.authUser.username && a.from.username == this.children.username || (a.from.username == this.userService.authUser.username && a.to.username == this.children.username))
          .sort((a, b) => {

        return b.createdAt < a.createdAt ? 1 : -1;
        });
      });
    });
  }

  sendMessage(): void {
    console.log('Sending: ' + this.message + '...');
    // send message to subscribers via observable subject
    this.alertService.getAlert(this.childrenId).subscribe(
      (res: Alert) => {
        this.children = res.createdBy;
        console.log(this.children);
        this.messageService.sendMessage(res.createdBy, this.message);
      }
    );
  }
}

