import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { TimeService } from 'src/app/services/time.service';
import { singleWeather } from 'src/app/models/singleWeather.model';
import { singleTimezone } from 'src/app/models/singleTimezone.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.css'],
  animations: [
    trigger('fadeTrigger', [
      state('show', style({
        opacity: 1,
      })
      ),
      state('hide', style({
        opacity: 0,
      })
      ),
      transition('show => hide', animate('10ms')),
      transition('hide => show', animate('1000ms')),
    ]),
  ],
})
export class SearchWeatherComponent implements OnInit {

  weatherData: singleWeather;
  timeData: singleTimezone;
  fadeState = false;
  timerIntevalId; // Reset the timer when searching new location
  error: string;

  constructor(
    private weatherService: WeatherService,
    private timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.fetchLocationData('london');
  }

  // Fetchers 
  fetchLocationData(locationName: string) {
    this.fadeState = false;
    clearInterval(this.timerIntevalId);
    this.error = this.timeData = this.weatherData = null;
    this.weatherService.fetchWeatherOfLocation(locationName).subscribe((data) => {
      console.log(data)
      this.weatherData = data;
      this.fetchLocationTimes(data);
      this.setCardinalDirection(data.wind.deg);
      this.fadeState = true;
    }, (error) => {
      console.log('err: ', error);
      this.error = error
    });
  }

  fetchLocationTimes(weatherResp: singleWeather) {
    this.timeService.getTimeOfLocation(weatherResp.coord.lat, weatherResp.coord.lon).subscribe((timeData) => {
      this.timeData = timeData;
      this.setTimes(weatherResp, timeData);
      this.updateTimeEverySec();
    });
  }

  // Getters

  // Setters
  setTimes(weatherData: singleWeather, timeData: singleTimezone) {
    // Create date obj of current time date, and compare to location timezone/sunrise/sunset times
    this.timeData.date = new Date(timeData.formatted);

    let sunrise = new Date((weatherData.sys.sunrise * 1000));
    sunrise.setSeconds(sunrise.getSeconds() + (weatherData.timezone - 3600));
    this.weatherData.sys.sunriseString = sunrise.toLocaleTimeString()

    let sunset = new Date((weatherData.sys.sunset * 1000));
    sunset.setSeconds(sunset.getSeconds() + (weatherData.timezone - 3600));
    this.weatherData.sys.sunsetString = sunset.toLocaleTimeString();

    return this.timeData.isDay = this.timeData.date > sunrise;
  }

  setCardinalDirection(degree: number) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW',];
    return this.weatherData.wind.cardinalDirection = directions[Math.round(degree / 45) % 8];
  }

  setWidgetColour = (isDay: boolean) =>
    isDay
      ? 'linear-gradient(LightSkyBlue, LightBlue)'
      : 'linear-gradient(MidnightBlue, RoyalBlue)';

  setCloudColour = (isDay: boolean) => (isDay ? 'white' : 'dodgerBlue');

  // Helper funcs for HTML/Animation
  updateTimeEverySec() {
    this.timerIntevalId = setInterval(() => {
      let time = new Date(this.timeData.date);
      let updateTime = time.setSeconds(time.getSeconds() + 1);
      this.timeData.currentTime = new Date(updateTime).toLocaleTimeString();
      this.timeData.date = new Date(updateTime);
    }, 1000);
  }

  getFadeState = () => (this.fadeState ? 'show' : 'hide');
  containsClouds = (feelsLike: string) => feelsLike.includes('cloud');
  containsSnow = (feelsLike: string) => feelsLike.includes('snow');

}
