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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  getLocationData(locationName: string) {
    console.log('Hello: ', locationName);

    this.weatherService
      .getWeatherOfLocation(locationName)
      .subscribe((response) => {
        console.log('response from search: ...', response);
        this.weatherData = response;
      });
  }
}
