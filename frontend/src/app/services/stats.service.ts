import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { locationName } from '../models/locationName.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class StatsService {

    constructor(private http: HttpClient) { }

    fetchAllSearched(): Observable<locationName[]> { // locationFreqData
        const url = 'http://localhost:3000/api/location/all';

        console.log('sending request to API URL: ', url);
        return this.http.get<locationName[]>(url)
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        console.log('stats.service / network failure: ', error);
        return throwError(error.message || "server error.");
    }



}
