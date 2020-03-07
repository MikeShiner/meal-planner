package com.shiner.mealplanner.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;

@Configuration
public class ObjectMapperConfig
{
  @Bean
  public ObjectMapper jacksonObjectMapper()
  {
 // using the builder allows the correct modules to be registered for
    // this converter
    Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();

    // prevent timezones being adjusted to the running location
    builder.featuresToDisable(DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE);

    // ignore extra properties from the messages
    builder.featuresToDisable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

    // Disable datetimes being written as numerical timestamps
    builder.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    // enables pretty print
    builder.featuresToEnable(SerializationFeature.INDENT_OUTPUT);

    // prevent null fields from being included in serialisation
    builder.serializationInclusion(Include.NON_NULL);
    
    ObjectMapper mapper = builder.build();
    mapper.registerModules(new ParameterNamesModule(), new Jdk8Module(), new JavaTimeModule());
    return mapper;
  }
  
}
