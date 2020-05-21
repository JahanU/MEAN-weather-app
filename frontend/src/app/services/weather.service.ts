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

  fetchWeatherByName(locationName: string): Observable<singleWeather> {
    let params = new HttpParams()
      .set('locationName', locationName)

    return this.http.get<singleWeather>(environment.API_URL, { params })
      .pipe(catchError(this.errorHandler));
  }

  fetchWeatherByCoords(lat: number, lon: number): Observable<singleWeather> {
    let params = new HttpParams()
      .set('lat', lat.toString())
      .append('lon', lon.toString());

    return this.http.get<singleWeather>(environment.API_URL, { params })
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
