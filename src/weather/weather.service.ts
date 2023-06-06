import { Injectable } from "@nestjs/common";
import { GetLocationCoordinatesDto } from "./dto/get-location-coordinates.dto";
import { GetWeatherForecastDto } from "./dto/get-weather-forecast.dto";

@Injectable()
export class WeatherService {
  private readonly API_KEY = process.env.WEATHER_API_KEY;

  async getLocationCoordinates(dto: GetLocationCoordinatesDto) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${dto.location}&appid=${this.API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return dto.isForMap
      ? JSON.stringify({
        lat: data[0].lat,
        lng: data[0].lon
      })
      : `lat=${data[0].lat}&lon=${data[0].lon}`;
  }

  async getCurrentWeatherData(dto: GetWeatherForecastDto) {
    const coordinates = await this.getLocationCoordinates(dto);
    const url = `https://api.openweathermap.org/data/2.5/forecast?${coordinates}&appid=${this.API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return this.transformDataToForecastEntry(data.list[0]);
  }

  async getWeatherForecast(dto: GetWeatherForecastDto) {
    const coordinates = await this.getLocationCoordinates(dto);
    const url = `https://api.openweathermap.org/data/2.5/forecast?${coordinates}&appid=${this.API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.list.map((weatherData: any) => {
      return this.transformDataToForecastEntry(weatherData);
    })
  }

  transformDataToForecastEntry(weatherData) {
    return {
      textDate: weatherData.dt_txt,
      iconId: weatherData.weather[0].icon,
      date: weatherData.dt,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      temperature: weatherData.main.temp,
      windSpeed: weatherData.wind.speed
    }
  }
}