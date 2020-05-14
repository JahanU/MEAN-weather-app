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

  constructor(private http: HttpClient) { }

  fetchWeatherOfLocation(locationName: string): Observable<singleWeather> {
    const url = 'http://localhost:3000/api/location';
    let params = new HttpParams()
      .set('locationName', locationName)

    return this.http.get<singleWeather>(url, { params })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log('weather.service / network failure: ', error);
    return throwError(error.message || "server error.");
  }

  // const url = 'https://api.openweathermap.org/data/2.5/weather';
  // let params = new HttpParams()
  //   .set('q', locationName)
  //   .set('units', 'metric')
  //   .set('appid', environment.WEATHER_API_KEY);

  // return this.http.get<singleWeather>(url, { params })
  //   .pipe(catchError(this.errorHandler));

}
