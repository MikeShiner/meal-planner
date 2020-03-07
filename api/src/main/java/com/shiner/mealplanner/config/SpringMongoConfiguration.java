package com.shiner.mealplanner.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

@Configuration
public class SpringMongoConfiguration
{
  @Bean
  public MongoCustomConversions customConversions()
  {
    return new MongoCustomConversions(ZonedDateTimeConverter.getConverters());
  }
}

