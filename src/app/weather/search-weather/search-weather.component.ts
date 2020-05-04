import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { singleWeather } from 'src/app/models/singleWeather.model';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.css'],
})
export class SearchWeatherComponent implements OnInit {

  weatherData: singleWeather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void { }

  getLocationData(locationName: string) {
    this.weatherService
      .getWeatherOfLocation(locationName)
      .subscribe((response) => {
        console.log('response from search: ...', response);
        this.weatherData = response;
        this.weatherData.sys.sunriseString = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
        this.weatherData.sys.sunsetString = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        this.weatherData.wind.cardinalDirection = this.getCardinalDirection(response.wind.deg);
      });
  }

  getCardinalDirection(degree: number) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(degree / 45) % 8];
  }
}
