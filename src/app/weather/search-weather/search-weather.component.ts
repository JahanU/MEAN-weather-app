import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { singleWeather } from 'src/app/models/singleWeather.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.css'],
  animations: [
    trigger('fadeTrigger', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
      })),
      transition('show => hide', animate('10ms')),
      transition('hide => show', animate('1000ms'))
    ]),
  ]
})


export class SearchWeatherComponent implements OnInit {

  weatherData: singleWeather;
  fadeState = false;
  cloudState = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocationData('london');
  }


  getLocationData(locationName: string) {
    this.fadeState = false;
    this.weatherService
      .getWeatherOfLocation(locationName)
      .subscribe((response) => {
        this.weatherData = response;
        this.weatherData.sys.sunriseString = new Date(response.sys.sunrise * 1000).toLocaleTimeString(); //https://www.w3schools.com/js/js_dates.asp
        this.weatherData.sys.sunsetString = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        this.weatherData.wind.cardinalDirection = this.getCardinalDirection(response.wind.deg);
        this.weatherData.sys.isDayTime = new Date().getTime() < parseInt(this.weatherData.sys.sunriseString);
        console.log(this.weatherData)
        this.fadeState = true;
      });
  }

  getCardinalDirection(degree: number) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(degree / 45) % 8];
  }

  setWidgetColour(isDay: boolean) {
    if (isDay) {
      return 'linear-gradient(#15B2D3, #FFD700)';
    }
    return 'linear-gradient(#080033, #323ec0)';
  }
  getFadeState = () => this.fadeState ? 'show' : 'hide';
  containsClouds = (feelsLike: string) => feelsLike.includes('cloud');
  containsSnow = (feelsLike: string) => feelsLike.includes('snow');

}
