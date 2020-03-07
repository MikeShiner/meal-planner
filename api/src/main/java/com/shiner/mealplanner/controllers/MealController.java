package com.shiner.mealplanner.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.shiner.mealplanner.controllers.filters.MealFilter;
import com.shiner.mealplanner.dao.MealRepository;
import com.shiner.mealplanner.models.Meal;

@RestController
@RequestMapping(path = "meals", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class MealController
{

  @Autowired
  private MealRepository mealRepository;

  @RequestMapping(method = RequestMethod.GET)
  @GetMapping
  public @ResponseBody List<Meal> getMeals(@Valid MealFilter filter)
  {
    if (filter.getEndDate() != null && filter.getStartDate() != null)
    {
      return this.mealRepository.findMealsByDateRange(filter.getStartDate(), filter.getEndDate());
    }

    return this.mealRepository.findAll();
  }

  @RequestMapping(method = RequestMethod.POST)
  public @ResponseBody Meal addMeal(@RequestBody Meal meal)
  {
    return this.mealRepository.insert(meal);
  }

  @RequestMapping(method = RequestMethod.PATCH)
  public @ResponseBody ResponseEntity<Meal> updateMeal(@RequestBody Meal updateMeal)
  {
    Optional<Meal> existingMeal = this.mealRepository.findOneByTypeAndDate(updateMeal.getType(), updateMeal.getDate());

    if (existingMeal.isEmpty())
    {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    Meal meal = existingMeal.get();
    meal.setName(updateMeal.getName());
    this.mealRepository.save(meal);

    return new ResponseEntity<Meal>(meal, HttpStatus.OK);
  }

  @RequestMapping(path = "/{mealId}", method = RequestMethod.GET)
  public ResponseEntity<Meal> getMealById(@PathVariable("mealId") String mealId)
  {
    Optional<Meal> meal = this.mealRepository.findById(mealId);

    if (meal.isEmpty())
    {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<Meal>(meal.get(), HttpStatus.OK);
  }

}
