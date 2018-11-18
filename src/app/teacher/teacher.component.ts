import { TeachersService } from './../shared/services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  public childrens: User[] = [];

  constructor(public teachService: TeachersService) { }

  ngOnInit() {
    console.log('Getting students...')
    this.teachService.getChildren().subscribe(
      childrens => {
        console.log(childrens);
        this.childrens = childrens;
      }
    );
  }

}