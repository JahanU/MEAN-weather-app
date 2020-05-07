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
    this.weatherService.fetchWeatherOfLocation(locationName).subscribe((response) => {
      this.weatherData = response;
      this.fetchLocationTime(response.coord.lat, response.coord.lon);
      this.weatherData.sys.sunriseString = new Date(response.sys.sunrise * 1000).toLocaleTimeString(); //https://www.w3schools.com/js/js_dates.asp
      this.weatherData.sys.sunsetString = new Date(response.sys.sunset * 1000).toLocaleTimeString();
      this.weatherData.wind.cardinalDirection = this.getCardinalDirection(response.wind.deg);
      console.log(this.weatherData);
      this.fadeState = true;
    });
  }

  fetchLocationTime = (lat: number, lon: number) =>
    this.timeService.getTimeOfLocation(lat, lon).subscribe((response) => {
      this.timeData = response;
      this.timeData.date = new Date(response.formatted);
      console.log(this.timeData);
      this.updateTimeEverySec();

    });

  // Getters
  getCardinalDirection(degree: number) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW',];
    return directions[Math.round(degree / 45) % 8];
  }

  // Setters
  setWidgetColour = (isDay: boolean) =>
    isDay
      ? 'linear-gradient(#15B2D3, #FFD700)'
      : 'linear-gradient(#080033, #323ec0)';

  setCloudColour = (isDay: boolean) => (isDay ? 'white' : 'dodgerBlue');

  // Helper funcs for HTML/Animation
  getFadeState = () => (this.fadeState ? 'show' : 'hide');
  containsClouds = (feelsLike: string) => feelsLike.includes('cloud');
  containsSnow = (feelsLike: string) => feelsLike.includes('snow');

  updateTimeEverySec() {
    setInterval(() => {
      let updateTime = this.timeData.date.setSeconds(this.timeData.date.getSeconds() + 1);
      this.timeData.currentTime = new Date(updateTime).toLocaleTimeString();
    }, 1000);
  }
}
