import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MealSelectionDialogComponent } from "../meal-selection-dialog/meal-selection-dialog.component";
import { MealsService } from "../meals.service";
import { MealEntry } from "../models/MealEntry";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { OptionsComponent } from '../options/options.component';
import { Option } from '../options/option.enum';

@Component({
  selector: "app-day-view",
  templateUrl: "./day-view.component.html",
  styleUrls: ["./day-view.component.scss"]
})
export class DayViewComponent implements OnInit {
  @Input() set date(entry: MealEntry) {
    if (!entry) return;
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

  constructor(public dialog: MatDialog, private _bottomSheet: MatBottomSheet, private mealsService: MealsService) {
    this.todaysDate = new Date();
    this.todaysDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {}

  openOptions(type: "lunch" | "dinner", currentMeal: string) {
    const ref: MatBottomSheetRef = this._bottomSheet.open(OptionsComponent);
    ref.afterDismissed().subscribe((action: Option) => {
      if(action === Option.EDIT) {
        this.openMealSelection(type, currentMeal);
      }
    })
  }

  openMealSelection(type: "lunch" | "dinner", currentMeal: string) {
    const mealDialog = this.dialog.open(MealSelectionDialogComponent, {
      minWidth: "80vw",
      data: { day: this.day, type, value: currentMeal }
    });

    mealDialog.afterClosed().subscribe((entry: MealEntry) => {
      if (!entry) return;
      this.mealsService.upsertDay(entry);
    });
  }
}
