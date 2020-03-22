export interface MealEntry {
  date: string;
  meals: {
    lunch?: string;
    dinner?: string;
  };
}
