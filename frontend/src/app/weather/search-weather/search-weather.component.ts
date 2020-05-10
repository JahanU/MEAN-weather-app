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
    this.timeData = this.weatherData = null;
    this.weatherService.fetchWeatherOfLocation(locationName).subscribe((data) => {
      this.weatherData = data;
      this.setSunTimes(data);
      this.weatherData.wind.cardinalDirection = this.getCardinalDirection(data.wind.deg);


      this.fetchLocationTime(data.coord.lat, data.coord.lon, data);

      this.fadeState = true;
    }, (error) => {
      console.log('error: ', error);
      this.error = error
    })
  }

  fetchLocationTime(lat: number, lon: number, weatherResp: singleWeather) {
    this.timeService.getTimeOfLocation(lat, lon).subscribe((timeData) => {
      this.timeData = timeData;
      this.setIsDay(weatherResp, timeData);
      this.updateTimeEverySec();
    });
  }
  // Getters
  getCardinalDirection(degree: number) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW',];
    return directions[Math.round(degree / 45) % 8];
  }

  // Setters
  setSunTimes(data: singleWeather) {
    let sunrise = new Date((data.sys.sunrise * 1000));
    sunrise.setSeconds(sunrise.getSeconds() + (data.timezone - 3600));
    this.weatherData.sys.sunriseString = sunrise.toLocaleTimeString()

    let sunset = new Date((data.sys.sunset * 1000));
    sunset.setSeconds(sunset.getSeconds() + (data.timezone - 3600));
    this.weatherData.sys.sunsetString = sunset.toLocaleTimeString();
  }

  setIsDay(weatherData: singleWeather, timeData: singleTimezone) {
    // Create date obj of current time date, and compare to locations sunset times
    this.timeData.date = new Date(timeData.formatted);

    let sunrise = new Date((weatherData.sys.sunrise * 1000));
    sunrise.setSeconds(sunrise.getSeconds() + (weatherData.timezone - 3600));

    let sunset = new Date((weatherData.sys.sunset * 1000));
    sunset.setSeconds(sunset.getSeconds() + (weatherData.timezone - 3600));

    return this.timeData.isDay = this.timeData.date > sunrise;
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
