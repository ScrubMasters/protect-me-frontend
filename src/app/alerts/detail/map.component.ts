import { Alert } from './../../shared/models/alert';
import { AlertsService } from './../../shared/services/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class MapComponent implements OnInit {
  public title: string = 'My first AGM project';
  public lat: number = 51.678418;
  public lng: number = 7.809007;

  public alert: Alert;
  public haveAlert: Boolean = false;

  constructor(private route: ActivatedRoute,
              private alertService: AlertsService) {}

  ngOnInit() {
    interval(3000).subscribe(() => {
    const id = this.route.snapshot.paramMap.get('id');
    this.alertService.getAlert(id).subscribe(
      res => {
        this.alert = res
        this.haveAlert = true;
      }
    );
  });
  }
}
