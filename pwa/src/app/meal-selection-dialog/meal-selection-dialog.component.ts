import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MealEntry } from "../models/MealEntry";

@Component({
  selector: "app-meal-selection-dialog",
  templateUrl: "./meal-selection-dialog.component.html",
  styleUrls: ["./meal-selection-dialog.component.scss"]
})
export class MealSelectionDialogComponent implements OnInit {
  addForm: FormGroup = this.fb.group({
    meal: this.fb.control("", [Validators.required])
  });
  constructor(
    public dialogRef: MatDialogRef<MealSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { day: Date; type: string; value: string },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!!this.data.value) {
      this.addForm.get("meal").setValue(this.data.value);
    }
  }

  submitMeal() {
    if (this.addForm.status === "VALID") {
      const mealEntry: MealEntry = {
        date: this.data.day.toJSON(),
        meals: {}
      };
      mealEntry.meals[this.data.type] = this.addForm.get("meal").value;
      this.dialogRef.close(mealEntry);
    }
  }
}
