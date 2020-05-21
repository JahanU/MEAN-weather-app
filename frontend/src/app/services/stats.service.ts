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

    url = environment.API_URL + 'api/location/all';

    constructor(private http: HttpClient) { }

    fetchAllSearched(): Observable<location[]> { // locationFreqData

        console.log('try: ', this.url);
        return this.http.get<location[]>(this.url)
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        console.log('stats.service / network failure: ', error);
        return throwError(error.message || "server error.");
    }



}
