import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MealSelectionDialogComponent } from "../meal-selection-dialog/meal-selection-dialog.component";
import { MealsService } from "../meals.service";
import { MealEntry } from "../models/MealEntry";

@Component({
  selector: "app-day-view",
  templateUrl: "./day-view.component.html",
  styleUrls: ["./day-view.component.scss"]
})
export class DayViewComponent implements OnInit {
  @Input() set date(entry: MealEntry) {
    this.entry = entry;
    this.day = new Date(entry.date);
    this.hasPast = this.day < this.todaysDate;
    this.isToday = this.day.valueOf() === this.todaysDate.valueOf();
  }

  todaysDate: Date;
  entry: MealEntry;
  day: Date;
  isToday: boolean;
  hasPast: boolean;

  constructor(public dialog: MatDialog, private mealsService: MealsService) {
    this.todaysDate = new Date();
    this.todaysDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {}

  openMealSelection(type: "lunch" | "dinner") {
    const mealDialog = this.dialog.open(MealSelectionDialogComponent, {
      minWidth: "80vw",
      data: { day: this.day, type }
    });

    mealDialog.afterClosed().subscribe((entry: MealEntry) => {
      if (!entry) return;
      this.entry = this.mealsService.upsertDay(entry);
    });
  }
}
