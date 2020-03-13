import { Component, OnInit } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  weekStarting$: BehaviorSubject<Date> = new BehaviorSubject(
    this.getLastMonday()
  );

  monday: Observable<Date> = this.weekStarting$.asObservable();
  tuesday: Observable<Date> = this.weekStarting$.pipe(
    map(startOfWeek => this.addDay(startOfWeek, 1))
  );
  wednesday: Observable<Date> = this.weekStarting$.pipe(
    map(startOfWeek => this.addDay(startOfWeek, 2))
  );
  thursday: Observable<Date> = this.weekStarting$.pipe(
    map(startOfWeek => this.addDay(startOfWeek, 3))
  );
  friday: Observable<Date> = this.weekStarting$.pipe(
    map(startOfWeek => this.addDay(startOfWeek, 4))
  );
  saturday: Observable<Date> = this.weekStarting$.pipe(
    map(startOfWeek => this.addDay(startOfWeek, 5))
  );
  sunday: Observable<Date> = this.weekStarting$.pipe(
    map(startOfWeek => this.addDay(startOfWeek, 6))
  );

  constructor() {}

  ngOnInit() {}

  changeWeek(direction: number) {
    const date = new Date(this.weekStarting$.value);
    date.setDate(date.getDate() + direction);
    this.weekStarting$.next(date);
  }

  private getLastMonday(): Date {
    const date = new Date();
    const day = date.getDay() + 6;
    date.setDate(date.getDate() - (day === 0 ? 7 : day) + 7);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private addDay(weekStarting: Date, numberOfDays: number): Date {
    const date = new Date(weekStarting);
    date.setDate(weekStarting.getDate() + numberOfDays);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
