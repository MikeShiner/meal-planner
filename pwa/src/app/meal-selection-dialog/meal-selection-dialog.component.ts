import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
    @Inject(MAT_DIALOG_DATA) public data: { day: Date; type: string },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  submitMeal() {
    if (this.addForm.status === "VALID") {
      this.dialogRef.close(this.addForm.get("meal").value);
    }
  }
}
