import { Router } from '@angular/router';
import { AlertsService } from './../shared/services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { Alert } from '../shared/models/alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  public alerts: Alert[] = [];
  public severities = {
    'HIGH': 3,
    'MEDIUM': 2,
    'LOW': 1,
    '': 0
  }

  constructor(public alertService: AlertsService,
              public router: Router) { }

  ngOnInit() {
    this.alertService.getAlerts().subscribe(
      alerts => {
        this.alerts = alerts.sort((n1,n2) => this.severities[n2.severity] - this.severities[n1.severity]);
      });
  }


}


