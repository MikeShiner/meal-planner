import { Injectable } from "@angular/core";
import { MealEntry } from "./models/MealEntry";
import {
  StorageMap,
  JSONSchemaObject,
  JSONSchema
} from "@ngx-pwa/local-storage";
import { map, tap, switchMap, filter } from "rxjs/operators";
import { Observable, ReplaySubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class MealsService {
  private static MEAL_COLLECTION_NAME = "meals";
  mealCollection$: ReplaySubject<MealEntry[]> = new ReplaySubject();

  upsertDay(newEntry: MealEntry) {
    this.storage
      .get<MealEntry[]>(MealsService.MEAL_COLLECTION_NAME)
      .pipe(
        map((collection: MealEntry[] = []) => {
          let entryIndex = collection.findIndex(
            entry => entry.date === newEntry.date
          );
          if (!collection[entryIndex]) {
            collection.push(newEntry);
            return collection;
          }
          collection[entryIndex].meals = {
            ...collection[entryIndex].meals,
            ...newEntry.meals
          };
          return collection;
        }),
        switchMap(collection =>
          this.storage.set(MealsService.MEAL_COLLECTION_NAME, collection)
        )
      )
      .subscribe();
  }

  constructor(private storage: StorageMap) {
    this.storage
      .has(MealsService.MEAL_COLLECTION_NAME)
      .pipe(
        filter(collection => !collection),
        switchMap(_ => this.storage.set(MealsService.MEAL_COLLECTION_NAME, []))
      )
      .subscribe();
    this.storage
      .watch<MealEntry[]>(MealsService.MEAL_COLLECTION_NAME)
      .subscribe(db => this.mealCollection$.next((db as MealEntry[]) ?? []));
  }
}
