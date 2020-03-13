import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-day-view",
  templateUrl: "./day-view.component.html",
  styleUrls: ["./day-view.component.scss"]
})
export class DayViewComponent implements OnInit {
  @Input() set date(date: Date) {
    this.day = date;
    this.hasPast = date < this.todaysDate;
    this.isToday = date.valueOf() === this.todaysDate.valueOf();
  }

  todaysDate: Date;
  day: Date;
  isToday: boolean;
  hasPast: boolean;

  constructor() {
    this.todaysDate = new Date();
    this.todaysDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {}
}
