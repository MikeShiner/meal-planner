package com.shiner.mealplanner.controllers.filters;

import java.time.ZonedDateTime;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class MealFilter
{

  @NotNull
  ZonedDateTime startDate;

  @NotNull
  ZonedDateTime endDate;
  
  public void setStartDate(String date) {
    this.startDate = ZonedDateTime.parse(date); 
  }
  
  public void setEndDate(String date) {
    this.endDate = ZonedDateTime.parse(date); 
  }

}
