import { UsersService } from 'src/app/shared/services/users.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../models/alert';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alerts$: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>(null);
  private alerts: Alert[];
  private url: string = environment.BACKEND_URL;

  constructor(private httpClient: HttpClient,
              private userService: UsersService) { }

  public getAlerts(): Observable<Alert[]> {
    const headers = this.userService.getAuthHeaders();

    return this.httpClient.get(this.url + "/alerts", headers).pipe(
      map((res: any) => {
        return res.alerts;
      }),
      map((res: any) =>
        res.map(this.alertFromRes)
      )
    );
  }

  private alertFromRes(res: any): Alert {
    let photo: string = res.createdBy.userImage.replace(/PNG/g, "png");
    if(!photo.startsWith("http")) {
      photo = environment.BACKEND_URL + "/" + photo;
    }
    let alert: Alert = {
      id: res._id,
      severity: res.severity, //low-medium-high
      createdBy:
      {
        username: res.createdBy.username,
        displayName: res.createdBy.displayName,
        email: res.createdBy.email, // TODO: Backend should consider store emails
        password: res.createdBy.password,
        photoURL: photo,
        roles: res.createdBy.userRole || "Volunteer",
        uid: res.createdBy._id,
        since: new Date().getTime()
      },
      date: new Date(res.creation_date),
      latitude: res.latitude,
      longitude: res.longitude,
    };
    return alert;
  }

  public getAlert(id: string): Observable<Alert> {
    const headers = this.userService.getAuthHeaders();

    return this.httpClient.get(this.url + "/alerts/" + id, headers).pipe(
      map((res: any) => {
          return this.alertFromRes(res.alert)

        }
      )
    );
  }

}
