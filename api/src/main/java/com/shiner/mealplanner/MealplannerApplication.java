package com.shiner.mealplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan({"com.shiner.mealplanner"})
public class MealplannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(MealplannerApplication.class, args);
    }

}
