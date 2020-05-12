import { Component, OnInit, Input } from '@angular/core';
import { singleWeather } from 'src/app/models/singleWeather.model';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements OnInit {

  @Input() weatherData: singleWeather;

  constructor() { }

  ngOnInit(): void {

  }

}
