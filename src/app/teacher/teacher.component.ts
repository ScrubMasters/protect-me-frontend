import { TeachersService } from './../shared/services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  public childrens: User[] = [];

  constructor(public teachService: TeachersService) { }

  ngOnInit() {
    interval(3000).subscribe(() => {
      this.teachService.getChildren().subscribe(
        childrens => {
          console.log(childrens);
          this.childrens = childrens;
        }
      );
    })
  }

}
