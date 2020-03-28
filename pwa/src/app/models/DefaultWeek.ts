import { MealEntry } from "./MealEntry";

export const defaultWeek = (weekStarting: Date): MealEntry[] => {
  const weekArr: MealEntry[] = [];

  [...Array(7).keys()].forEach(dayPos => {
    weekArr.push({ date: addDay(weekStarting, dayPos).toJSON(), meals: {} });
  });

  return weekArr;
};

export const compileWeek = (
  weekStarting: Date,
  mealEntries: MealEntry[]
): MealEntry[] => {
  const weekArr: MealEntry[] = [];

  [...Array(7).keys()].forEach(dayPos => {
    const day = addDay(weekStarting, dayPos).toJSON();
    const meals = mealEntries.find(m => m.date === day)?.meals ?? {};
    weekArr.push({ date: day, meals });
  });

  return weekArr;
};

function addDay(weekStarting: Date, numberOfDays: number): Date {
  const date = new Date(weekStarting);
  date.setDate(weekStarting.getDate() + numberOfDays);
  date.setHours(0, 0, 0, 0);
  return date;
}
