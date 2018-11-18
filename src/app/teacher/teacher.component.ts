import { TeachersService } from './../shared/services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
<<<<<<< HEAD
import { interval } from 'rxjs';
=======
import { interval } from 'rxjs/internal/observable/interval';
>>>>>>> e99db5449d0ae69b7c290504f6f308c565748fd5

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  public childrens: User[] = [];

  constructor(public teachService: TeachersService) { }

  ngOnInit() {
    console.log('Getting students...');
    interval(5000).subscribe(() => {
      this.teachService.getChildren().subscribe(
        childrens => {
          console.log(childrens);
          this.childrens = childrens;
        }
      );
<<<<<<< HEAD
    });
=======
    })
>>>>>>> e99db5449d0ae69b7c290504f6f308c565748fd5
  }
}
