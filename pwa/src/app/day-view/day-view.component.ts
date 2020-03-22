import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MealSelectionDialogComponent } from "../meal-selection-dialog/meal-selection-dialog.component";

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

  constructor(public dialog: MatDialog) {
    this.todaysDate = new Date();
    this.todaysDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {}

  openMealSelection(type: "lunch" | "dinner") {
    const mealDialog = this.dialog.open(MealSelectionDialogComponent, {
      minWidth: "80vw",
      data: { day: this.day, type }
    });

    mealDialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
