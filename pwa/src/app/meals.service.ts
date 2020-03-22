import { Injectable } from "@angular/core";
import { MealEntry } from "./models/MealEntry";

@Injectable({
  providedIn: "root"
})
export class MealsService {
  private mealCollection: MealEntry[];

  getDay(day: Date): MealEntry {
    return this.mealCollection.find(m => m.date === day.toJSON());
  }

  upsertDay(newEntry: MealEntry) {
    const index = this.mealCollection.findIndex(m => m.date === newEntry.date);
    if (index > -1) {
      this.mealCollection[index] = {
        date: newEntry.date,
        meals: {
          ...this.mealCollection[index].meals,
          ...newEntry.meals
        }
      };
      return;
    }

    this.mealCollection.push(newEntry);
  }

  constructor() {
    this.mealCollection = [];
  }
}
