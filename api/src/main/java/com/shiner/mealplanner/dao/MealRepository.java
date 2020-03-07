package com.shiner.mealplanner.dao;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.shiner.mealplanner.models.Meal;
import com.shiner.mealplanner.models.MealType;

public interface MealRepository extends MongoRepository<Meal, String>
{
  public List<Meal> findByType(MealType type);
  
  @Query("{date: { $gte: ?0, $lte: ?1 } }")
  public List<Meal>findMealsByDateRange(ZonedDateTime start, ZonedDateTime end);
  
  public Optional<Meal> findOneByTypeAndDate(MealType type, ZonedDateTime date);
}
