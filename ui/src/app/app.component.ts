import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navDate: Date;

  constructor() {
    this.navDate = this.getLastMonday();
  }

  changeWeek(direction: number) {
    const date = new Date(this.navDate);
    date.setDate(this.navDate.getDate() + direction);
    this.navDate = date;
  }

  getLastMonday(): Date {
    const date = new Date();
    const day = date.getDay() + 6;
    date.setDate(date.getDate() - (day === 0 ? 7 : day));
    return date;
  }
}
