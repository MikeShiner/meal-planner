import { Injectable } from "@angular/core";
import { MealEntry } from "./models/MealEntry";

@Injectable({
  providedIn: "root"
})
export class MealsService {
  private mealCollection: MealEntry[];

  getDay(day: Date): MealEntry {
    return (
      this.mealCollection.find(m => m.date === day.toJSON()) ?? {
        date: day.toJSON(),
        meals: {}
      }
    );
  }

  upsertDay(newEntry: MealEntry): MealEntry {
    const index = this.mealCollection.findIndex(m => m.date === newEntry.date);
    if (index > -1) {
      const entry = {
        date: newEntry.date,
        meals: {
          ...this.mealCollection[index].meals,
          ...newEntry.meals
        }
      };
      this.mealCollection[index] = entry;
      return entry;
    }

    this.mealCollection.push(newEntry);
    return newEntry;
  }

  constructor() {
    this.mealCollection = [];
  }
}
