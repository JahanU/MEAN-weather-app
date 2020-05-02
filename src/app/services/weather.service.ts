import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { singleWeather } from '../models/singleWeather.model';
import { weatherAPI } from '../models/weatherAPI.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherOfLocation(locationName: string): Observable<singleWeather> {
    let params = new HttpParams() // Creating fetch URL & setting params
      .set('q', locationName)
      .set('units', 'metric')
      .set('appid', environment.apikey);

    return this.http
      .get<singleWeather>(this.url, { params })
      .pipe(map((res) => res));
  }
}
