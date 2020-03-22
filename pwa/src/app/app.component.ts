import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { MealsService } from "./meals.service";
import { MealEntry } from "./models/MealEntry";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  weekStarting$: BehaviorSubject<Date> = new BehaviorSubject(
    this.getLastMonday()
  );

  monday: Observable<MealEntry> = this.weekStarting$.pipe(
    map(startOfWeek => this.mealsService.getDay(startOfWeek))
  );
  tuesday: Observable<MealEntry> = this.weekStarting$.pipe(
    map(startOfWeek => this.mealsService.getDay(this.addDay(startOfWeek, 1)))
  );
  wednesday: Observable<MealEntry> = this.weekStarting$.pipe(
    map(startOfWeek => this.mealsService.getDay(this.addDay(startOfWeek, 2)))
  );
  thursday: Observable<MealEntry> = this.weekStarting$.pipe(
    map(startOfWeek => this.mealsService.getDay(this.addDay(startOfWeek, 3)))
  );
  friday: Observable<MealEntry> = this.weekStarting$.pipe(
    map(startOfWeek => this.mealsService.getDay(this.addDay(startOfWeek, 4)))
  );
  saturday: Observable<MealEntry> = this.weekStarting$.pipe(
    map(startOfWeek => this.mealsService.getDay(this.addDay(startOfWeek, 5)))
  );
  sunday: Observable<MealEntry> = this.weekStarting$.pipe(
    map(startOfWeek => this.mealsService.getDay(this.addDay(startOfWeek, 6)))
  );

  constructor(private mealsService: MealsService) {}

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
