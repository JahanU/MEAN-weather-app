import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { location } from '../models/location.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class StatsService {

    constructor(private http: HttpClient) { }

    fetchAllSearched(): Observable<location[]> { // locationFreqData

        return this.http.get<location[]>(environment.API_URL)
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        console.log('stats.service / network failure: ', error);
        return throwError(error.message || "server error.");
    }



}
