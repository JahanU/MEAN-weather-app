import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { singleTimezone } from '../models/singleTimezone.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class TimeService {

    url = 'http://api.timezonedb.com/v2.1/get-time-zone';
    // urlParam = `http://api.timezonedb.com/v2.1/get-time-zone
    // ?key=GVK27JSUNMGC&
    // format=json&
    // by=position&
    // lat=40.689247&
    // lng=-74.044502`;

    constructor(private http: HttpClient) { }

    getTimeOfLocation(lat: number, lng: number) {
        let params = new HttpParams()
            .set('key', environment.TIME_API_KEY)
            .set('format', 'json')
            .set('by', 'position')
            .set('lat', lat.toString())
            .set('lng', lng.toString())

        return this.http.get<singleTimezone>(this.url, { params });
    }
}
