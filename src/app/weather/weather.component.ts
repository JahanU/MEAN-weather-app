import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { singleWeather } from '../models/singleWeather.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  public weatherData: Observable<singleWeather[]>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}
}
