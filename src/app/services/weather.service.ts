import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { singleWeather } from '../models/singleWeather.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  fetchWeatherOfLocation(locationName: string): Observable<singleWeather> {
    let params = new HttpParams()
      .set('q', locationName)
      .set('units', 'metric')
      .set('appid', environment.WEATHER_API_KEY);

    return this.http.get<singleWeather>(this.url, { params })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log('failure');
    console.log(error);
    return throwError(error.message || "server error.");
  }
}
