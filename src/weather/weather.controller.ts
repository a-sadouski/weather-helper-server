import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { WeatherService } from "./weather.service";
import { GetLocationCoordinatesDto } from "./dto/get-location-coordinates.dto";

@Controller('weather')
export class WeatherController {

  constructor(private weatherService: WeatherService) {
  }

  @ApiOperation({ summary: 'Function for getting weather data'})
  @ApiResponse({ status: 200})
  @Get('/coordinates')
  getLocationCoordinates(@Query() reqParam: GetLocationCoordinatesDto) {
    return this.weatherService.getLocationCoordinates(reqParam);
  }

  @ApiOperation({ summary: 'Function for getting weather data'})
  @ApiResponse({ status: 200})
  @Get('/current-weather')
  getCurrentWeatherData(@Query() reqParam: GetLocationCoordinatesDto) {
    return this.weatherService.getCurrentWeatherData(reqParam);
  }

  @ApiOperation({ summary: 'Function for getting weather data'})
  @ApiResponse({ status: 200})
  @Get('/forecast')
  getWeatherForecast(@Query() reqParam: GetLocationCoordinatesDto) {
    return this.weatherService.getWeatherForecast(reqParam);
  }
}
