import { AlertsService } from './../../shared/services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/shared/models/alert';
import { interval } from 'rxjs/internal/observable/interval';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public lat: number = 0;
  public lng: number = 0;

  public alert: Alert;
  public haveAlert: Boolean;

  constructor(private route: ActivatedRoute,
              public alertService: AlertsService) { }

  ngOnInit() {
    interval(5000).subscribe(() => {
    const id = this.route.snapshot.paramMap.get('id');
    this.alertService.getAlert(id).subscribe(
      res => {
        this.alert = res;
        this.haveAlert = true;
        this.lat = this.alert.latitude;
        this.lng = this.alert.longitude;
      }
    );
    })
  }
}
