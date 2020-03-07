package com.shiner.mealplanner.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum MealType
{
  DINNER("dinner"),
  LUNCH("lunch");

  private String value;

  @Override
  public String toString()
  {
    return this.value;
  }

  @JsonValue
  public String value()
  {
    return this.value;
  }

  @JsonCreator
  public static MealType fromValue(String value)
  {
    for (MealType m : MealType.values())
    {
      if (m.value.equalsIgnoreCase(value))
      {
        return m;
      }
    }
    return null;
  }

}
