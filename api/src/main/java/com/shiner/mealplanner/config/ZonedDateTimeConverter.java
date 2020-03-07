package com.shiner.mealplanner.config;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;

public class ZonedDateTimeConverter
{
  private ZonedDateTimeConverter()
  {
  }

  public static List<Converter<?, ?>> getConverters()
  {
    return Arrays.asList(new ZonedDateTimeReaderConverter(), new ZonedDateTimeWriterConverter());
  }

  @WritingConverter
  public static class ZonedDateTimeWriterConverter implements Converter<ZonedDateTime, Date>
  {
    public Date convert(ZonedDateTime source)
    {
      return Date.from(source.withZoneSameInstant(ZoneOffset.UTC.normalized()).toInstant());
    }
  }

  @ReadingConverter
  public static class ZonedDateTimeReaderConverter implements Converter<Date, ZonedDateTime>
  {
    public ZonedDateTime convert(Date source)
    {
      if (source == null)
      {
        return null;
      }
      return ZonedDateTime.ofInstant(source.toInstant(), ZoneOffset.UTC.normalized());
    }
  }

}
