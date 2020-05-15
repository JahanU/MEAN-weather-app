import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { singleWeather } from 'src/app/models/singleWeather.model';
import { singleTimezone } from 'src/app/models/singleTimezone.model';


@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {

  @Input() weatherData: singleWeather;
  @Input() timeData: singleTimezone;
  showErrorMessage = false;
  timerIntevalId; // Reset the timer when searching new location

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: OnChanges): void {
    clearInterval(this.timerIntevalId);
    if (this.weatherData && this.timeData) {
      this.setCardinalDirection(this.weatherData.wind.deg);
      this.setTimes();
      this.updateTimeEverySec();
    }
  }

  // Setters ********************************
  setTimes() {
    // Create date obj of current time date, and compare to location timezone/sunrise/sunset times
    this.timeData.date = new Date(this.timeData.formatted);
    this.timeData.dateString = this.timeData.formatted.split(' ')[0]; // Get date; 2020-05-11

    let sunrise = new Date((this.weatherData.sys.sunrise * 1000));
    sunrise.setSeconds(sunrise.getSeconds() + (this.weatherData.timezone - 3600));
    this.weatherData.sys.sunriseString = sunrise.toLocaleTimeString();

    let sunset = new Date((this.weatherData.sys.sunset * 1000));
    sunset.setSeconds(sunset.getSeconds() + (this.weatherData.timezone - 3600));
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

  // Helper funcs for HTML/Animation ********************************
  updateTimeEverySec() {
    this.timerIntevalId = setInterval(() => {
      let time = new Date(this.timeData.date);
      let updateTime = time.setSeconds(time.getSeconds() + 1);
      this.timeData.currentTime = new Date(updateTime).toLocaleTimeString();
      this.timeData.date = new Date(updateTime);
    }, 1000);
  }

  containsClouds = (feelsLike: string) => feelsLike.includes('cloud');
  containsSnow = (feelsLike: string) => feelsLike.includes('snow');

}
