import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackEPS-template';
  private userExists: BehaviorSubject<Boolean>;
  public showToast = false;

  constructor(public auth: AuthService) {
    this.auth.existentUser.subscribe( (value) => {
      if (value === true) {
        this.showToast = true;
      } else {
        this.showToast = false;
      }
    });
  }



}
