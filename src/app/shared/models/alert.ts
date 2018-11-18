import { User } from "./user";
import { getLocaleDateFormat } from "@angular/common";

export interface Alert {
  id: string;
  severity: string; //low-medium-high
  createdBy: User;
  date: Date;
  latitude: number;
  longitude: number;
}

export function getDay() {
  return 'Monday'
}
