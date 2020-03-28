import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { MealsService } from "./meals.service";
import { MealEntry } from "./models/MealEntry";
import { defaultWeek, compileWeek } from "./models/DefaultWeek";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  weekStarting$: BehaviorSubject<Date> = new BehaviorSubject(
    this.getLastMonday()
  );

  week$: Observable<MealEntry[]> = combineLatest(
    this.mealsService.mealCollection$,
    this.weekStarting$
  ).pipe(map(([meals, weekStarting]) => compileWeek(weekStarting, meals)));

  monday: Observable<MealEntry> = this.week$.pipe(map(week => week[0]));
  tuesday: Observable<MealEntry> = this.week$.pipe(map(week => week[1]));
  wednesday: Observable<MealEntry> = this.week$.pipe(map(week => week[2]));
  thursday: Observable<MealEntry> = this.week$.pipe(map(week => week[3]));
  friday: Observable<MealEntry> = this.week$.pipe(map(week => week[4]));
  saturday: Observable<MealEntry> = this.week$.pipe(map(week => week[5]));
  sunday: Observable<MealEntry> = this.week$.pipe(map(week => week[6]));

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
}
