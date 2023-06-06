import { Module } from "@nestjs/common";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [AuthModule]
})
export class WeatherModule {
}
