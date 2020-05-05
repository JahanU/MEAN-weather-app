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
    trigger('fadeData', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('10ms ease-in-out')),
      transition('hide => show', animate('1000ms ease-in-out')),
    ]),
  ]
})
export class SearchWeatherComponent implements OnInit {

  weatherData: singleWeather;
  fade = false;
  moveCloud = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocationData('london');
  }

  fadeState = () => this.fade ? 'show' : 'hide';



  getLocationData(locationName: string) {
    this.moveCloud = this.fade = false;
    this.weatherService
      .getWeatherOfLocation(locationName)
      .subscribe((response) => {
        this.weatherData = response;
        this.weatherData.sys.sunriseString = new Date(response.sys.sunrise * 1000).toLocaleTimeString(); //https://www.w3schools.com/js/js_dates.asp
        this.weatherData.sys.sunsetString = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        this.weatherData.wind.cardinalDirection = this.getCardinalDirection(response.wind.deg);
        this.weatherData.sys.isDayTime = new Date().getTime().toLocaleString() < this.weatherData.sys.sunsetString
        console.log(this.weatherData)
        this.moveCloud = this.fade = true;
      });
  }

  getCardinalDirection(degree: number) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(degree / 45) % 8];
  }

}
