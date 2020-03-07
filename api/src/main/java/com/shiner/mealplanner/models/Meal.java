package com.shiner.mealplanner.models;

import java.time.ZonedDateTime;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Meal
{
  @Id
  private String id;

  private String name;

  private MealType type;

  private ZonedDateTime date;
}
