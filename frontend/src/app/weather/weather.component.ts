import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { TimeService } from '../services/time.service';
import { singleTimezone } from '../models/singleTimezone.model';
import { singleWeather } from '../models/singleWeather.model';
import { locationName } from '../models/locationName.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
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
export class WeatherComponent implements OnInit {

  public weatherData: singleWeather;
  public timeData: singleTimezone;
  public locationFreqData: locationName[];
  public errorMessage: string;
  public fadeState: boolean;

  constructor(
    private weatherService: WeatherService,
    private timeService: TimeService,
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.fetchLocationData('london');
    this.fetchSearchedLocations();
  }

  fetchLocationData(locationName: string) {
    console.log('fetching...');
    this.reset();
    this.weatherService.fetchWeatherOfLocation(locationName).subscribe((data) => {
      this.weatherData = data;
      this.fetchLocationTimes(data);
      this.fetchSearchedLocations();
    }, (error) => {
      console.log('err: ', error);
      this.errorMessage = error;
    });
  }

  fetchLocationTimes(weatherData: singleWeather) {
    this.timeService.getTimeOfLocation(weatherData.coord.lat, weatherData.coord.lon).subscribe((timeData) => {
      this.timeData = timeData;
      this.fadeState = true;
    }, (error) => {
      console.log('err: ', error);
      this.errorMessage = error;
    });
  }

  fetchSearchedLocations() {
    this.statsService.fetchAllSearched().subscribe((data) => {
      console.log('ANGULAR ALL DATA: ', data);
      this.locationFreqData = data;
    })
  }

  getFadeState = () => (this.fadeState ? 'show' : 'hide');
  reset = () => this.fadeState = this.errorMessage = this.timeData = this.weatherData = null;

}
