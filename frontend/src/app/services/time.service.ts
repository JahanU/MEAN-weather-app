import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { singleTimezone } from '../models/singleTimezone.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimeService {

    constructor(private http: HttpClient) { }

    getTimeOfLocation(lat: number, lng: number) {
        const url = 'http://localhost:3000/api/time-date';
        let params = new HttpParams()
            .set('lat', lat.toString())
            .set('lng', lng.toString())

        console.log('sending request to API URL: ', url + params);

        return this.http.get<singleTimezone>(url, { params })
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        console.log('network failure');
        console.log(error);
        return throwError(error.message || "server error.");
    }
    /*
    ****************************************************************
    Not using Node.JS
    getTimeOfLocation(lat: number, lng: number) { 
            const url = 'http://api.timezonedb.com/v2.1/get-time-zone'; 
            let params = new HttpParams()
            .set('key', environment.TIME_API_KEY)
            .set('format', 'json')
            .set('by', 'position')
            .set('lat', lat.toString())
            .set('lng', lng.toString())
    console.log('sending request to API URL: ', this.url + params);

    return this.http.get<singleTimezone>(this.url, { params })
        .pipe(catchError(this.errorHandler));
    } 
    */
}
